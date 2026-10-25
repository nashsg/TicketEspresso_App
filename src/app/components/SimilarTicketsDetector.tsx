import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Copy, ExternalLink, Merge } from 'lucide-react';

interface SimilarTicket {
  id: string;
  subject: string;
  similarity: number;
  status: string;
  resolution?: string;
}

interface SimilarTicketsDetectorProps {
  currentTicketSubject: string;
}

export function SimilarTicketsDetector({ currentTicketSubject }: SimilarTicketsDetectorProps) {
  // Simulate AI similarity detection
  const getSimilarTickets = (): SimilarTicket[] => {
    if (currentTicketSubject.toLowerCase().includes('password')) {
      return [
        {
          id: 'TKT-0987',
          subject: 'Password reset email not arriving',
          similarity: 92,
          status: 'resolved',
          resolution: 'Email was in spam folder. Sent new reset link.'
        },
        {
          id: 'TKT-0876',
          subject: 'Can\'t reset my password',
          similarity: 88,
          status: 'resolved',
          resolution: 'Reset link expired. Generated new link with 24hr validity.'
        }
      ];
    }
    
    if (currentTicketSubject.toLowerCase().includes('invoice') || currentTicketSubject.toLowerCase().includes('billing')) {
      return [
        {
          id: 'TKT-0765',
          subject: 'Missing invoice for last month',
          similarity: 95,
          status: 'auto-resolved',
          resolution: 'Invoice automatically resent via email.'
        }
      ];
    }

    if (currentTicketSubject.toLowerCase().includes('charged') || currentTicketSubject.toLowerCase().includes('payment')) {
      return [
        {
          id: 'TKT-0654',
          subject: 'Double charged this month',
          similarity: 89,
          status: 'resolved',
          resolution: 'Duplicate charge refunded. Processing time: 5-7 business days.'
        }
      ];
    }

    return [
      {
        id: 'TKT-0543',
        subject: 'Similar issue reported',
        similarity: 78,
        status: 'resolved',
        resolution: 'Issue resolved with standard troubleshooting steps.'
      }
    ];
  };

  const similarTickets = getSimilarTickets();

  if (similarTickets.length === 0) return null;

  return (
    <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50/50 to-blue-50/30 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Copy className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-base text-[#5C4A3A]">Similar Tickets Found</CardTitle>
          <Badge variant="outline" className="ml-auto border-cyan-300 text-cyan-700 bg-cyan-50">
            AI Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-[#9C8A76]">
          AI detected {similarTickets.length} similar {similarTickets.length === 1 ? 'ticket' : 'tickets'}. Review past resolutions to speed up response.
        </p>

        {similarTickets.map((ticket) => (
          <div 
            key={ticket.id}
            className="p-3 bg-white rounded-lg border border-cyan-200 hover:border-cyan-400 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[#9C8A76]">{ticket.id}</span>
                  <Badge 
                    variant="outline" 
                    className={
                      ticket.status === 'resolved' || ticket.status === 'auto-resolved'
                        ? 'bg-green-50 text-green-700 border-green-200 text-xs'
                        : 'bg-blue-50 text-blue-700 border-blue-200 text-xs'
                    }
                  >
                    {ticket.status}
                  </Badge>
                </div>
                <p className="text-sm text-[#5C4A3A] mb-2">{ticket.subject}</p>
                
                {ticket.resolution && (
                  <div className="p-2 bg-green-50 rounded border border-green-200 mb-2">
                    <p className="text-xs text-green-800">
                      <strong>Resolution:</strong> {ticket.resolution}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="ml-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center border-2 border-cyan-300">
                  <div className="text-center">
                    <span className="text-sm text-cyan-700">{ticket.similarity}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 text-xs border-cyan-300 text-cyan-700 hover:bg-cyan-50"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 text-xs border-cyan-300 text-cyan-700 hover:bg-cyan-50"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy Solution
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-3 border-t border-cyan-100">
          <Button 
            variant="outline" 
            size="sm"
            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <Merge className="w-3 h-3 mr-2" />
            Suggest as Duplicate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
