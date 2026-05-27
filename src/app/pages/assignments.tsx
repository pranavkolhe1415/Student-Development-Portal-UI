import React from 'react';
import { PageHeader } from '@/app/components/page-header';
import { GradientCard } from '@/app/components/gradient-card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Calendar, Clock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface AssignmentsProps {
  subjectId?: string;
  onNavigate: (page: string) => void;
}

export function Assignments({ subjectId, onNavigate }: AssignmentsProps) {
  const subject = {
    id: subjectId || '1',
    name: 'Web Development',
    code: 'CS301',
  };

  const assignments = [
    {
      id: '1',
      title: 'Assignment 1: HTML & CSS Fundamentals',
      description: 'Create a responsive portfolio website using HTML5 and CSS3. Include at least 5 pages with modern design principles.',
      dueDate: 'Jan 20, 2026',
      daysLeft: 7,
      status: 'not_submitted',
      urgent: false,
    },
    {
      id: '2',
      title: 'Assignment 2: JavaScript DOM Manipulation',
      description: 'Build an interactive to-do list application with add, edit, delete, and filter functionality.',
      dueDate: 'Jan 15, 2026',
      daysLeft: 2,
      status: 'not_submitted',
      urgent: true,
    },
    {
      id: '3',
      title: 'Assignment 3: React Components',
      description: 'Develop a weather dashboard using React with API integration and state management.',
      dueDate: 'Feb 1, 2026',
      daysLeft: 19,
      status: 'not_submitted',
      urgent: false,
    },
    {
      id: '4',
      title: 'Assignment 4: Full Stack Application',
      description: 'Create a complete CRUD application with authentication, database integration, and RESTful API.',
      dueDate: 'Jan 5, 2026',
      daysLeft: -8,
      status: 'submitted',
      urgent: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={() => onNavigate('subjects')} className="mb-2">
            ← Back to Subjects
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Subject Context */}
        <div className="mb-6">
          <GradientCard gradient className="flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">{subject.code}</Badge>
              <h2 className="text-2xl font-semibold">{subject.name}</h2>
              <p className="text-muted-foreground mt-1">{assignments.length} assignments total</p>
            </div>
            <FileText className="w-12 h-12 text-primary" />
          </GradientCard>
        </div>

        <PageHeader
          title="Assignments"
          subtitle="Track and manage your assignment submissions"
        />

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <GradientCard
              key={assignment.id}
              className={`transition-all duration-200 hover:shadow-md ${
                assignment.urgent && assignment.status === 'not_submitted'
                  ? 'border-destructive/30 bg-destructive/5'
                  : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div
                  className={`p-3 rounded-xl ${
                    assignment.status === 'submitted'
                      ? 'bg-green-100 text-green-600'
                      : assignment.urgent
                      ? 'bg-red-100 text-red-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {assignment.status === 'submitted' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : assignment.urgent ? (
                    <AlertCircle className="w-6 h-6" />
                  ) : (
                    <FileText className="w-6 h-6" />
                  )}
                </div>

                {/* Assignment Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{assignment.title}</h3>
                      <p className="text-muted-foreground text-sm">{assignment.description}</p>
                    </div>
                    <Badge
                      variant={
                        assignment.status === 'submitted'
                          ? 'secondary'
                          : assignment.urgent
                          ? 'destructive'
                          : 'outline'
                      }
                    >
                      {assignment.status === 'submitted' ? 'Submitted' : 'Not Submitted'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span
                        className={
                          assignment.daysLeft < 0
                            ? 'text-muted-foreground'
                            : assignment.urgent
                            ? 'text-destructive font-medium'
                            : 'text-muted-foreground'
                        }
                      >
                        {assignment.daysLeft < 0
                          ? `Overdue by ${Math.abs(assignment.daysLeft)} days`
                          : assignment.daysLeft === 0
                          ? 'Due today'
                          : `${assignment.daysLeft} days left`}
                      </span>
                    </div>
                  </div>

                  {assignment.status === 'not_submitted' && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                        Submit Assignment (Coming Soon)
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </GradientCard>
          ))}

          {assignments.length === 0 && (
            <GradientCard className="text-center py-16">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Assignments</h3>
              <p className="text-muted-foreground">No assignments have been posted for this subject yet.</p>
            </GradientCard>
          )}
        </div>
      </div>
    </div>
  );
}
