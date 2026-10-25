import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CoffeeCupLogo } from './CoffeeCupLogo';
import { Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <CoffeeCupLogo size={72} />
            </div>
            <h1 className="text-3xl bg-gradient-to-r from-[#8B6F47] via-[#D4AF37] to-[#8B6F47] bg-clip-text text-transparent">
              TicketEspresso
            </h1>
          </div>
          <p className="text-[#5C4A3A]">One Shot. Instant Resolution.</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-[#8B6F47]">Powered by AI</span>
          </div>
        </div>

        <Card className="border-[#D4AF37]/30 shadow-2xl bg-gradient-to-br from-[#FFFCF7] to-[#F5EFE6]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-[#5C4A3A]">Welcome Back</CardTitle>
            <CardDescription className="text-[#9C8A76]">Sign in to your support dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="agent@ticketespresso.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#D4AF37]/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#D4AF37]/30"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#8B6F47] via-[#D4AF37] to-[#8B6F47] hover:from-[#6B5537] hover:via-[#C9A961] hover:to-[#6B5537] text-[#FFFCF7] shadow-lg">
                Sign In
              </Button>
            </form>
            <div className="mt-6 pt-6 border-t border-[#D4AF37]/20">
              <p className="text-xs text-center text-[#9C8A76]">
                Demo Credentials: Use any email and password
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-[#FFFCF7]/80 backdrop-blur rounded-lg border border-[#D4AF37]/30 shadow-lg">
          <p className="text-xs text-[#5C4A3A] text-center">
            <span className="block mb-1">☕ Auto-triage • ✨ AI Co-pilot • ⚡ Auto-resolve</span>
            Transform chaotic inboxes into organised intelligence
          </p>
        </div>
      </div>
    </div>
  );
}
