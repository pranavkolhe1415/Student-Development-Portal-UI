import React from 'react';
import { Button } from '@/app/components/ui/button';
import { GradientCard } from '@/app/components/gradient-card';
import { PageHeader } from '@/app/components/page-header';
import { GraduationCap, UserCog, ShieldCheck, Upload, UserPlus, Users } from 'lucide-react';

interface UserManagementProps {
  onNavigate: (page: string) => void;
}

export function UserManagement({ onNavigate }: UserManagementProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('admin-dashboard')}
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            ← Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader
          title="User Management"
          subtitle="Add and manage students, staff, and administrators"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Add Students Card */}
          <GradientCard className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-primary/20 hover:border-primary/40">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Students</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Bulk upload student accounts using Excel file
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm justify-center">
                  <Upload className="w-4 h-4 text-primary" />
                  <span>Bulk Excel upload</span>
                </div>
                <div className="flex items-center gap-2 text-sm justify-center">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Multiple students at once</span>
                </div>
              </div>

              <Button
                onClick={() => onNavigate('add-students')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                Add Students
              </Button>
            </div>
          </GradientCard>

          {/* Add Staff Card */}
          <GradientCard className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-secondary/20 hover:border-secondary/40">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4">
                <UserCog className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Staff</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Create individual staff member accounts
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm justify-center">
                  <UserPlus className="w-4 h-4 text-secondary" />
                  <span>Individual account creation</span>
                </div>
                <div className="flex items-center gap-2 text-sm justify-center">
                  <UserCog className="w-4 h-4 text-secondary" />
                  <span>Staff role assignment</span>
                </div>
              </div>

              <Button
                onClick={() => onNavigate('add-staff')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Add Staff
              </Button>
            </div>
          </GradientCard>

          {/* Add Admin Card */}
          <GradientCard className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-amber-500/20 hover:border-amber-500/40">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Admin</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Create administrator accounts with full access
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm justify-center">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Full system access</span>
                </div>
                <div className="flex items-center gap-2 text-sm justify-center text-amber-600">
                  <span className="font-medium">⚠️ Use with caution</span>
                </div>
              </div>

              <Button
                onClick={() => onNavigate('add-admin')}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              >
                Add Admin
              </Button>
            </div>
          </GradientCard>
        </div>

        {/* Info Section */}
        <GradientCard gradient className="mt-8">
          <h3 className="font-semibold mb-4">User Management Guidelines</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-primary">Students</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Use Excel template for bulk upload</li>
                <li>• Include email, name, and roll number</li>
                <li>• Auto-generated passwords sent via email</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-secondary">Staff</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Create individual accounts</li>
                <li>• Assign to subjects later</li>
                <li>• Set initial password manually</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-amber-600">Admins</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Full system access granted</li>
                <li>• Use only for trusted personnel</li>
                <li>• All actions are logged</li>
              </ul>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
