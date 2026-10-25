import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Lightbulb, 
  Zap, 
  Target, 
  TrendingUp, 
  AlertCircle,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function QuickTipsPanel() {
  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/30 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-base text-[#5C4A3A]">Quick Tips</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="sla">
            <AccordionTrigger className="text-sm hover:no-underline">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>What does SLA mean?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#9C8A76] leading-relaxed">
              <strong>SLA (Service Level Agreement)</strong> is the maximum time you have to respond to a ticket:
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li><strong className="text-red-600">🔴 URGENT</strong>: 1 hour deadline</li>
                <li><strong className="text-amber-600">🟡 MEDIUM</strong>: 3 hours deadline</li>
                <li><strong className="text-green-600">🟢 LOW</strong>: 6 hours deadline</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="priorities">
            <AccordionTrigger className="text-sm hover:no-underline">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#D4AF37]" />
                <span>How are priorities assigned?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#9C8A76] leading-relaxed">
              Our AI automatically assigns priority based on:
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li><strong>Keywords</strong>: "urgent", "ASAP", "critical"</li>
                <li><strong>Customer emotion</strong>: Angry customers get higher priority</li>
                <li><strong>Account type</strong>: VIP customers prioritized</li>
                <li><strong>Issue type</strong>: Billing/account access = urgent</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ai-responses">
            <AccordionTrigger className="text-sm hover:no-underline">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#D4AF37]" />
                <span>How to use AI responses?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#9C8A76] leading-relaxed">
              <ol className="list-decimal ml-4 mt-2 space-y-2">
                <li>Click any ticket to open the detail view</li>
                <li>Review 3 AI-generated response options</li>
                <li>Click one to select it, or write your own</li>
                <li>Click "Send & Resolve" to respond</li>
              </ol>
              <p className="mt-2"><strong>Pro tip:</strong> Use Quick Resolve templates for common issues like password resets and refunds!</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="filtering">
            <AccordionTrigger className="text-sm hover:no-underline">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#D4AF37]" />
                <span>How do I find specific tickets?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#9C8A76] leading-relaxed">
              <strong>Multiple ways to filter:</strong>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li><strong>Click stat cards</strong>: Filter by "Open", "Auto-Resolved", or "SLA Risk"</li>
                <li><strong>Search bar</strong>: Type customer name, ticket ID, or keywords</li>
                <li><strong>Dropdowns</strong>: Filter by priority, team, or status</li>
              </ul>
              <p className="mt-2"><strong>Stuck?</strong> Click "Clear All Filters" to reset!</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="inbox-temp">
            <AccordionTrigger className="text-sm hover:no-underline">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                <span>What's the Inbox Temperature?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#9C8A76] leading-relaxed">
              A quick way to see your workload urgency:
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li><strong className="text-green-600">❄️ COOL</strong>: Less than 3 urgent tickets - you're all good!</li>
                <li><strong className="text-amber-600">🌡️ WARM</strong>: 3-5 urgent tickets - stay focused</li>
                <li><strong className="text-red-600">🔥 HOT</strong>: 6+ urgent tickets - time to escalate!</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="keyboard">
            <AccordionTrigger className="text-sm hover:no-underline">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Keyboard shortcuts?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#9C8A76] leading-relaxed">
              Work faster with these shortcuts:
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li><kbd className="px-2 py-0.5 bg-white rounded border text-xs">ESC</kbd> - Go back to dashboard from ticket</li>
                <li><strong>Click stat cards</strong> to quickly filter tickets</li>
              </ul>
              <p className="mt-2 text-xs italic">More shortcuts coming soon!</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
