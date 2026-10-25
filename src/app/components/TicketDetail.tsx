import { useState, useEffect } from 'react';
import { aiSuggestedResponses, knowledgeBaseArticles, quickResolutionTemplates, type Ticket } from '../data/mockTickets';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { ConfirmationDialog } from './ConfirmationDialog';
import { AITriagePanel } from './AITriagePanel';
import { SmartAgentAssignment } from './SmartAgentAssignment';
import { SimilarTicketsDetector } from './SimilarTicketsDetector';
import { SentimentTrendChart } from './SentimentTrendChart';
import { SLATooltip } from './HelpTooltips';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Mail, 
  TrendingUp,
  Sparkles,
  FileText,
  Send,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Star,
  MessageSquare,
  Calendar,
  DollarSign,
  Shield,
  Flame,
  ThermometerSun,
  Snowflake,
  RotateCcw,
  StickyNote,
  Share2,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';

interface TicketDetailProps {
  ticketId: string;
  onBack: () => void;
  language: string;
  tickets: Ticket[];
  onUpdateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
}

const emotionEmojis = {
  angry: '😡',
  frustrated: '😰',
  calm: '😊',
  confused: '❓'
};

const priorityConfig = {
  urgent: { label: '🔴 URGENT', color: 'bg-red-100 text-red-700 border-red-300' },
  medium: { label: '🟡 MEDIUM', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  low: { label: '🟢 LOW', color: 'bg-green-100 text-green-700 border-green-300' }
};

const teamConfig = {
  billing: { label: 'Billing', color: 'bg-[#8B6F47]' },
  bugs: { label: 'Bugs', color: 'bg-[#D4AF37]' },
  features: { label: 'Feature Requests', color: 'bg-[#B8956A]' },
  abuse: { label: 'Abuse Reports', color: 'bg-red-500' },
  general: { label: 'General Inquiry', color: 'bg-gray-500' }
};

export function TicketDetail({ ticketId, onBack, language, tickets, onUpdateTicket }: TicketDetailProps) {
  const ticket = tickets.find(t => t.id === ticketId);
  const [selectedResponse, setSelectedResponse] = useState('');
  const [customResponse, setCustomResponse] = useState('');
  const [selectedDraft, setSelectedDraft] = useState<number | null>(null);
  const [liveTimeRemaining, setLiveTimeRemaining] = useState(ticket?.slaMinutesRemaining || 0);
  const [responseQuality, setResponseQuality] = useState<number>(0);
  const [resolutionConfidence, setResolutionConfidence] = useState<number>(0);
  const [internalNote, setInternalNote] = useState('');
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [showResolveConfirm, setShowResolveConfirm] = useState(false);
  const [showReopenConfirm, setShowReopenConfirm] = useState(false);

  // ESC key handler for quick exit
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onBack]);

  // Live SLA countdown
  useEffect(() => {
    if (!ticket || ticket.status === 'resolved' || ticket.status === 'auto-resolved') return;

    const interval = setInterval(() => {
      setLiveTimeRemaining(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [ticket]);

  // Calculate response quality when text changes
  useEffect(() => {
    const responseText = selectedResponse || customResponse;
    if (!responseText.trim()) {
      setResponseQuality(0);
      setResolutionConfidence(0);
      return;
    }

    // Simple quality scoring algorithm
    let score = 0;
    const wordCount = responseText.split(/\s+/).length;
    
    // Length check (20-200 words is good)
    if (wordCount >= 20 && wordCount <= 200) score += 2;
    else if (wordCount >= 10) score += 1;
    
    // Politeness check
    if (/\b(thank|please|appreciate|sorry|apologi[sz]e)\b/i.test(responseText)) score += 1;
    
    // Personalization check
    if (ticket && responseText.includes(ticket.customer.name.split(' ')[0])) score += 1;
    
    // Professional closing
    if (/\b(regards|sincerely|best|thanks)\b/i.test(responseText)) score += 1;

    setResponseQuality(score);

    // Confidence calculation (higher for calm/confused, lower for angry/frustrated)
    let confidence = score * 20; // Base on quality
    if (ticket?.emotion === 'calm') confidence += 15;
    if (ticket?.emotion === 'confused') confidence += 10;
    if (ticket?.emotion === 'frustrated') confidence -= 10;
    if (ticket?.emotion === 'angry') confidence -= 15;
    
    setResolutionConfidence(Math.min(100, Math.max(0, confidence)));
  }, [selectedResponse, customResponse, ticket]);

  if (!ticket) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p>Ticket not found</p>
          <Button onClick={onBack} className="mt-4">Back to Dashboard</Button>
        </CardContent>
      </Card>
    );
  }

  const suggestedResponses = aiSuggestedResponses[ticket.id as keyof typeof aiSuggestedResponses] || [];
  const isResolved = ticket.status === 'resolved' || ticket.status === 'auto-resolved';
  
  const getSLAProgress = () => {
    const totalMinutes = ticket.priority === 'urgent' ? 60 : ticket.priority === 'medium' ? 180 : 360;
    const elapsed = totalMinutes - liveTimeRemaining;
    return (elapsed / totalMinutes) * 100;
  };

  const getSLAColor = () => {
    if (liveTimeRemaining < 15) return 'text-red-600';
    if (liveTimeRemaining < 30) return 'text-orange-600';
    return 'text-green-600';
  };

  const getSLABgColor = () => {
    if (liveTimeRemaining < 15) return 'bg-red-50 border-red-300';
    if (liveTimeRemaining < 30) return 'bg-orange-50 border-orange-300';
    return 'bg-green-50 border-green-300';
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F0E68C', '#8B6F47', '#FFFCF7']
    });
  };

  const celebrationMessages = [
    { title: "✨ Brilliant work!", message: "Another happy customer!" },
    { title: "🌟 Amazing job!", message: "You're on fire today!" },
    { title: "⭐ Fantastic!", message: "Keep up the great work!" },
    { title: "🎉 Well done!", message: "That's how it's done!" },
    { title: "💫 Superb!", message: "You're crushing it!" },
    { title: "🏆 Excellent!", message: "Top-tier support!" },
    { title: "☕ Perfect blend!", message: "Smooth resolution!" },
    { title: "✅ Nailed it!", message: "Customer satisfaction +1!" }
  ];

  const handleSendResponse = () => {
    const responseText = selectedResponse || customResponse;
    if (!responseText.trim()) {
      toast.error('Please write or select a response', {
        description: 'You need to provide a response before resolving the ticket.'
      });
      return;
    }

    // Show confirmation dialog
    setShowResolveConfirm(true);
  };

  const confirmSendResponse = () => {
    const responseText = selectedResponse || customResponse;
    
    // Update ticket to resolved with the response
    onUpdateTicket(ticketId, {
      status: 'resolved',
      responseText: responseText,
      resolvedBy: 'Agent Smith',
      resolvedAt: new Date().toISOString(),
      resolutionTimeMinutes: Math.floor(Math.random() * 30 + 5)
    });

    triggerConfetti();

    const randomCelebration = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
    
    toast.success(randomCelebration.title, {
      description: `${randomCelebration.message} Resolved in ${Math.floor(Math.random() * 10 + 3)} minutes!`,
      duration: 4000,
      className: 'bg-gradient-to-r from-[#FFFCF7] via-[#F0E68C]/30 to-[#FFFCF7] border-2 border-[#D4AF37]/50 shadow-xl',
      style: {
        background: 'linear-gradient(135deg, #FFFCF7 0%, #F0E68C 50%, #FFFCF7 100%)',
        color: '#5C4A3A',
      }
    });

    setShowResolveConfirm(false);
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const handleQuickResolve = (template: typeof quickResolutionTemplates[0]) => {
    let response = template.response
      .replace(/\{\{name\}\}/g, ticket.customer.name.split(' ')[0])
      .replace(/\{\{email\}\}/g, ticket.customer.email)
      .replace(/\{\{agent\}\}/g, 'Agent Smith')
      .replace(/\{\{amount\}\}/g, '£' + (Math.random() * 500 + 50).toFixed(2))
      .replace(/\{\{refundId\}\}/g, 'REF-' + Date.now())
      .replace(/\{\{bugId\}\}/g, 'BUG-' + Math.floor(Math.random() * 9000 + 1000))
      .replace(/\{\{trackingUrl\}\}/g, 'https://status.ticketespresso.com')
      .replace(/\{\{invoiceId\}\}/g, 'INV-2025-' + Math.floor(Math.random() * 9000 + 1000));
    
    setCustomResponse(response);
    setSelectedResponse('');
    setSelectedDraft(null);
  };

  const handleReopenTicket = () => {
    setShowReopenConfirm(true);
  };

  const confirmReopenTicket = () => {
    onUpdateTicket(ticketId, {
      status: 'open',
      responseText: undefined,
      resolvedBy: undefined,
      resolvedAt: undefined
    });
    toast.success('Ticket Reopened', {
      description: 'The ticket has been reopened and moved back to the queue.',
      duration: 3000
    });
    setShowReopenConfirm(false);
  };

  const handleAddNote = () => {
    if (!internalNote.trim()) {
      toast.error('Please enter a note');
      return;
    }

    const newNote = {
      id: `NOTE-${Date.now()}`,
      author: 'Agent Smith',
      content: internalNote,
      timestamp: new Date().toISOString()
    };

    const existingNotes = ticket.internalNotes || [];
    onUpdateTicket(ticketId, {
      internalNotes: [...existingNotes, newNote]
    });

    toast.success('Internal Note Added', {
      description: 'Your note has been saved to this ticket.',
      duration: 3000
    });

    setInternalNote('');
    setShowNoteDialog(false);
  };

  const formatSLATime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  // Customer journey events
  const journeyEvents = [
    { icon: Calendar, label: 'Account Created', date: ticket.customer.accountAge || '1 year ago', color: 'text-blue-500' },
    { icon: DollarSign, label: 'Last Purchase', date: ticket.customer.lastPurchase || 'N/A', color: 'text-green-500' },
    { icon: MessageSquare, label: 'Previous Tickets', date: `${ticket.customer.totalTickets || 0} total`, color: 'text-purple-500' },
    { icon: Clock, label: 'Current Ticket', date: new Date(ticket.createdAt).toLocaleDateString('en-GB'), color: 'text-[#D4AF37]' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" onClick={onBack} className="text-[#5C4A3A] hover:bg-[#F5EFE6]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-2">
          {!isResolved ? (
            <Button 
              variant="outline" 
              onClick={() => {
                onUpdateTicket(ticketId, {
                  status: 'resolved',
                  resolvedBy: 'Agent Smith',
                  resolvedAt: new Date().toISOString(),
                  resolutionTimeMinutes: Math.floor(Math.random() * 30 + 5)
                });
                triggerConfetti();
                const randomCelebration = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
                toast.success(randomCelebration.title, {
                  description: randomCelebration.message,
                  duration: 4000,
                  className: 'bg-gradient-to-r from-[#FFFCF7] via-[#F0E68C]/30 to-[#FFFCF7] border-2 border-[#D4AF37]/50 shadow-xl',
                });
                setTimeout(() => onBack(), 1500);
              }}
              className="border-green-500 text-green-700 hover:bg-green-50"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark as Resolved
            </Button>
          ) : (
            <Badge className="text-lg px-4 py-2 bg-green-100 text-green-700 border-2 border-green-300">
              <CheckCircle className="w-5 h-5 mr-2" />
              RESOLVED
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Ticket Header */}
          <Card className="border-[#D4AF37]/30 shadow-md">
            <CardHeader className="bg-gradient-to-br from-[#FFFCF7] to-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-[#9C8A76]">{ticket.id}</span>
                    <Badge variant="outline" className={priorityConfig[ticket.priority].color}>
                      {priorityConfig[ticket.priority].label}
                    </Badge>
                    <span className="text-2xl">{emotionEmojis[ticket.emotion]}</span>
                  </div>
                  <CardTitle>{ticket.subject}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Live SLA Timer */}
                {!isResolved && (
                  <div className={`p-4 rounded-lg border transition-all ${
                    liveTimeRemaining < 15
                      ? 'bg-red-50 border-red-300 animate-pulse' 
                      : liveTimeRemaining < 30
                      ? 'bg-orange-50 border-orange-300'
                      : 'bg-green-50 border-green-300'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full ${getSLABgColor()} border-2 flex items-center justify-center relative`}>
                          <Clock className={`w-5 h-5 ${getSLAColor()} ${liveTimeRemaining < 15 ? 'animate-pulse' : ''}`} />
                          {liveTimeRemaining < 15 && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                          )}
                        </div>
                        <div>
                          <span className="text-sm text-[#9C8A76]">SLA Deadline</span>
                          <p className={`${getSLAColor()}`}>
                            {formatSLATime(liveTimeRemaining)} remaining
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl">{formatSLATime(liveTimeRemaining)}</div>
                        <div className="text-xs text-[#9C8A76]">left</div>
                      </div>
                    </div>
                    <Progress value={getSLAProgress()} className="h-2" />
                    {liveTimeRemaining < 30 && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-orange-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span>⚠️ {liveTimeRemaining < 15 ? 'CRITICAL: Escalate immediately!' : 'Approaching SLA breach'}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Resolved Badge with Details */}
                {isResolved && ticket.resolvedBy && (
                  <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-green-800">Ticket Resolved</p>
                        <p className="text-sm text-green-600">
                          by {ticket.resolvedBy} • {ticket.resolutionTimeMinutes} min resolution time
                        </p>
                      </div>
                    </div>
                    {ticket.resolvedAt && (
                      <p className="text-sm text-green-600">
                        Resolved at: {new Date(ticket.resolvedAt).toLocaleString('en-GB')}
                      </p>
                    )}
                  </div>
                )}

                {/* Customer Message */}
                <div>
                  <h4 className="mb-2 text-[#5C4A3A]">Customer Message</h4>
                  <div className="p-4 bg-[#EDE4D3]/50 rounded-lg border border-[#D4AF37]/30">
                    <p className="whitespace-pre-wrap text-[#5C4A3A]">{ticket.message}</p>
                  </div>
                </div>

                {/* Response Sent (for resolved tickets) */}
                {isResolved && ticket.responseText && (
                  <div>
                    <h4 className="mb-2 text-[#5C4A3A] flex items-center gap-2">
                      <Send className="w-4 h-4 text-green-600" />
                      Response Sent to Customer
                    </h4>
                    <div className="p-4 bg-white rounded-lg border-2 border-green-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-green-100">
                        <MessageSquare className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700">Delivered to {ticket.customer.email}</span>
                      </div>
                      <p className="whitespace-pre-wrap text-[#5C4A3A] leading-relaxed">{ticket.responseText}</p>
                      <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-[#9C8A76]">
                        <p>Sent by: {ticket.resolvedBy}</p>
                        {ticket.resolvedAt && (
                          <p>Timestamp: {new Date(ticket.resolvedAt).toLocaleString('en-GB')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Follow-Up Actions for Resolved Tickets */}
          {isResolved && (
            <Card className="border-[#D4AF37]/30 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#5C4A3A]">Follow-Up Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  className="border-[#D4AF37]/40 text-[#8B6F47] hover:bg-[#F5EFE6]"
                  onClick={handleReopenTicket}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reopen Ticket
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#D4AF37]/40 text-[#8B6F47] hover:bg-[#F5EFE6]"
                  onClick={() => setShowNoteDialog(true)}
                >
                  <StickyNote className="w-4 h-4 mr-2" />
                  Add Internal Note
                </Button>
                <Button variant="outline" className="border-[#D4AF37]/40 text-[#8B6F47] hover:bg-[#F5EFE6]">
                  <Share2 className="w-4 h-4 mr-2" />
                  Forward to Team
                </Button>
              </CardContent>
            </Card>
          )}

          {/* AI Co-Pilot Response Panel - Only for non-resolved tickets */}
          {!isResolved && (
            <Card className="border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#FFFCF7] via-[#F5EFE6] to-[#F0E68C]/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#8B6F47] to-[#D4AF37] rounded-lg flex items-center justify-center relative">
                    <Sparkles className="w-5 h-5 text-[#FFFCF7]" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#F0E68C] rounded-full animate-pulse"></div>
                  </div>
                  <CardTitle className="text-[#5C4A3A]">AI Co-Pilot Assistant</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* AI Summary */}
                <div className="p-4 bg-[#FFFCF7] rounded-lg border border-[#D4AF37]/30 shadow-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <Zap className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="mb-2 text-[#5C4A3A]">AI Summary</h4>
                      <p className="text-sm text-[#5C4A3A]">
                        {ticket.emotion === 'angry' 
                          ? `Extremely frustrated ${ticket.customer.accountType} customer experiencing ${ticket.team === 'billing' ? 'billing' : 'technical'} issue. Requires immediate senior-level attention with empathetic response.`
                          : ticket.emotion === 'frustrated'
                          ? `${ticket.customer.accountType} customer concerned about ${ticket.team === 'billing' ? 'payment' : 'account'} issue. Needs reassurance and clear next steps.`
                          : ticket.emotion === 'confused'
                          ? `Customer needs guidance on ${ticket.subject.toLowerCase()}. Simple step-by-step explanation required.`
                          : `Standard ${ticket.team} request from ${ticket.customer.accountType} customer. Can be handled with professional courtesy.`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* One-Click Quick Resolution Templates */}
                <div>
                  <h4 className="mb-3 text-[#5C4A3A] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#D4AF37]" />
                    Quick Resolve Templates
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {quickResolutionTemplates.map(template => (
                      <Button
                        key={template.id}
                        onClick={() => handleQuickResolve(template)}
                        variant="outline"
                        size="sm"
                        className={`${template.color} text-white border-none hover:opacity-80 hover:scale-105 transition-all duration-200 shadow-sm`}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        {template.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* AI-Generated Response Options */}
                {suggestedResponses.length > 0 && (
                  <div>
                    <h4 className="mb-3 text-[#5C4A3A]">AI-Generated Response Options</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {suggestedResponses.map((response, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedResponse(response.text);
                            setSelectedDraft(index);
                            setCustomResponse('');
                          }}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 group hover:shadow-lg hover:-translate-y-1 ${
                            selectedDraft === index
                              ? 'border-[#D4AF37] bg-gradient-to-br from-[#F0E68C]/20 to-[#FFFCF7] shadow-md'
                              : 'border-[#D4AF37]/30 bg-[#FFFCF7] hover:border-[#D4AF37]/60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="border-[#D4AF37]/40 text-[#8B6F47]">
                              {response.tone}
                            </Badge>
                            {selectedDraft === index && (
                              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] animate-in zoom-in" />
                            )}
                          </div>
                          <p className="text-sm whitespace-pre-wrap text-[#5C4A3A] leading-relaxed">
                            {response.text}
                          </p>
                          <div className="mt-3 pt-3 border-t border-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-xs text-[#9C8A76]">Click to use this response</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Response */}
                <div>
                  <h4 className="mb-2 text-[#5C4A3A]">Your Response</h4>
                  <Textarea
                    value={selectedResponse || customResponse}
                    onChange={(e) => {
                      setCustomResponse(e.target.value);
                      setSelectedResponse('');
                      setSelectedDraft(null);
                    }}
                    placeholder="Write your own response or select one of the AI suggestions above..."
                    className="min-h-[150px] bg-[#FFFCF7] border-[#D4AF37]/30"
                  />

                  {/* Response Quality Scoring */}
                  {(selectedResponse || customResponse) && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-[#D4AF37]/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#5C4A3A]">Response Quality</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= responseQuality
                                  ? 'fill-[#D4AF37] text-[#D4AF37]'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {responseQuality >= 4 && (
                        <p className="text-xs text-green-600">✨ Excellent response!</p>
                      )}
                      {responseQuality === 3 && (
                        <p className="text-xs text-amber-600">💡 Good! Consider adding more personalization.</p>
                      )}
                      {responseQuality < 3 && responseQuality > 0 && (
                        <p className="text-xs text-orange-600">⚠️ Try adding more empathy and detail.</p>
                      )}
                    </div>
                  )}

                  {/* Resolution Confidence Meter */}
                  {(selectedResponse || customResponse) && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-[#D4AF37]/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#5C4A3A]">Resolution Confidence</span>
                        <span className={`text-sm ${
                          resolutionConfidence >= 80 ? 'text-green-600' :
                          resolutionConfidence >= 60 ? 'text-amber-600' :
                          'text-orange-600'
                        }`}>
                          {resolutionConfidence}%
                        </span>
                      </div>
                      <Progress value={resolutionConfidence} className="h-2" />
                      <p className="text-xs text-[#9C8A76] mt-2">
                        {resolutionConfidence >= 80 && '✓ High likelihood customer will be satisfied'}
                        {resolutionConfidence >= 60 && resolutionConfidence < 80 && '~ Moderate satisfaction expected'}
                        {resolutionConfidence < 60 && '⚠ Response may need refinement'}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button 
                      onClick={handleSendResponse} 
                      className="flex-1 bg-gradient-to-r from-[#8B6F47] via-[#D4AF37] to-[#8B6F47] hover:from-[#6B5537] hover:via-[#C9A961] hover:to-[#6B5537] text-[#FFFCF7] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <Send className="w-4 h-4 mr-2" />
                      Send & Resolve
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => { setSelectedResponse(''); setCustomResponse(''); setSelectedDraft(null); }} 
                      className="border-[#D4AF37]/40 text-[#8B6F47] hover:bg-[#F5EFE6] transition-all duration-200"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* AI Triage Panel - Only for non-resolved tickets */}
          {!isResolved && (
            <AITriagePanel 
              ticketId={ticket.id}
              team={ticket.team}
              priority={ticket.priority}
              emotion={ticket.emotion}
            />
          )}

          {/* Smart Agent Assignment - Only for non-resolved tickets */}
          {!isResolved && (
            <SmartAgentAssignment 
              team={ticket.team}
              priority={ticket.priority}
            />
          )}

          {/* Similar Tickets Detector - Only for non-resolved tickets */}
          {!isResolved && (
            <SimilarTicketsDetector currentTicketSubject={ticket.subject} />
          )}

          {/* Sentiment Trend Chart */}
          <SentimentTrendChart 
            emotion={ticket.emotion}
            customerName={ticket.customer.name}
          />

          {/* Smart Context Panel */}
          <Card className="border-2 border-[#D4AF37]/40 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-br from-[#FFFCF7] to-[#F0E68C]/10">
              <CardTitle className="text-base text-[#5C4A3A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Smart Context
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 pt-4">
              <div className="p-3 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl">{emotionEmojis[ticket.emotion]}</span>
                </div>
                <p className="text-xs text-purple-600">Sentiment</p>
                <p className="text-sm text-purple-900 capitalize">{ticket.emotion}</p>
              </div>

              {ticket.customer.accountType.includes('VIP') && (
                <div className="p-3 bg-gradient-to-br from-amber-50 to-white rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="text-xs text-amber-600">Status</p>
                  <p className="text-sm text-amber-900">⭐ VIP</p>
                </div>
              )}

              <div className="p-3 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-200">
                <DollarSign className="w-5 h-5 text-green-600 mb-1" />
                <p className="text-xs text-green-600">Last Purchase</p>
                <p className="text-sm text-green-900">{ticket.customer.lastPurchase || 'N/A'}</p>
              </div>

              <div className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200">
                <MessageSquare className="w-5 h-5 text-blue-600 mb-1" />
                <p className="text-xs text-blue-600">Tickets</p>
                <p className="text-sm text-blue-900">{ticket.customer.totalTickets || 0} total</p>
              </div>

              <div className="p-3 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-200">
                <Calendar className="w-5 h-5 text-indigo-600 mb-1" />
                <p className="text-xs text-indigo-600">Account Age</p>
                <p className="text-sm text-indigo-900">{ticket.customer.accountAge || 'N/A'}</p>
              </div>

              <div className={`p-3 bg-gradient-to-br rounded-lg border-2 ${
                liveTimeRemaining < 30 ? 'from-red-50 to-white border-red-300' :
                liveTimeRemaining < 60 ? 'from-orange-50 to-white border-orange-300' :
                'from-green-50 to-white border-green-300'
              }`}>
                <Clock className={`w-5 h-5 mb-1 ${
                  liveTimeRemaining < 30 ? 'text-red-600' :
                  liveTimeRemaining < 60 ? 'text-orange-600' :
                  'text-green-600'
                }`} />
                <p className={`text-xs ${
                  liveTimeRemaining < 30 ? 'text-red-600' :
                  liveTimeRemaining < 60 ? 'text-orange-600' :
                  'text-green-600'
                }`}>SLA Timer</p>
                <p className={`text-sm ${
                  liveTimeRemaining < 30 ? 'text-red-900' :
                  liveTimeRemaining < 60 ? 'text-orange-900' :
                  'text-green-900'
                }`}>{formatSLATime(liveTimeRemaining)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Journey Timeline */}
          <Card className="border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-br from-[#FFFCF7] to-white">
              <CardTitle className="text-base text-[#5C4A3A]">Customer Journey</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {journeyEvents.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-white to-gray-50 border-2 flex items-center justify-center ${
                          index === journeyEvents.length - 1 ? 'border-[#D4AF37]' : 'border-gray-300'
                        }`}>
                          <Icon className={`w-4 h-4 ${event.color}`} />
                        </div>
                        {index < journeyEvents.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-200"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm text-[#5C4A3A]">{event.label}</p>
                        <p className="text-xs text-[#9C8A76]">{event.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card className="border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-br from-[#FFFCF7] to-white">
              <CardTitle className="text-base text-[#5C4A3A]">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 ring-2 ring-[#D4AF37]/30">
                  <AvatarFallback className="bg-gradient-to-br from-[#8B6F47] to-[#D4AF37] text-[#FFFCF7]">
                    {ticket.customer.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>{ticket.customer.name}</p>
                  <p className="text-sm text-[#9C8A76]">{ticket.customer.email}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#9C8A76]">Account Type</span>
                  <Badge variant="secondary" className="bg-[#F5EFE6] text-[#5C4A3A]">{ticket.customer.accountType}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9C8A76]">Open Tickets</span>
                  <span className="text-[#5C4A3A]">{ticket.customer.openTickets}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9C8A76]">Avg Response Time</span>
                  <span className="text-[#5C4A3A]">{ticket.customer.responseTime}</span>
                </div>
              </div>

              {ticket.customer.accountType.includes('VIP') && (
                <div className="p-3 bg-gradient-to-br from-amber-50 to-[#F0E68C]/20 border-2 border-[#D4AF37]/50 rounded-lg shadow-sm animate-pulse">
                  <div className="flex items-center gap-2 text-sm text-amber-800">
                    <TrendingUp className="w-4 h-4" />
                    <span>⭐ VIP Customer - Priority Handling</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ticket Details */}
          <Card className="border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-br from-[#FFFCF7] to-white">
              <CardTitle className="text-base text-[#5C4A3A]">Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="text-[#9C8A76]">Assigned Team</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-3 h-3 rounded-full ${teamConfig[ticket.team].color}`}></div>
                  <span className="text-[#5C4A3A]">{teamConfig[ticket.team].label}</span>
                </div>
              </div>

              <Separator />

              {ticket.assignedTo && (
                <>
                  <div>
                    <span className="text-[#9C8A76]">Assigned Agent</span>
                    <p className="mt-1 text-[#5C4A3A]">{ticket.assignedTo}</p>
                  </div>
                  <Separator />
                </>
              )}

              <div>
                <span className="text-[#9C8A76]">Created</span>
                <p className="mt-1 text-[#5C4A3A]">{new Date(ticket.createdAt).toLocaleString('en-GB')}</p>
              </div>

              <div>
                <span className="text-[#9C8A76]">Tags</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ticket.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs border-[#D4AF37]/30 text-[#5C4A3A]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Base */}
          <Card className="border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-br from-[#FFFCF7] to-white">
              <CardTitle className="text-base text-[#5C4A3A]">Related Articles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {knowledgeBaseArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  className="flex items-start gap-2 p-3 rounded-lg hover:bg-[#F5EFE6] transition-all duration-200 text-sm border border-transparent hover:border-[#D4AF37]/30 hover:shadow-sm group"
                >
                  <FileText className="w-4 h-4 text-[#9C8A76] shrink-0 mt-0.5 group-hover:text-[#8B6F47] transition-colors" />
                  <div className="flex-1">
                    <p className="text-[#8B6F47] group-hover:underline">{article.title}</p>
                    <p className="text-xs text-[#9C8A76]">{article.relevance}% relevant</p>
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Internal Note Dialog */}
      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent className="bg-gradient-to-br from-[#FFFCF7] to-white border-2 border-[#D4AF37]/30">
          <DialogHeader>
            <DialogTitle className="text-[#5C4A3A] flex items-center gap-2">
              <StickyNote className="w-5 h-5 text-[#D4AF37]" />
              Add Internal Note
            </DialogTitle>
            <DialogDescription className="text-[#9C8A76]">
              Add a private note that only your team can see. This won't be visible to the customer.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter your internal note here..."
            value={internalNote}
            onChange={(e) => setInternalNote(e.target.value)}
            className="min-h-[120px] border-[#D4AF37]/30 focus:border-[#D4AF37]"
          />
          {ticket.internalNotes && ticket.internalNotes.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              <p className="text-sm text-[#9C8A76]">Previous Notes:</p>
              {ticket.internalNotes.map((note) => (
                <div key={note.id} className="p-2 bg-[#F5EFE6]/50 rounded border border-[#D4AF37]/20 text-sm">
                  <p className="text-[#5C4A3A]">{note.content}</p>
                  <p className="text-xs text-[#9C8A76] mt-1">
                    {note.author} • {new Date(note.timestamp).toLocaleString('en-GB')}
                  </p>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowNoteDialog(false)}
              className="border-[#D4AF37]/40 text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddNote}
              className="bg-gradient-to-r from-[#8B6F47] to-[#D4AF37] text-[#FFFCF7] hover:opacity-90"
            >
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resolve Confirmation Dialog */}
      <ConfirmationDialog
        open={showResolveConfirm}
        onOpenChange={setShowResolveConfirm}
        title="Resolve This Ticket?"
        description="Are you sure you want to send this response and mark the ticket as resolved? This will send an email to the customer."
        confirmText="Send & Resolve"
        cancelText="Cancel"
        onConfirm={confirmSendResponse}
      />

      {/* Reopen Confirmation Dialog */}
      <ConfirmationDialog
        open={showReopenConfirm}
        onOpenChange={setShowReopenConfirm}
        title="Reopen This Ticket?"
        description="Are you sure you want to reopen this ticket? It will be moved back to the open queue."
        confirmText="Reopen Ticket"
        cancelText="Cancel"
        onConfirm={confirmReopenTicket}
      />
    </div>
  );
}
