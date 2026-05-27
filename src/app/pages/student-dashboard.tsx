import React from 'react';
import { HeroBanner } from '@/app/components/hero-banner';
import { StatCard } from '@/app/components/stat-card';
import { GradientCard } from '@/app/components/gradient-card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { BookOpen, ClipboardList, Clock, LogOut, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

interface StudentDashboardProps {
  studentName: string;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function StudentDashboard({ studentName, onLogout, onNavigate }: StudentDashboardProps) {
  const recentActivities = [
    { id: 1, subject: 'Web Development', action: 'Assignment submitted', time: '2 hours ago', status: 'success' },
    { id: 2, subject: 'Data Structures', action: 'New assignment posted', time: '5 hours ago', status: 'info' },
    { id: 3, subject: 'Database Systems', action: 'Deadline reminder', time: '1 day ago', status: 'warning' },
  ];

  const upcomingDeadlines = [
    { id: 1, subject: 'Mobile App Development', assignment: 'Assignment 3', dueDate: 'Jan 15, 2026', daysLeft: 2, urgent: true },
    { id: 2, subject: 'Cloud Computing', assignment: 'Project Phase 2', dueDate: 'Jan 18, 2026', daysLeft: 5, urgent: false },
    { id: 3, subject: 'Machine Learning', assignment: 'Lab Report', dueDate: 'Jan 22, 2026', daysLeft: 9, urgent: false },
  ];

  return (
    <div className="min-h-screen">
      {/* Header with logout */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">Student Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {studentName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Banner */}
        <HeroBanner
          title={`Welcome back, ${studentName}`}
          subtitle="Track your subjects, assignments, and progress"
          emoji="👋"
        />

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="My Subjects"
            value="5"
            icon={BookOpen}
            description="Currently enrolled"
            onClick={() => onNavigate('subjects')}
            gradient
          />
          <StatCard
            title="Assignments"
            value="3"
            icon={ClipboardList}
            description="Pending tasks"
            onClick={() => onNavigate('assignments')}
            gradient
          />
          <StatCard
            title="Upcoming Deadlines"
            value="2"
            icon={Clock}
            description="This week"
            gradient
          />
        </div>

        {/* Main Content Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <GradientCard>
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    activity.status === 'success' ? 'bg-green-100 text-green-600' :
                    activity.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.status === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                     activity.status === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                     <ClipboardList className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{activity.subject}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GradientCard>

          {/* Upcoming Deadlines */}
          <GradientCard>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{deadline.subject}</p>
                      <p className="text-sm text-muted-foreground">{deadline.assignment}</p>
                    </div>
                    <Badge variant={deadline.urgent ? "destructive" : "secondary"} className="ml-2">
                      {deadline.daysLeft}d left
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Due: {deadline.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </GradientCard>
        </div>

        {/* Optional Progress Section */}
        <div className="mt-8">
          <GradientCard gradient>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Academic Progress</h3>
                <p className="text-muted-foreground">You're doing great! Keep up the momentum 🚀</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">87%</div>
                <p className="text-sm text-muted-foreground">Overall completion</p>
              </div>
            </div>
          </GradientCard>
        </div>
      </div>
    </div>
  );
}
