import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Users, Zap, Award, Clock } from 'lucide-react';

interface Agent {
  name: string;
  avatar: string;
  specialty: string;
  activeTickets: number;
  capacity: number;
  avgResponseTime: string;
  csat: number;
  available: boolean;
}

const agents: Agent[] = [
  {
    name: 'Emma Williams',
    avatar: 'EW',
    specialty: 'Billing Expert',
    activeTickets: 3,
    capacity: 8,
    avgResponseTime: '12 min',
    csat: 98,
    available: true
  },
  {
    name: 'Alex Kumar',
    avatar: 'AK',
    specialty: 'Technical Lead',
    activeTickets: 7,
    capacity: 10,
    avgResponseTime: '18 min',
    csat: 96,
    available: true
  },
  {
    name: 'Sarah Chen',
    avatar: 'SC',
    specialty: 'Product Specialist',
    activeTickets: 2,
    capacity: 6,
    avgResponseTime: '15 min',
    csat: 99,
    available: true
  },
  {
    name: 'David Park',
    avatar: 'DP',
    specialty: 'Trust & Safety',
    activeTickets: 5,
    capacity: 8,
    avgResponseTime: '8 min',
    csat: 97,
    available: false
  }
];

interface SmartAgentAssignmentProps {
  team: string;
  priority: string;
}

export function SmartAgentAssignment({ team, priority }: SmartAgentAssignmentProps) {
  const getRecommendedAgent = () => {
    if (team === 'billing') return agents[0];
    if (team === 'bugs') return agents[1];
    if (team === 'features') return agents[2];
    return agents[3];
  };

  const recommended = getRecommendedAgent();
  const workloadPercent = (recommended.activeTickets / recommended.capacity) * 100;

  return (
    <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-base text-[#5C4A3A]">Smart Assignment</CardTitle>
          <Badge variant="outline" className="ml-auto border-indigo-300 text-indigo-700 bg-indigo-50">
            AI Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recommended Agent */}
        <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">Recommended Agent</span>
            <Badge className="ml-auto bg-green-600 text-white text-xs">Best Match</Badge>
          </div>
          
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="w-10 h-10 ring-2 ring-green-300">
              <AvatarFallback className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                {recommended.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm text-[#5C4A3A]">{recommended.name}</p>
              <p className="text-xs text-[#9C8A76]">{recommended.specialty}</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-600" />
                  <span className="text-xs text-[#9C8A76]">{recommended.csat}% CSAT</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-600" />
                  <span className="text-xs text-[#9C8A76]">{recommended.avgResponseTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#9C8A76]">Current Workload</span>
              <span className="text-xs text-[#5C4A3A]">{recommended.activeTickets}/{recommended.capacity}</span>
            </div>
            <Progress value={workloadPercent} className="h-2" />
            <p className="text-xs text-[#9C8A76] mt-1">
              {workloadPercent < 50 && '✓ Low workload - ideal for assignment'}
              {workloadPercent >= 50 && workloadPercent < 80 && '~ Moderate workload - can handle ticket'}
              {workloadPercent >= 80 && '⚠ High workload - consider backup agent'}
            </p>
          </div>
        </div>

        {/* Team Capacity Overview */}
        <div className="pt-3 border-t border-indigo-100">
          <p className="text-xs text-[#9C8A76] mb-2">Team Capacity</p>
          <div className="space-y-2">
            {agents.map((agent) => {
              const capacity = (agent.activeTickets / agent.capacity) * 100;
              return (
                <div key={agent.name} className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gradient-to-br from-[#8B6F47] to-[#D4AF37] text-white text-xs">
                      {agent.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs text-[#5C4A3A] truncate">{agent.name.split(' ')[0]}</span>
                      <span className="text-xs text-[#9C8A76]">{agent.activeTickets}/{agent.capacity}</span>
                    </div>
                    <Progress value={capacity} className="h-1.5" />
                  </div>
                  <div className={`w-2 h-2 rounded-full ${agent.available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Auto-Assignment Toggle */}
        <div className="pt-3 border-t border-indigo-100">
          <div className="flex items-center justify-between p-2 bg-white rounded border border-indigo-200">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-xs text-[#5C4A3A]">Auto-Assign Enabled</span>
            </div>
            <Badge className="bg-indigo-600 text-white text-xs">Active</Badge>
          </div>
          <p className="text-xs text-[#9C8A76] mt-2">
            AI will automatically assign this ticket to {recommended.name} based on expertise, workload, and performance metrics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
