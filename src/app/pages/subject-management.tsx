import React from 'react';
import { Button } from '@/app/components/ui/button';
import { GradientCard } from '@/app/components/gradient-card';
import { PageHeader } from '@/app/components/page-header';
import { BookOpen, Plus, List, FileText, Users } from 'lucide-react';

interface SubjectManagementProps {
  onNavigate: (page: string) => void;
}

export function SubjectManagement({ onNavigate }: SubjectManagementProps) {
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="Subject Management"
          subtitle="Create subjects, assign staff, and manage student enrollments"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Subject Card */}
          <GradientCard className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-primary/20 hover:border-primary/40">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Subject</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Add a new subject and assign a staff member
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Subject name and code</span>
                </div>
                <div className="flex items-center gap-2 text-sm justify-center">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Assign teaching staff</span>
                </div>
                <div className="flex items-center gap-2 text-sm justify-center">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>Set up course details</span>
                </div>
              </div>

              <Button
                onClick={() => onNavigate('create-subject')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Subject
              </Button>
            </div>
          </GradientCard>

          {/* View Subject List Card */}
          <GradientCard className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-accent/20 hover:border-accent/40">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white mb-4">
                <List className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">View Subject List</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Browse all subjects and manage enrollments
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm justify-center">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span>View all subjects</span>
                </div>
                <div className="flex items-center gap-2 text-sm justify-center">
                  <Users className="w-4 h-4 text-accent" />
                  <span>See assigned staff</span>
                </div>
                <div className="flex items-center gap-2 text-sm justify-center">
                  <FileText className="w-4 h-4 text-accent" />
                  <span>Enroll students</span>
                </div>
              </div>

              <Button
                onClick={() => onNavigate('subject-list')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                <List className="w-4 h-4 mr-2" />
                View All Subjects
              </Button>
            </div>
          </GradientCard>
        </div>

        {/* Info Section */}
        <GradientCard gradient className="mt-8">
          <h3 className="font-semibold mb-4">Subject Management Workflow</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <h4 className="font-medium">Create Subject</h4>
              </div>
              <p className="text-sm text-muted-foreground ml-11">
                Add subject details including name, code, and description. Verify and assign a staff member.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <h4 className="font-medium">Verify Staff</h4>
              </div>
              <p className="text-sm text-muted-foreground ml-11">
                Enter staff email to verify they exist in the system before assignment.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <h4 className="font-medium">Enroll Students</h4>
              </div>
              <p className="text-sm text-muted-foreground ml-11">
                Bulk upload student enrollment lists using Excel files for each subject.
              </p>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
