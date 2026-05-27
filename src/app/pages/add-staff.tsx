import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { GradientCard } from '@/app/components/gradient-card';
import { PageHeader } from '@/app/components/page-header';
import { UserCog, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

interface AddStaffProps {
  onNavigate: (page: string) => void;
}

export function AddStaff({ onNavigate }: AddStaffProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate success
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: '', email: '', password: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('user-management')}
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            ← Back to User Management
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <PageHeader
          title="Add Staff Member"
          subtitle="Create a new staff account for educators and administrators"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <GradientCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <UserCog className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Staff Information</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Dr. John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-12 bg-input-background border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.smith@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12 bg-input-background border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Initial Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 h-12 bg-input-background border-border"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Staff member will be prompted to change password on first login
                </p>
              </div>

              {success && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 mb-1">Staff Member Added!</p>
                    <p className="text-sm text-green-700">
                      Account created successfully. Login credentials have been sent via email.
                    </p>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Create Staff Account
              </Button>
            </form>
          </GradientCard>

          {/* Info Panel */}
          <div className="space-y-6">
            <GradientCard gradient>
              <h3 className="font-semibold mb-4">Staff Account Guidelines</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email Verification</p>
                    <p className="text-muted-foreground">
                      Use official university email addresses only
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium mb-1">Secure Passwords</p>
                    <p className="text-muted-foreground">
                      Minimum 8 characters with letters and numbers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium mb-1">Subject Assignment</p>
                    <p className="text-muted-foreground">
                      Staff can be assigned to subjects after account creation
                    </p>
                  </div>
                </div>
              </div>
            </GradientCard>

            <GradientCard>
              <h3 className="font-semibold mb-4">Staff Permissions</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• View assigned subjects and enrolled students</p>
                <p>• Create and manage assignments</p>
                <p>• Grade student submissions</p>
                <p>• View student progress and reports</p>
                <p>• Cannot access admin functions</p>
              </div>
            </GradientCard>

            <GradientCard className="bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <UserCog className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Post-Creation Steps</p>
                  <p className="text-blue-700">
                    After creating a staff account, you can assign them to subjects through the Subject Management section.
                  </p>
                </div>
              </div>
            </GradientCard>
          </div>
        </div>
      </div>
    </div>
  );
}
