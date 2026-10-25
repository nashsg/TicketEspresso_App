import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { TicketDetail } from './components/TicketDetail';
import { Analytics } from './components/Analytics';
import { SettingsDialog } from './components/SettingsDialog';
import { CoffeeCupLogo } from './components/CoffeeCupLogo';
import { Button } from './components/ui/button';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Separator } from './components/ui/separator';
import { Toaster } from './components/ui/sonner';
import { mockTickets as initialTickets, Ticket } from './data/mockTickets';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react';

type View = 'login' | 'dashboard' | 'ticket-detail' | 'analytics';
type FilterType = 'all' | 'open' | 'auto-resolved' | 'sla-risk';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [language, setLanguage] = useState('en-GB');
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [ticketFilter, setTicketFilter] = useState<FilterType>('all');

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
    setSelectedTicketId(null);
  };

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setCurrentView('ticket-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedTicketId(null);
    setCurrentView('dashboard');
  };

  const updateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, ...updates }
          : ticket
      )
    );
  };

  const handleFilterChange = (filter: FilterType) => {
    setTicketFilter(filter);
    setCurrentView('dashboard');
  };

  const languageLabels: Record<string, string> = {
    'en-GB': '🇬🇧 English (UK)',
    'en-US': '🇺🇸 English (US)',
    'es': '🇪🇸 Español',
    'fr': '🇫🇷 Français',
    'de': '🇩🇪 Deutsch',
    'it': '🇮🇹 Italiano',
    'pt': '🇵🇹 Português',
    'nl': '🇳🇱 Nederlands',
    'pl': '🇵🇱 Polski',
    'ja': '🇯🇵 日本語',
    'zh': '🇨🇳 中文',
    'ko': '🇰🇷 한국어',
    'ar': '🇸🇦 العربية',
    'hi': '🇮🇳 हिन्दी'
  };

  if (currentView === 'login') {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen relative">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-[#FFFCF7] to-[#F5EFE6] border-b-2 border-[#D4AF37]/20 sticky top-0 z-10 shadow-md relative backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-8">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="relative">
                <CoffeeCupLogo size={40} className="sm:w-[52px] sm:h-[52px]" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl bg-gradient-to-r from-[#8B6F47] via-[#D4AF37] to-[#8B6F47] bg-clip-text text-transparent">
                  TicketEspresso
                </h1>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span className="text-xs text-[#9C8A76]">One Shot. Instant Resolution.</span>
                </div>
              </div>
              <div className="sm:hidden">
                <h1 className="text-base bg-gradient-to-r from-[#8B6F47] via-[#D4AF37] to-[#8B6F47] bg-clip-text text-transparent">
                  TicketEspresso
                </h1>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-3 flex-1 justify-center">
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('dashboard')}
                className={currentView === 'dashboard' 
                  ? 'bg-gradient-to-r from-[#8B6F47] to-[#D4AF37] hover:from-[#6B5537] hover:to-[#C9A961] text-[#FFFCF7] shadow-md' 
                  : 'text-[#5C4A3A] hover:bg-[#F5EFE6] hover:shadow-sm transition-all'}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={currentView === 'analytics' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('analytics')}
                className={currentView === 'analytics' 
                  ? 'bg-gradient-to-r from-[#8B6F47] to-[#D4AF37] hover:from-[#6B5537] hover:to-[#C9A961] text-[#FFFCF7] shadow-md' 
                  : 'text-[#5C4A3A] hover:bg-[#F5EFE6] hover:shadow-sm transition-all'}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden flex items-center gap-1">
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('dashboard')}
                size="sm"
                className={currentView === 'dashboard' 
                  ? 'bg-gradient-to-r from-[#8B6F47] to-[#D4AF37] text-[#FFFCF7]' 
                  : 'text-[#5C4A3A]'}
              >
                <LayoutDashboard className="w-4 h-4" />
              </Button>
              <Button
                variant={currentView === 'analytics' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('analytics')}
                size="sm"
                className={currentView === 'analytics' 
                  ? 'bg-gradient-to-r from-[#8B6F47] to-[#D4AF37] text-[#FFFCF7]' 
                  : 'text-[#5C4A3A]'}
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Button
                variant="ghost"
                onClick={() => setSettingsOpen(true)}
                size="sm"
                className="text-[#5C4A3A] hover:bg-[#F5EFE6] hidden sm:flex"
              >
                <Settings className="w-4 h-4 sm:mr-2" />
                <span className="hidden lg:inline">Settings</span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => setSettingsOpen(true)}
                size="icon"
                className="text-[#5C4A3A] hover:bg-[#F5EFE6] sm:hidden"
              >
                <Settings className="w-4 h-4" />
              </Button>

              <Separator orientation="vertical" className="h-8 hidden sm:block" />

              <div className="hidden lg:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-[#5C4A3A]">Agent Smith</p>
                  <p className="text-xs text-[#9C8A76]">{languageLabels[language]}</p>
                </div>
                <Avatar className="ring-2 ring-[#D4AF37]/30">
                  <AvatarFallback className="bg-gradient-to-br from-[#8B6F47] to-[#D4AF37] text-[#FFFCF7]">
                    AS
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                  className="text-[#5C4A3A] hover:bg-[#F5EFE6]"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>

              {/* Mobile User Menu */}
              <div className="lg:hidden flex items-center gap-2">
                <Avatar className="ring-2 ring-[#D4AF37]/30 w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-[#8B6F47] to-[#D4AF37] text-[#FFFCF7] text-xs">
                    AS
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                  className="text-[#5C4A3A] hover:bg-[#F5EFE6]"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && (
          <Dashboard 
            onSelectTicket={handleSelectTicket} 
            language={language} 
            tickets={tickets}
            ticketFilter={ticketFilter}
            onFilterChange={handleFilterChange}
          />
        )}
        
        {currentView === 'ticket-detail' && selectedTicketId && (
          <TicketDetail 
            ticketId={selectedTicketId} 
            onBack={handleBackToDashboard}
            language={language}
            tickets={tickets}
            onUpdateTicket={updateTicket}
          />
        )}
        
        {currentView === 'analytics' && (
          <Analytics language={language} tickets={tickets} />
        )}
      </main>

      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
