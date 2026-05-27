import React, { useState } from 'react';
import { StudentSidebar } from '@/app/components/student-sidebar';
import { GradientCard } from '@/app/components/gradient-card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Calendar, Clock, FileText, CheckCircle2, AlertCircle, XCircle, Activity } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

interface StudentAssignmentsNewProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

type FilterType = 'all' | 'submitted' | 'not-submitted' | 'evaluated';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  daysLeft: number;
  status: 'submitted' | 'not-submitted' | 'evaluated';
  urgent: boolean;
  submittedDate?: string;
  evaluatedDate?: string;
  grade?: string;
}

interface RecentActivity {
  id: string;
  text: string;
  time: string;
  type: 'submission' | 'evaluation' | 'update';
}

export function StudentAssignmentsNew({ currentPage, onNavigate, onLogout }: StudentAssignmentsNewProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [trackingAssignmentId, setTrackingAssignmentId] = useState<string | null>(null);

  const recentActivities: RecentActivity[] = [
    { id: '1', text: 'Assignment 4 evaluated - Grade: A', time: '2 hours ago', type: 'evaluation' },
    { id: '2', text: 'Successfully submitted Assignment 3', time: '5 hours ago', type: 'submission' },
    { id: '3', text: 'New assignment posted in Cloud Computing', time: '1 day ago', type: 'update' },
    { id: '4', text: 'Assignment 2 evaluated - Grade: B+', time: '2 days ago', type: 'evaluation' },
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Assignment 1: HTML & CSS Fundamentals',
      subject: 'Web Development',
      description: 'Create a responsive portfolio website using HTML5 and CSS3. Include at least 5 pages with modern design principles.',
      dueDate: 'Jan 20, 2026',
      daysLeft: 7,
      status: 'not-submitted',
      urgent: false,
    },
    {
      id: '2',
      title: 'Assignment 2: JavaScript DOM Manipulation',
      subject: 'Web Development',
      description: 'Build an interactive to-do list application with add, edit, delete, and filter functionality.',
      dueDate: 'Jan 15, 2026',
      daysLeft: 2,
      status: 'not-submitted',
      urgent: true,
    },
    {
      id: '3',
      title: 'Assignment 3: React Components',
      subject: 'Web Development',
      description: 'Develop a weather dashboard using React with API integration and state management.',
      dueDate: 'Feb 1, 2026',
      daysLeft: 19,
      status: 'submitted',
      urgent: false,
      submittedDate: 'Jan 10, 2026',
    },
    {
      id: '4',
      title: 'Assignment 4: Binary Search Tree Implementation',
      subject: 'Data Structures',
      description: 'Implement a complete BST with insert, delete, search, and traversal operations.',
      dueDate: 'Jan 5, 2026',
      daysLeft: -8,
      status: 'evaluated',
      urgent: false,
      submittedDate: 'Jan 3, 2026',
      evaluatedDate: 'Jan 6, 2026',
      grade: 'A',
    },
    {
      id: '5',
      title: 'Assignment 5: Database Design Project',
      subject: 'Database Systems',
      description: 'Design and implement a complete database schema for an e-commerce platform.',
      dueDate: 'Jan 25, 2026',
      daysLeft: 12,
      status: 'submitted',
      urgent: false,
      submittedDate: 'Jan 12, 2026',
    },
  ];

  const filters = [
    { id: 'all', label: 'All', count: assignments.length },
    { id: 'submitted', label: 'Submitted', count: assignments.filter((a) => a.status === 'submitted').length },
    { id: 'not-submitted', label: 'Not Submitted', count: assignments.filter((a) => a.status === 'not-submitted').length },
    { id: 'evaluated', label: 'Evaluated', count: assignments.filter((a) => a.status === 'evaluated').length },
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    if (activeFilter === 'all') return true;
    return assignment.status === activeFilter;
  });

  const toggleTracking = (assignmentId: string) => {
    setTrackingAssignmentId(trackingAssignmentId === assignmentId ? null : assignmentId);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-1 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Assignments</h1>
          <p className="text-muted-foreground">Track and manage your assignment submissions across all subjects</p>
        </div>

        {/* Recent Activity Panel */}
        <GradientCard gradient className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <ScrollArea className="h-32">
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-card hover:bg-muted/30 transition-colors">
                  <div
                    className={cn(
                      'p-1.5 rounded-lg flex-shrink-0',
                      activity.type === 'evaluation' && 'bg-green-100 text-green-600',
                      activity.type === 'submission' && 'bg-blue-100 text-blue-600',
                      activity.type === 'update' && 'bg-purple-100 text-purple-600'
                    )}
                  >
                    {activity.type === 'evaluation' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : activity.type === 'submission' ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </GradientCard>

        {/* Filter Bar */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as FilterType)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'bg-card border border-border hover:bg-muted/50'
                )}
              >
                {filter.label}
                <span className={cn('ml-2', activeFilter === filter.id ? 'text-white/90' : 'text-muted-foreground')}>
                  ({filter.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <GradientCard
              key={assignment.id}
              className={cn(
                'transition-all duration-200 hover:shadow-md relative',
                assignment.urgent && assignment.status === 'not-submitted' && 'border-destructive/30 bg-destructive/5'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div
                  className={cn(
                    'p-3 rounded-xl flex-shrink-0',
                    assignment.status === 'evaluated' && 'bg-green-100 text-green-600',
                    assignment.status === 'submitted' && 'bg-blue-100 text-blue-600',
                    assignment.status === 'not-submitted' && assignment.urgent && 'bg-red-100 text-red-600',
                    assignment.status === 'not-submitted' && !assignment.urgent && 'bg-amber-100 text-amber-600'
                  )}
                >
                  {assignment.status === 'evaluated' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : assignment.status === 'submitted' ? (
                    <FileText className="w-6 h-6" />
                  ) : assignment.urgent ? (
                    <AlertCircle className="w-6 h-6" />
                  ) : (
                    <Clock className="w-6 h-6" />
                  )}
                </div>

                {/* Assignment Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-lg">{assignment.title}</h3>
                        <Badge variant="outline">{assignment.subject}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{assignment.description}</p>
                    </div>
                    <Badge
                      variant={
                        assignment.status === 'evaluated'
                          ? 'default'
                          : assignment.status === 'submitted'
                          ? 'secondary'
                          : assignment.urgent
                          ? 'destructive'
                          : 'outline'
                      }
                    >
                      {assignment.status === 'evaluated'
                        ? `Evaluated - ${assignment.grade}`
                        : assignment.status === 'submitted'
                        ? 'Submitted'
                        : 'Not Submitted'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span
                        className={cn(
                          assignment.daysLeft < 0
                            ? 'text-muted-foreground'
                            : assignment.urgent
                            ? 'text-destructive font-medium'
                            : 'text-muted-foreground'
                        )}
                      >
                        {assignment.daysLeft < 0
                          ? `Overdue by ${Math.abs(assignment.daysLeft)} days`
                          : assignment.daysLeft === 0
                          ? 'Due today'
                          : `${assignment.daysLeft} days left`}
                      </span>
                    </div>
                  </div>

                  {/* Track My Submission Button */}
                  <div className="flex justify-end relative">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleTracking(assignment.id)}
                      className="hover:bg-primary hover:text-primary-foreground"
                    >
                      Track My Submission
                    </Button>

                    {/* Tracking Modal */}
                    {trackingAssignmentId === assignment.id && (
                      <>
                        {/* Backdrop */}
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setTrackingAssignmentId(null)}
                        />
                        {/* Modal */}
                        <div className="absolute bottom-full right-0 mb-2 w-80 bg-card border border-border rounded-2xl shadow-2xl z-50 p-6 animate-in slide-in-from-bottom-2 duration-200">
                          <h4 className="font-semibold mb-4">Submission Progress</h4>

                          {/* Progress Tracker */}
                          <div className="space-y-4">
                            {/* Step 1: Submitted */}
                            <div className="flex items-start gap-4">
                              <div className="relative">
                                <div
                                  className={cn(
                                    'w-10 h-10 rounded-full flex items-center justify-center border-2',
                                    assignment.status === 'submitted' || assignment.status === 'evaluated'
                                      ? 'bg-green-100 border-green-500 text-green-600'
                                      : 'bg-muted border-border text-muted-foreground'
                                  )}
                                >
                                  {assignment.status === 'submitted' || assignment.status === 'evaluated' ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                  ) : (
                                    <XCircle className="w-5 h-5" />
                                  )}
                                </div>
                                {/* Vertical line */}
                                <div
                                  className={cn(
                                    'absolute left-1/2 top-10 w-0.5 h-8 -translate-x-1/2',
                                    assignment.status === 'evaluated' ? 'bg-green-500' : 'bg-border'
                                  )}
                                />
                              </div>
                              <div className="flex-1 pt-2">
                                <p className="font-medium">Submitted</p>
                                {assignment.submittedDate && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {assignment.submittedDate}
                                  </p>
                                )}
                                {assignment.status === 'not-submitted' && (
                                  <p className="text-xs text-muted-foreground mt-1">Not submitted yet</p>
                                )}
                              </div>
                            </div>

                            {/* Step 2: Evaluated */}
                            <div className="flex items-start gap-4">
                              <div
                                className={cn(
                                  'w-10 h-10 rounded-full flex items-center justify-center border-2',
                                  assignment.status === 'evaluated'
                                    ? 'bg-green-100 border-green-500 text-green-600'
                                    : 'bg-muted border-border text-muted-foreground'
                                )}
                              >
                                {assignment.status === 'evaluated' ? (
                                  <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                  <Clock className="w-5 h-5" />
                                )}
                              </div>
                              <div className="flex-1 pt-2">
                                <p className="font-medium">Evaluated</p>
                                {assignment.status === 'evaluated' && assignment.evaluatedDate && (
                                  <>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {assignment.evaluatedDate}
                                    </p>
                                    <Badge variant="default" className="mt-2">
                                      Grade: {assignment.grade}
                                    </Badge>
                                  </>
                                )}
                                {assignment.status === 'submitted' && (
                                  <p className="text-xs text-muted-foreground mt-1">Pending evaluation</p>
                                )}
                                {assignment.status === 'not-submitted' && (
                                  <p className="text-xs text-muted-foreground mt-1">Awaiting submission</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </GradientCard>
          ))}

          {filteredAssignments.length === 0 && (
            <GradientCard className="text-center py-16">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Assignments Found</h3>
              <p className="text-muted-foreground">
                {activeFilter === 'all'
                  ? 'No assignments have been posted yet.'
                  : `No ${activeFilter} assignments at the moment.`}
              </p>
            </GradientCard>
          )}
        </div>
      </main>
    </div>
  );
}
