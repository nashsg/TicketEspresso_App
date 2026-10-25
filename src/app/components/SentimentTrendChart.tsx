import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SentimentTrendChartProps {
  emotion: string;
  customerName: string;
}

export function SentimentTrendChart({ emotion, customerName }: SentimentTrendChartProps) {
  // Simulate historical sentiment data
  const getSentimentData = () => {
    const baseData = [
      { time: '6 months ago', score: 85, label: 'Happy' },
      { time: '5 months ago', score: 82, label: 'Satisfied' },
      { time: '4 months ago', score: 88, label: 'Happy' },
      { time: '3 months ago', score: 75, label: 'Neutral' },
      { time: '2 months ago', score: 78, label: 'Satisfied' },
      { time: '1 month ago', score: 70, label: 'Neutral' },
    ];

    // Add current sentiment
    let currentScore = 80;
    let currentLabel = 'Satisfied';
    
    if (emotion === 'angry') {
      currentScore = 25;
      currentLabel = 'Very Frustrated';
    } else if (emotion === 'frustrated') {
      currentScore = 50;
      currentLabel = 'Frustrated';
    } else if (emotion === 'confused') {
      currentScore = 65;
      currentLabel = 'Confused';
    } else {
      currentScore = 90;
      currentLabel = 'Happy';
    }

    return [...baseData, { time: 'Now', score: currentScore, label: currentLabel }];
  };

  const data = getSentimentData();
  const currentSentiment = data[data.length - 1];
  const previousSentiment = data[data.length - 2];
  const trend = currentSentiment.score - previousSentiment.score;

  const getTrendIcon = () => {
    if (trend > 10) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend < -10) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getTrendColor = () => {
    if (trend > 10) return 'text-green-600';
    if (trend < -10) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendText = () => {
    if (trend > 10) return '↑ Improving';
    if (trend < -10) return '↓ Declining';
    return '→ Stable';
  };

  return (
    <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50/50 to-purple-50/30 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            {getTrendIcon()}
          </div>
          <CardTitle className="text-base text-[#5C4A3A]">Sentiment Trend</CardTitle>
          <Badge variant="outline" className={`ml-auto border-pink-300 ${getTrendColor()} bg-pink-50`}>
            {getTrendText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Sentiment Score */}
        <div className="p-3 bg-white rounded-lg border-2 border-pink-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#9C8A76]">Current Sentiment</span>
            <span className={`text-2xl ${
              currentSentiment.score >= 80 ? 'text-green-600' :
              currentSentiment.score >= 60 ? 'text-blue-600' :
              currentSentiment.score >= 40 ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {currentSentiment.score}
            </span>
          </div>
          <p className="text-xs text-[#5C4A3A]">{currentSentiment.label}</p>
          {trend !== 0 && (
            <p className={`text-xs mt-2 ${getTrendColor()}`}>
              {trend > 0 ? '+' : ''}{trend.toFixed(0)} points from last interaction
            </p>
          )}
        </div>

        {/* Trend Chart */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }}
                stroke="#9C8A76"
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
                stroke="#9C8A76"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFCF7', 
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#ec4899" 
                strokeWidth={2}
                fill="url(#colorSentiment)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="pt-3 border-t border-pink-100">
          <p className="text-xs text-[#9C8A76] mb-2">AI Insights:</p>
          <div className="space-y-1">
            {currentSentiment.score < 50 && (
              <p className="text-xs text-red-700 flex items-start gap-2">
                <span>⚠️</span>
                <span>Customer satisfaction has declined. Prioritize empathetic response and consider escalation.</span>
              </p>
            )}
            {currentSentiment.score >= 50 && currentSentiment.score < 70 && (
              <p className="text-xs text-orange-700 flex items-start gap-2">
                <span>💡</span>
                <span>Customer showing signs of frustration. Address concerns promptly to prevent further decline.</span>
              </p>
            )}
            {currentSentiment.score >= 70 && currentSentiment.score < 85 && (
              <p className="text-xs text-blue-700 flex items-start gap-2">
                <span>ℹ️</span>
                <span>Customer sentiment is neutral. Opportunity to exceed expectations with excellent service.</span>
              </p>
            )}
            {currentSentiment.score >= 85 && (
              <p className="text-xs text-green-700 flex items-start gap-2">
                <span>✓</span>
                <span>Customer is satisfied. Maintain this positive relationship with continued great service.</span>
              </p>
            )}
            <p className="text-xs text-[#9C8A76] flex items-start gap-2">
              <span>📊</span>
              <span>Based on {data.length} interactions with {customerName}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
