import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Brain, Target, TrendingUp, AlertCircle, CheckCircle, Activity } from 'lucide-react';

interface AITriagePanelProps {
  ticketId: string;
  team: string;
  priority: string;
  emotion: string;
}

export function AITriagePanel({ ticketId, team, priority, emotion }: AITriagePanelProps) {
  // Simulate AI confidence scores
  const calculateConfidence = () => {
    const baseConfidence = Math.random() * 30 + 70; // 70-100%
    const emotionPenalty = emotion === 'angry' ? -5 : emotion === 'confused' ? -10 : 0;
    return Math.min(100, Math.max(60, baseConfidence + emotionPenalty));
  };

  const confidence = calculateConfidence();
  const routingAccuracy = 94; // Historical accuracy
  const breachRisk = priority === 'urgent' ? 68 : priority === 'medium' ? 32 : 12;

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getConfidenceBg = (score: number) => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 75) return 'bg-blue-50 border-blue-200';
    if (score >= 60) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 to-blue-50/30 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-base text-[#5C4A3A]">AI Triage Analysis</CardTitle>
          <Badge variant="outline" className="ml-auto border-purple-300 text-purple-700 bg-purple-50">
            Live AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Routing Confidence */}
        <div className={`p-3 rounded-lg border-2 ${getConfidenceBg(confidence)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className={`w-4 h-4 ${getConfidenceColor(confidence)}`} />
              <span className="text-sm text-[#5C4A3A]">Routing Confidence</span>
            </div>
            <span className={`text-lg ${getConfidenceColor(confidence)}`}>
              {confidence.toFixed(0)}%
            </span>
          </div>
          <Progress value={confidence} className="h-2 mb-2" />
          <p className="text-xs text-[#9C8A76]">
            {confidence >= 90 && '✓ High confidence - routing is accurate'}
            {confidence >= 75 && confidence < 90 && '~ Good confidence - recommended routing'}
            {confidence < 75 && '⚠ Lower confidence - may need manual review'}
          </p>
        </div>

        {/* SLA Breach Prediction */}
        <div className={`p-3 rounded-lg border ${
          breachRisk >= 60 ? 'bg-red-50 border-red-200' :
          breachRisk >= 30 ? 'bg-orange-50 border-orange-200' :
          'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className={`w-4 h-4 ${
                breachRisk >= 60 ? 'text-red-600' :
                breachRisk >= 30 ? 'text-orange-600' :
                'text-green-600'
              }`} />
              <span className="text-sm text-[#5C4A3A]">SLA Breach Risk</span>
            </div>
            <span className={`text-lg ${
              breachRisk >= 60 ? 'text-red-600' :
              breachRisk >= 30 ? 'text-orange-600' :
              'text-green-600'
            }`}>
              {breachRisk}%
            </span>
          </div>
          <Progress value={breachRisk} className="h-2 mb-2" />
          <p className="text-xs text-[#9C8A76]">
            {breachRisk >= 60 && '🚨 High risk - assign to senior agent immediately'}
            {breachRisk >= 30 && breachRisk < 60 && '⚠ Moderate risk - monitor closely'}
            {breachRisk < 30 && '✓ Low risk - within expected resolution time'}
          </p>
        </div>

        {/* AI Learning Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-white rounded border border-[#D4AF37]/30">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-3 h-3 text-purple-600" />
              <span className="text-xs text-[#9C8A76]">Model Accuracy</span>
            </div>
            <p className="text-sm text-purple-700">{routingAccuracy}%</p>
          </div>
          <div className="p-2 bg-white rounded border border-[#D4AF37]/30">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-[#9C8A76]">Tickets Trained</span>
            </div>
            <p className="text-sm text-green-700">12,847</p>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="pt-3 border-t border-purple-100">
          <p className="text-xs text-[#9C8A76] mb-2">AI Recommendations:</p>
          <div className="space-y-1">
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
              <span className="text-[#5C4A3A]">
                {team === 'billing' && 'Auto-assign to Emma Williams (billing expert)'}
                {team === 'bugs' && 'Escalate to technical team lead'}
                {team === 'features' && 'Route to product team for evaluation'}
                {team === 'abuse' && 'Priority flag for trust & safety team'}
              </span>
            </div>
            {emotion === 'angry' && (
              <div className="flex items-start gap-2 text-xs">
                <CheckCircle className="w-3 h-3 text-orange-600 mt-0.5 shrink-0" />
                <span className="text-[#5C4A3A]">Use empathetic tone in response</span>
              </div>
            )}
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
              <span className="text-[#5C4A3A]">
                Similar tickets resolved in avg {priority === 'urgent' ? '23' : priority === 'medium' ? '45' : '78'} minutes
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
