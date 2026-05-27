import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { GradientCard } from '@/app/components/gradient-card';
import { GraduationCap, Lock, Mail } from 'lucide-react';

interface StudentLoginProps {
  onLogin: () => void;
}

export function StudentLogin({ onLogin }: StudentLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left panel - Illustration */}
        <div className="hidden md:flex flex-col justify-center p-8 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent text-white">
          <div className="mb-8">
            <GraduationCap className="w-16 h-16 mb-4" />
            <h2 className="text-4xl font-semibold mb-4">Student Development Portal</h2>
            <p className="text-white/90 text-lg">
              Track your subjects, manage assignments, and stay on top of your academic journey.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">✓</div>
              <span>Access all your subjects in one place</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">✓</div>
              <span>Track assignment deadlines effortlessly</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">✓</div>
              <span>Stay organized and productive</span>
            </div>
          </div>
        </div>

        {/* Right panel - Login form */}
        <GradientCard className="shadow-xl">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to access your student portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-input-background border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-input-background border-border"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90">
              Sign In
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Secure access for enrolled students only
              </p>
            </div>
          </form>
        </GradientCard>
      </div>
    </div>
  );
}
