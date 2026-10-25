import { useState, useMemo, useEffect } from 'react';
import { type Ticket, type PriorityType, type TeamType, type StatusType } from '../data/mockTickets';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { HelpTooltips, SLATooltip, InboxTempTooltip } from './HelpTooltips';
import { 
  Search, 
  Filter, 
  Clock, 
  Zap, 
  TrendingUp,
  AlertCircle,
  Frown,
  Meh,
  Smile,
  HelpCircle,
  Sparkles,
  Flame,
  ThermometerSun,
  Snowflake,
  AlertTriangle,
  Coffee,
  PartyPopper
} from 'lucide-react';

type FilterType = 'all' | 'open' | 'auto-resolved' | 'sla-risk';

interface DashboardProps {
  onSelectTicket: (ticketId: string) => void;
  language: string;
  tickets: Ticket[];
  ticketFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const emotionIcons = {
  angry: { icon: Frown, color: 'text-red-500', label: 'Angry' },
  frustrated: { icon: Meh, color: 'text-orange-500', label: 'Frustrated' },
  calm: { icon: Smile, color: 'text-green-500', label: 'Calm' },
  confused: { icon: HelpCircle, color: 'text-blue-500', label: 'Confused' }
};

const priorityConfig = {
  urgent: { label: '🔴 URGENT', color: 'bg-red-100 text-red-700 border-red-300', sla: '1hr SLA' },
  medium: { label: '🟡 MEDIUM', color: 'bg-amber-100 text-amber-700 border-amber-300', sla: '3hr SLA' },
  low: { label: '🟢 LOW', color: 'bg-green-100 text-green-700 border-green-300', sla: '6hr SLA' }
};

const teamConfig = {
  billing: { label: 'Billing', color: 'bg-[#8B6F47]' },
  bugs: { label: 'Bugs', color: 'bg-[#D4AF37]' },
  features: { label: 'Feature Requests', color: 'bg-[#B8956A]' },
  abuse: { label: 'Abuse Reports', color: 'bg-red-500' },
  general: { label: 'General Inquiry', color: 'bg-gray-500' }
};

const statusConfig = {
  open: { label: 'Open', color: 'bg-[#EDE4D3] text-[#5C4A3A]' },
  'in-progress': { label: 'In Progress', color: 'bg-[#E6D5B8] text-[#8B6F47]' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700' },
  'auto-resolved': { label: '⚡ Auto-Resolved', color: 'bg-[#F0E68C]/30 text-[#8B6F47] border-[#D4AF37]' }
};

export function Dashboard({ onSelectTicket, language, tickets, ticketFilter, onFilterChange }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTickets = useMemo(() => {
    let filtered = tickets.filter(ticket => {
      const matchesSearch = 
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      const matchesTeam = teamFilter === 'all' || ticket.team === teamFilter;
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      
      return matchesSearch && matchesPriority && matchesTeam && matchesStatus;
    });

    // Apply top-level filter from stats cards
    if (ticketFilter === 'open') {
      filtered = filtered.filter(t => t.status === 'open' || t.status === 'in-progress');
    } else if (ticketFilter === 'auto-resolved') {
      filtered = filtered.filter(t => t.status === 'auto-resolved');
    } else if (ticketFilter === 'sla-risk') {
      filtered = filtered.filter(t => t.slaMinutesRemaining < 60 && (t.status === 'open' || t.status === 'in-progress'));
    }

    return filtered;
  }, [tickets, searchQuery, priorityFilter, teamFilter, statusFilter, ticketFilter]);

  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'open' || t.status === 'in-progress').length;
    const autoResolved = tickets.filter(t => t.status === 'auto-resolved').length;
    const breachRisk = tickets.filter(t => t.slaMinutesRemaining < 60 && (t.status === 'open' || t.status === 'in-progress')).length;
    
    return { total, open, autoResolved, breachRisk };
  }, [tickets]);

  const getSLAColor = (minutes: number) => {
    if (minutes < 30) return 'text-red-600';
    if (minutes < 60) return 'text-orange-600';
    return 'text-[#5C4A3A]';
  };

  const formatSLATime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      <HelpTooltips showInitialTour={true} />
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card 
          className={`border-l-4 border-l-[#8B6F47] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group cursor-pointer ${ticketFilter === 'all' ? 'ring-2 ring-[#D4AF37]' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B6F47]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="pt-4 sm:pt-6 pb-4 px-3 sm:px-6 relative">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-[#9C8A76] truncate">Total</p>
                <p className="text-xl sm:text-2xl mt-1 text-[#5C4A3A]">{stats.total}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5EFE6] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B6F47]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`border-l-4 border-l-orange-500 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group cursor-pointer ${ticketFilter === 'open' ? 'ring-2 ring-[#D4AF37]' : ''}`}
          onClick={() => onFilterChange('open')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="pt-4 sm:pt-6 pb-4 px-3 sm:px-6 relative">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-[#9C8A76] truncate">Open</p>
                <p className="text-xl sm:text-2xl mt-1 text-[#5C4A3A]">{stats.open}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`border-l-4 border-l-[#D4AF37] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group cursor-pointer ${ticketFilter === 'auto-resolved' ? 'ring-2 ring-[#D4AF37]' : ''}`}
          onClick={() => onFilterChange('auto-resolved')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#F0E68C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="pt-4 sm:pt-6 pb-4 px-3 sm:px-6 relative">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-[#9C8A76] truncate">⚡ AI Resolved</p>
                <p className="text-xl sm:text-2xl mt-1 text-[#5C4A3A]">{stats.autoResolved}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F0E68C]/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] group-hover:animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`border-l-4 border-l-red-500 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group cursor-pointer ${ticketFilter === 'sla-risk' ? 'ring-2 ring-[#D4AF37]' : ''}`}
          onClick={() => onFilterChange('sla-risk')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="pt-4 sm:pt-6 pb-4 px-3 sm:px-6 relative">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-[#9C8A76] truncate">⚠️ SLA Risk</p>
                <p className="text-xl sm:text-2xl mt-1 text-[#5C4A3A]">{stats.breachRisk}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 group-hover:animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C8A76]" />
                <Input
                  placeholder="Search tickets, customers, IDs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">🔴 Urgent</SelectItem>
                <SelectItem value="medium">🟡 Medium</SelectItem>
                <SelectItem value="low">🟢 Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="bugs">Bugs</SelectItem>
                <SelectItem value="features">Feature Requests</SelectItem>
                <SelectItem value="abuse">Abuse Reports</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="auto-resolved">Auto-Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inbox Temperature Gauge */}
      <Card className={`border-2 transition-all duration-300 ${
        stats.breachRisk >= 6 
          ? 'border-red-400 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg' 
          : stats.breachRisk >= 3
          ? 'border-orange-400 bg-gradient-to-r from-orange-50 to-amber-50 shadow-md'
          : 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                stats.breachRisk >= 6 
                  ? 'bg-red-100 animate-pulse' 
                  : stats.breachRisk >= 3
                  ? 'bg-orange-100'
                  : 'bg-green-100'
              }`}>
                {stats.breachRisk >= 6 ? (
                  <Flame className="w-7 h-7 text-red-600 animate-pulse" />
                ) : stats.breachRisk >= 3 ? (
                  <ThermometerSun className="w-7 h-7 text-orange-600" />
                ) : (
                  <Snowflake className="w-7 h-7 text-green-600" />
                )}
              </div>
              <div>
                <p className="text-sm text-[#9C8A76] flex items-center">
                  Inbox Temperature
                  <InboxTempTooltip />
                </p>
                <p className={`text-xl ${
                  stats.breachRisk >= 6 
                    ? 'text-red-700' 
                    : stats.breachRisk >= 3
                    ? 'text-orange-700'
                    : 'text-green-700'
                }`}>
                  {stats.breachRisk >= 6 ? '🔥 HOT' : stats.breachRisk >= 3 ? '🌡️ WARM' : '❄️ COOL'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl">{stats.breachRisk}</p>
              <p className="text-sm text-[#9C8A76]">urgent tickets</p>
            </div>
          </div>
          {stats.breachRisk >= 6 && (
            <div className="mt-3 pt-3 border-t border-red-200">
              <p className="text-sm text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Critical load! Consider escalating to additional agents.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[#5C4A3A]">
            {filteredTickets.length} {filteredTickets.length === 1 ? 'Ticket' : 'Tickets'}
          </h2>
        </div>

        {filteredTickets.map((ticket, index) => {
          const EmotionIcon = emotionIcons[ticket.emotion].icon;
          
          return (
            <Card 
              key={ticket.id} 
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:-translate-y-0.5 bg-gradient-to-br from-white to-[#FFFCF7] animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
              onClick={() => onSelectTicket(ticket.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-[#8B6F47] to-[#D4AF37] text-[#FFFCF7]">
                      {ticket.customer.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-[#9C8A76]">{ticket.id}</span>
                          <Badge variant="outline" className={priorityConfig[ticket.priority].color}>
                            {priorityConfig[ticket.priority].label}
                          </Badge>
                          <Badge variant="outline" className={statusConfig[ticket.status].color}>
                            {statusConfig[ticket.status].label}
                          </Badge>
                        </div>
                        <h3 className="truncate">{ticket.subject}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <EmotionIcon className={`w-5 h-5 ${emotionIcons[ticket.emotion].color}`} />
                        <div className="text-right">
                          <div className={`text-sm ${getSLAColor(ticket.slaMinutesRemaining)}`}>
                            <Clock className="w-4 h-4 inline mr-1" />
                            {formatSLATime(ticket.slaMinutesRemaining)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-[#9C8A76] line-clamp-2 mb-3">
                      {ticket.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#5C4A3A]">
                          <span className="text-[#9C8A76]">From:</span> {ticket.customer.name}
                        </span>
                        <Badge variant="secondary" className="text-xs bg-[#F5EFE6] text-[#5C4A3A]">
                          {ticket.customer.accountType}
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${teamConfig[ticket.team].color}`}></div>
                        <span className="text-[#9C8A76]">{teamConfig[ticket.team].label}</span>
                      </div>

                      {ticket.assignedTo && (
                        <div className="text-sm text-[#9C8A76]">
                          Assigned to: <span className="text-[#5C4A3A]">{ticket.assignedTo}</span>
                        </div>
                      )}
                    </div>

                    {ticket.tags.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {ticket.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredTickets.length === 0 && (
          <Card className="border-2 border-dashed border-[#D4AF37]/30">
            <CardContent className="p-12 text-center">
              {tickets.length === 0 ? (
                <>
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F5EFE6] to-[#F0E68C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PartyPopper className="w-10 h-10 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-[#5C4A3A] mb-2">Inbox Zero! 🎉</h3>
                  <p className="text-sm text-[#9C8A76] mb-4">
                    Amazing work! All tickets have been resolved. Time for a coffee break! ☕
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-[#9C8A76]">
                    <Coffee className="w-4 h-4" />
                    <span>You're crushing it today!</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F5EFE6] to-[#F0E68C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-[#5C4A3A] mb-2">No tickets match your filters</h3>
                  <p className="text-sm text-[#9C8A76] mb-4">Try adjusting your filters or search query</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setPriorityFilter('all');
                      setTeamFilter('all');
                      setStatusFilter('all');
                      onFilterChange('all');
                    }}
                    className="border-[#D4AF37]/40 text-[#8B6F47] hover:bg-[#F5EFE6]"
                  >
                    Clear All Filters
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
