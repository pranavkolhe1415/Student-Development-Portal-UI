import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { GradientCard } from '@/app/components/gradient-card';
import { PageHeader } from '@/app/components/page-header';
import { ShieldCheck, Mail, Lock, User, CheckCircle2, AlertTriangle } from 'lucide-react';

interface AddAdminProps {
  onNavigate: (page: string) => void;
}

export function AddAdmin({ onNavigate }: AddAdminProps) {
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
          title="Add Administrator"
          subtitle="Create a new admin account with full system access"
        />

        {/* Warning Banner */}
        <GradientCard className="mb-6 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500 text-white">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">⚠️ Administrative Access Warning</h3>
              <p className="text-sm text-amber-800 mb-2">
                Administrators have unrestricted access to all system functions including:
              </p>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Full user management (create, modify, delete accounts)</li>
                <li>• Subject creation and modification</li>
                <li>• System configuration and settings</li>
                <li>• Access to all student and staff data</li>
              </ul>
              <p className="text-sm text-amber-900 font-medium mt-3">
                Only grant admin access to trusted personnel. All actions are logged and audited.
              </p>
            </div>
          </div>
        </GradientCard>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <GradientCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Admin Information</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="admin-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="admin-name"
                    type="text"
                    placeholder="Administrator Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-12 bg-input-background border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12 bg-input-background border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Initial Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 h-12 bg-input-background border-border"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Use a strong password with at least 12 characters
                </p>
              </div>

              {success && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 mb-1">Administrator Created!</p>
                    <p className="text-sm text-green-700">
                      Account created successfully with full system access.
                    </p>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Create Admin Account
              </Button>
            </form>
          </GradientCard>

          {/* Info Panel */}
          <div className="space-y-6">
            <GradientCard gradient>
              <h3 className="font-semibold mb-4">Admin Responsibilities</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium mb-1">User Management</p>
                    <p className="text-muted-foreground">
                      Create and manage student, staff, and admin accounts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium mb-1">Subject Management</p>
                    <p className="text-muted-foreground">
                      Create subjects, assign staff, and manage enrollments
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium mb-1">System Oversight</p>
                    <p className="text-muted-foreground">
                      Monitor system activity and maintain data integrity
                    </p>
                  </div>
                </div>
              </div>
            </GradientCard>

            <GradientCard>
              <h3 className="font-semibold mb-4">Full Access Permissions</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Create and delete all user types</p>
                <p>✓ Modify system configurations</p>
                <p>✓ Access all data and reports</p>
                <p>✓ Manage subjects and enrollments</p>
                <p>✓ Override all permissions</p>
                <p>✓ View audit logs and analytics</p>
              </div>
            </GradientCard>

            <GradientCard className="bg-red-50 border-red-200">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-red-900 mb-1">Security Notice</p>
                  <p className="text-red-700">
                    All administrative actions are logged with timestamps and IP addresses for security auditing.
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
