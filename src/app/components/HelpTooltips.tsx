import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, HelpCircle, Lightbulb } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HelpTooltipsProps {
  showInitialTour?: boolean;
}

export function HelpTooltips({ showInitialTour = false }: HelpTooltipsProps) {
  const [showTour, setShowTour] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [helpMode, setHelpMode] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('ticketEspressoTourCompleted');
    if (!hasSeenTour && showInitialTour) {
      setShowTour(true);
    }
  }, [showInitialTour]);

  const tourSteps = [
    {
      title: "Welcome to TicketEspresso! ☕",
      description: "Your AI-powered support command centre. Let's take a quick tour to get you started.",
      position: "center"
    },
    {
      title: "Stats Cards 📊",
      description: "Click any stat card to filter tickets. 'SLA Risk' shows tickets at risk of missing their Service Level Agreement deadline.",
      position: "top"
    },
    {
      title: "Priority Levels 🎯",
      description: "🔴 URGENT (1hr SLA) • 🟡 MEDIUM (3hr) • 🟢 LOW (6hr). Tickets are auto-triaged by AI based on urgency and emotion.",
      position: "top"
    },
    {
      title: "Inbox Temperature 🌡️",
      description: "See your workload at a glance: 🔥 HOT (6+ urgent), 🌡️ WARM (3-5), ❄️ COOL (<3). Helps you know when to escalate.",
      position: "top"
    },
    {
      title: "AI Co-Pilot 🤖",
      description: "Click any ticket to see AI-generated responses, customer history, and smart suggestions. One-click quick resolution available!",
      position: "center"
    }
  ];

  const handleCompleteTour = () => {
    setShowTour(false);
    localStorage.setItem('ticketEspressoTourCompleted', 'true');
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteTour();
      setCurrentStep(0);
    }
  };

  const handleSkip = () => {
    handleCompleteTour();
    setCurrentStep(0);
  };

  if (showTour) {
    const step = tourSteps[currentStep];
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full border-2 border-[#D4AF37] shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B6F47] to-[#D4AF37] rounded-lg flex items-center justify-center shrink-0">
                <Lightbulb className="w-6 h-6 text-[#FFFCF7]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#5C4A3A] mb-2">{step.title}</h3>
                <p className="text-sm text-[#9C8A76] leading-relaxed">{step.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20">
              <div className="flex gap-1">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'bg-[#D4AF37] w-6'
                        : 'bg-[#D4AF37]/30'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-[#9C8A76] hover:bg-[#F5EFE6]"
                >
                  Skip Tour
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#8B6F47] to-[#D4AF37] text-[#FFFCF7]"
                >
                  {currentStep === tourSteps.length - 1 ? "Get Started" : "Next"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      <TooltipProvider>
        <Tooltip open={helpMode}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                setHelpMode(!helpMode);
                if (!helpMode) {
                  setShowTour(true);
                }
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#D4AF37] text-[#FFFCF7] shadow-lg hover:shadow-xl transition-all hover:scale-110"
              title="Help & Tutorial"
            >
              <HelpCircle className="w-6 h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-xs">
            <p className="text-sm">Click to restart the welcome tour and learn how to use TicketEspresso!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export function SLATooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="w-3 h-3 text-[#9C8A76] inline-block ml-1 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">
            <strong>SLA (Service Level Agreement)</strong>: The maximum time allowed to respond to a ticket before it's considered overdue.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function InboxTempTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="w-3 h-3 text-[#9C8A76] inline-block ml-1 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">
            <strong>Inbox Temperature</strong>: Shows your current workload urgency. 🔥 HOT means you have many urgent tickets that need immediate attention.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function AutoTriageTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="w-3 h-3 text-[#9C8A76] inline-block ml-1 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">
            <strong>Auto-Triage</strong>: Our AI automatically categorizes tickets by team (Billing, Bugs, etc.) and sets priority based on urgency, emotion, and keywords.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
