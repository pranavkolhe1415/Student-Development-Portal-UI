import React from 'react';
import { Button } from '@/app/components/ui/button';
import { GradientCard } from '@/app/components/gradient-card';
import { StatCard } from '@/app/components/stat-card';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import {
  Shield,
  LogOut,
  Users,
  BookOpen,
  UserPlus,
  GraduationCap,
  UserCog,
  ShieldCheck,
  TrendingUp,
  Activity,
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onLogout, onNavigate }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg text-white">Admin Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                <ShieldCheck className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={onLogout} className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, subjects, and system settings</p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value="1,234"
            icon={GraduationCap}
            description="+12% from last month"
          />
          <StatCard
            title="Total Staff"
            value="45"
            icon={UserCog}
            description="Active educators"
          />
          <StatCard
            title="Total Subjects"
            value="28"
            icon={BookOpen}
            description="Across all departments"
          />
          <StatCard
            title="System Health"
            value="99.9%"
            icon={Activity}
            description="Uptime this month"
          />
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* User Management Card */}
          <GradientCard
            className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-primary/20 hover:border-primary/40"
            onClick={() => onNavigate('user-management')}
          >
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                <Users className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  User Management
                </h2>
                <p className="text-muted-foreground mb-4">
                  Add and manage students, staff, and administrators
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span>Bulk upload students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UserCog className="w-4 h-4 text-primary" />
                    <span>Add staff members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Create admin accounts</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Manage Users
              </Button>
            </div>
          </GradientCard>

          {/* Subject Management Card */}
          <GradientCard
            className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-accent/20 hover:border-accent/40"
            onClick={() => onNavigate('subject-management')}
          >
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent to-secondary text-white">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  Subject Management
                </h2>
                <p className="text-muted-foreground mb-4">
                  Create subjects, assign staff, and enroll students
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span>Create new subjects</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UserPlus className="w-4 h-4 text-accent" />
                    <span>Assign staff to subjects</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-accent" />
                    <span>Enroll students in subjects</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <Button className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                Manage Subjects
              </Button>
            </div>
          </GradientCard>
        </div>

        {/* Recent Activity */}
        <GradientCard gradient>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-1">System Overview</h3>
              <p className="text-muted-foreground text-sm">Recent administrative activities</p>
            </div>
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Students Added</p>
              <p className="text-2xl font-semibold">156</p>
              <p className="text-xs text-green-600 mt-1">This week</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Subjects Created</p>
              <p className="text-2xl font-semibold">8</p>
              <p className="text-xs text-blue-600 mt-1">This month</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Active Enrollments</p>
              <p className="text-2xl font-semibold">2,489</p>
              <p className="text-xs text-purple-600 mt-1">Current semester</p>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
