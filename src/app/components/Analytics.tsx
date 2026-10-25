import { teamStats, type Ticket } from '../data/mockTickets';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Clock, 
  CheckCircle, 
  Zap, 
  Target,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Users,
  BarChart3,
  Activity
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';

// Custom Tooltip component with proper colors
const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#FFFCF7] border-2 border-[#D4AF37] rounded-lg p-3 shadow-lg">
        {label && <p className="text-[#5C4A3A] mb-1">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: <span className="text-[#5C4A3A]">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface AnalyticsProps {
  language: string;
  tickets: Ticket[];
}

const teamConfig = {
  billing: { label: 'Billing', color: '#8B6F47', icon: '💳' },
  bugs: { label: 'Bugs', color: '#D4AF37', icon: '🔧' },
  features: { label: 'Feature Requests', color: '#B8956A', icon: '✨' },
  abuse: { label: 'Abuse Reports', color: '#EF4444', icon: '🛡️' },
  general: { label: 'General Inquiry', color: '#6B7280', icon: '💬' }
};

export function Analytics({ language, tickets }: AnalyticsProps) {
  const totalTickets = tickets.length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved' || t.status === 'auto-resolved').length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const autoResolvedTickets = tickets.filter(t => t.status === 'auto-resolved').length;
  const avgResolutionRate = Math.round((resolvedTickets / totalTickets) * 100);
  const autoResolveRate = Math.round((autoResolvedTickets / totalTickets) * 100);

  const slaCompliance = 92;
  const avgResolutionTime = '3.2h';
  const avgFirstResponse = '8min';

  // Priority breakdown
  const urgentCount = mockTickets.filter(t => t.priority === 'urgent').length;
  const mediumCount = mockTickets.filter(t => t.priority === 'medium').length;
  const lowCount = mockTickets.filter(t => t.priority === 'low').length;

  // Team breakdown
  const teamBreakdown = [
    { name: 'Billing', value: mockTickets.filter(t => t.team === 'billing').length, color: '#8B6F47' },
    { name: 'Bugs', value: mockTickets.filter(t => t.team === 'bugs').length, color: '#D4AF37' },
    { name: 'Features', value: mockTickets.filter(t => t.team === 'features').length, color: '#B8956A' },
    { name: 'Abuse', value: mockTickets.filter(t => t.team === 'abuse').length, color: '#EF4444' }
  ];

  // Weekly trend data (mock)
  const weeklyData = [
    { day: 'Mon', tickets: 24, resolved: 20 },
    { day: 'Tue', tickets: 28, resolved: 25 },
    { day: 'Wed', tickets: 32, resolved: 28 },
    { day: 'Thu', tickets: 26, resolved: 24 },
    { day: 'Fri', tickets: 30, resolved: 27 },
    { day: 'Sat', tickets: 18, resolved: 16 },
    { day: 'Sun', tickets: 15, resolved: 14 }
  ];

  // Response time trend (mock)
  const responseTimeTrend = [
    { time: 'Week 1', avgTime: 15 },
    { time: 'Week 2', avgTime: 12 },
    { time: 'Week 3', avgTime: 10 },
    { time: 'Week 4', avgTime: 8 }
  ];

  // Emotion breakdown
  const emotionBreakdown = [
    { name: 'Angry 😡', value: mockTickets.filter(t => t.emotion === 'angry').length, color: '#EF4444' },
    { name: 'Frustrated 😰', value: mockTickets.filter(t => t.emotion === 'frustrated').length, color: '#F97316' },
    { name: 'Calm 😊', value: mockTickets.filter(t => t.emotion === 'calm').length, color: '#22C55E' },
    { name: 'Confused ❓', value: mockTickets.filter(t => t.emotion === 'confused').length, color: '#3B82F6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFFCF7] via-[#F5EFE6] to-[#FFFCF7] border-2 border-[#D4AF37]/30 rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#5C4A3A]">Analytics Dashboard</h1>
            <p className="text-[#9C8A76] mt-1">Real-time performance insights and trends</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[#9C8A76]">Live Data</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#8B6F47] shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9C8A76]">Total Tickets</p>
                <p className="text-3xl mt-1 text-[#5C4A3A]">{totalTickets}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                  <TrendingDown className="w-3 h-3" />
                  <span>8% vs last week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#F5EFE6] rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-[#8B6F47]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9C8A76]">Open Tickets</p>
                <p className="text-3xl mt-1 text-[#5C4A3A]">{openTickets}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-orange-600">
                  <AlertCircle className="w-3 h-3" />
                  <span>{urgentCount} urgent</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9C8A76]">Resolution Rate</p>
                <p className="text-3xl mt-1 text-[#5C4A3A]">{avgResolutionRate}%</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>12% improvement</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#D4AF37] shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9C8A76]">Avg Response</p>
                <p className="text-3xl mt-1 text-[#5C4A3A]">{avgFirstResponse}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-[#8B6F47]">
                  <Clock className="w-3 h-3" />
                  <span>Target: 15min</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#F0E68C]/30 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Volume Trend */}
        <Card className="border-[#D4AF37]/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#5C4A3A] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
              Weekly Ticket Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6D5B8" />
                <XAxis dataKey="day" stroke="#9C8A76" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9C8A76" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFCF7', 
                    border: '1px solid #D4AF37',
                    borderRadius: '8px',
                    color: '#5C4A3A'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#5C4A3A' }} />
                <Bar dataKey="tickets" fill="#8B6F47" name="Received" radius={[8, 8, 0, 0]} />
                <Bar dataKey="resolved" fill="#D4AF37" name="Resolved" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Trend */}
        <Card className="border-[#D4AF37]/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#5C4A3A] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              Response Time Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={responseTimeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6D5B8" />
                <XAxis dataKey="time" stroke="#9C8A76" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9C8A76" style={{ fontSize: '12px' }} label={{ value: 'Minutes', angle: -90, position: 'insideLeft', style: { fill: '#9C8A76', fontSize: '12px' } }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFCF7', 
                    border: '1px solid #D4AF37',
                    borderRadius: '8px',
                    color: '#5C4A3A'
                  }}
                />
                <Line type="monotone" dataKey="avgTime" stroke="#22C55E" strokeWidth={3} name="Avg Response (min)" dot={{ fill: '#22C55E', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700">✓ Response time improved by 47% this month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Distribution */}
        <Card className="border-[#D4AF37]/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#5C4A3A] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#D4AF37]" />
              Tickets by Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={teamBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {teamBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFCF7', 
                    border: '1px solid #D4AF37',
                    borderRadius: '8px',
                    color: '#5C4A3A'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {Object.entries(teamConfig).map(([key, config]) => {
                const count = mockTickets.filter(t => t.team === key).length;
                const percentage = Math.round((count / totalTickets) * 100);
                return (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }}></div>
                    <span className="text-[#5C4A3A]">{config.label}: {percentage}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Customer Sentiment */}
        <Card className="border-[#D4AF37]/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#5C4A3A] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#D4AF37]" />
              Customer Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={emotionBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {emotionBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFCF7', 
                    border: '1px solid #D4AF37',
                    borderRadius: '8px',
                    color: '#5C4A3A'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-[#F5EFE6] rounded-lg border border-[#D4AF37]/20">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-gradient-to-r from-[#F0E68C] to-[#D4AF37] rounded-full animate-pulse"></div>
                <span className="text-[#9C8A76]">Inbox Temperature:</span>
                <span className="text-orange-600">Warm 🌡️</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SLA Compliance */}
        <Card className="border-[#D4AF37]/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-[#5C4A3A]">SLA Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#E6D5B8"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#22C55E"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56 * (slaCompliance / 100)} ${2 * Math.PI * 56}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl text-[#5C4A3A]">{slaCompliance}%</p>
                    <p className="text-xs text-[#9C8A76]">Compliant</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[#5C4A3A]">
                <span className="text-[#9C8A76]">Target:</span>
                <span>95%</span>
              </div>
              <div className="flex justify-between text-[#5C4A3A]">
                <span className="text-[#9C8A76]">Current:</span>
                <span className="text-green-600">{slaCompliance}%</span>
              </div>
              <div className="flex justify-between text-[#5C4A3A]">
                <span className="text-[#9C8A76]">Gap:</span>
                <span className="text-orange-600">-3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority Breakdown */}
        <Card className="border-[#D4AF37]/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-[#5C4A3A]">Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-[#5C4A3A]">🔴 Urgent</span>
                </div>
                <span className="text-sm text-[#5C4A3A]">{urgentCount}</span>
              </div>
              <Progress value={(urgentCount / totalTickets) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm text-[#5C4A3A]">🟡 Medium</span>
                </div>
                <span className="text-sm text-[#5C4A3A]">{mediumCount}</span>
              </div>
              <Progress value={(mediumCount / totalTickets) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-[#5C4A3A]">🟢 Low</span>
                </div>
                <span className="text-sm text-[#5C4A3A]">{lowCount}</span>
              </div>
              <Progress value={(lowCount / totalTickets) * 100} className="h-2" />
            </div>

            <div className="pt-3 border-t border-[#D4AF37]/20">
              <p className="text-xs text-[#9C8A76]">Avg Resolution Times</p>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between text-[#5C4A3A]">
                  <span className="text-[#9C8A76]">Urgent:</span>
                  <span>45min</span>
                </div>
                <div className="flex justify-between text-[#5C4A3A]">
                  <span className="text-[#9C8A76]">Medium:</span>
                  <span>2.5h</span>
                </div>
                <div className="flex justify-between text-[#5C4A3A]">
                  <span className="text-[#9C8A76]">Low:</span>
                  <span>5.2h</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Performance */}
        <Card className="border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#FFFCF7] to-[#F0E68C]/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-[#5C4A3A] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              AI Auto-Resolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <p className="text-4xl text-[#5C4A3A]">{autoResolveRate}%</p>
              <p className="text-sm text-[#9C8A76] mt-1">of tickets auto-resolved</p>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-[#D4AF37]/20">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-[#5C4A3A]">Password Resets</span>
                </div>
                <p className="text-xs text-[#9C8A76]">98% success rate</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#D4AF37]/20">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-[#5C4A3A]">Billing Inquiries</span>
                </div>
                <p className="text-xs text-[#9C8A76]">87% success rate</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#D4AF37]/20">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-[#5C4A3A]">FAQs</span>
                </div>
                <p className="text-xs text-[#9C8A76]">95% success rate</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-[#F0E68C]/20 rounded-lg border border-[#D4AF37]/30">
              <p className="text-xs text-[#8B6F47] text-center">
                ⚡ Saved ~{autoResolvedTickets * 15} minutes of agent time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#FFFCF7] via-[#F5EFE6] to-[#F0E68C]/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#5C4A3A]">
            <Zap className="w-5 h-5 text-[#D4AF37]" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-[#5C4A3A]"><strong>Response time improved 47%</strong> this month</p>
                  <p className="text-xs text-[#9C8A76] mt-1">AI routing optimization working effectively</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-[#5C4A3A]"><strong>VIP customers</strong> routed 40% faster</p>
                  <p className="text-xs text-[#9C8A76] mt-1">Priority detection working as expected</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-orange-200">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-[#5C4A3A]"><strong>Peak hours:</strong> 9-11 AM & 2-4 PM</p>
                  <p className="text-xs text-[#9C8A76] mt-1">Recommend increasing staff during these times</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-[#5C4A3A]"><strong>Angry customers</strong> handled by seniors</p>
                  <p className="text-xs text-[#9C8A76] mt-1">Results in 23% higher satisfaction scores</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
