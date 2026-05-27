import React from 'react';
import { StudentSidebar } from '@/app/components/student-sidebar';
import { GradientCard } from '@/app/components/gradient-card';
import { Badge } from '@/app/components/ui/badge';
import { Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

interface StudentDeadlinesProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Deadline {
  id: string;
  subject: string;
  assignment: string;
  dueDate: string;
  daysLeft: number;
  urgent: boolean;
  status: 'pending' | 'submitted';
  color: string;
}

export function StudentDeadlines({ currentPage, onNavigate, onLogout }: StudentDeadlinesProps) {
  const deadlines: Deadline[] = [
    {
      id: '1',
      subject: 'Web Development',
      assignment: 'Assignment 2: JavaScript DOM Manipulation',
      dueDate: 'Jan 15, 2026',
      daysLeft: 2,
      urgent: true,
      status: 'pending',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: '2',
      subject: 'Mobile App Development',
      assignment: 'Assignment 3: Flutter UI Design',
      dueDate: 'Jan 17, 2026',
      daysLeft: 4,
      urgent: false,
      status: 'pending',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: '3',
      subject: 'Cloud Computing',
      assignment: 'Project Phase 2: AWS Deployment',
      dueDate: 'Jan 18, 2026',
      daysLeft: 5,
      urgent: false,
      status: 'pending',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: '4',
      subject: 'Web Development',
      assignment: 'Assignment 1: HTML & CSS Fundamentals',
      dueDate: 'Jan 20, 2026',
      daysLeft: 7,
      urgent: false,
      status: 'pending',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: '5',
      subject: 'Data Structures',
      assignment: 'Assignment 6: Graph Algorithms',
      dueDate: 'Jan 22, 2026',
      daysLeft: 9,
      urgent: false,
      status: 'pending',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: '6',
      subject: 'Database Systems',
      assignment: 'Assignment 5: Normalization Project',
      dueDate: 'Jan 25, 2026',
      daysLeft: 12,
      urgent: false,
      status: 'submitted',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  // Sort by days left (urgent first)
  const sortedDeadlines = [...deadlines].sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-1 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Upcoming Deadlines</h1>
          <p className="text-muted-foreground">Stay on top of your assignment due dates</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <GradientCard gradient className="text-center">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-3xl font-semibold mb-1">
              {deadlines.filter((d) => d.urgent && d.status === 'pending').length}
            </p>
            <p className="text-sm text-muted-foreground">Urgent Deadlines</p>
          </GradientCard>
          <GradientCard gradient className="text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-3xl font-semibold mb-1">
              {deadlines.filter((d) => d.status === 'pending').length}
            </p>
            <p className="text-sm text-muted-foreground">Pending Submissions</p>
          </GradientCard>
          <GradientCard gradient className="text-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-semibold mb-1">
              {deadlines.filter((d) => d.status === 'submitted').length}
            </p>
            <p className="text-sm text-muted-foreground">Already Submitted</p>
          </GradientCard>
        </div>

        {/* Timeline View */}
        <div className="space-y-4">
          {sortedDeadlines.map((deadline, index) => (
            <GradientCard
              key={deadline.id}
              className={cn(
                'transition-all duration-200 hover:shadow-md',
                deadline.urgent && deadline.status === 'pending' && 'border-destructive/30 bg-destructive/5'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Timeline indicator */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center border-2',
                      deadline.status === 'submitted'
                        ? 'bg-green-100 border-green-500 text-green-600'
                        : deadline.urgent
                        ? 'bg-red-100 border-red-500 text-red-600'
                        : 'bg-primary/10 border-primary text-primary'
                    )}
                  >
                    {deadline.status === 'submitted' ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : deadline.urgent ? (
                      <AlertCircle className="w-6 h-6" />
                    ) : (
                      <Clock className="w-6 h-6" />
                    )}
                  </div>
                  {/* Connecting line */}
                  {index < sortedDeadlines.length - 1 && (
                    <div className="w-0.5 h-16 bg-border mt-2" />
                  )}
                </div>

                {/* Deadline Details */}
                <div className="flex-1 min-w-0">
                  {/* Subject badge with gradient */}
                  <div className="mb-3">
                    <div
                      className={cn(
                        'inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r text-white text-sm font-medium',
                        deadline.color
                      )}
                    >
                      {deadline.subject}
                    </div>
                  </div>

                  {/* Assignment title */}
                  <h3 className="font-semibold text-lg mb-2">{deadline.assignment}</h3>

                  {/* Date and time remaining */}
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {deadline.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          deadline.status === 'submitted'
                            ? 'secondary'
                            : deadline.urgent
                            ? 'destructive'
                            : 'outline'
                        }
                      >
                        {deadline.status === 'submitted'
                          ? 'Submitted'
                          : deadline.daysLeft === 0
                          ? 'Due Today'
                          : deadline.daysLeft === 1
                          ? '1 day left'
                          : `${deadline.daysLeft} days left`}
                      </Badge>
                    </div>
                  </div>

                  {/* Status message */}
                  {deadline.urgent && deadline.status === 'pending' && (
                    <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">
                        This assignment is due soon! Complete and submit as early as possible.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </GradientCard>
          ))}

          {deadlines.length === 0 && (
            <GradientCard className="text-center py-16">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Upcoming Deadlines</h3>
              <p className="text-muted-foreground">You're all caught up! No pending deadlines at the moment.</p>
            </GradientCard>
          )}
        </div>
      </main>
    </div>
  );
}
