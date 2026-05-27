import React from 'react';
import { Button } from '@/app/components/ui/button';
import { GradientCard } from '@/app/components/gradient-card';
import { PageHeader } from '@/app/components/page-header';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { BookOpen, Search, UserPlus, User } from 'lucide-react';

interface SubjectListProps {
  onNavigate: (page: string, subjectId?: string) => void;
}

export function SubjectList({ onNavigate }: SubjectListProps) {
  const subjects = [
    {
      id: '1',
      name: 'Web Development',
      code: 'CS301',
      staff: 'Dr. Sarah Johnson',
      staffEmail: 'sarah.johnson@university.edu',
      enrolledStudents: 45,
    },
    {
      id: '2',
      name: 'Data Structures & Algorithms',
      code: 'CS205',
      staff: 'Prof. Michael Chen',
      staffEmail: 'michael.chen@university.edu',
      enrolledStudents: 52,
    },
    {
      id: '3',
      name: 'Database Management Systems',
      code: 'CS303',
      staff: 'Dr. Emily Rodriguez',
      staffEmail: 'emily.rodriguez@university.edu',
      enrolledStudents: 38,
    },
    {
      id: '4',
      name: 'Mobile App Development',
      code: 'CS401',
      staff: 'Prof. James Wilson',
      staffEmail: 'james.wilson@university.edu',
      enrolledStudents: 41,
    },
    {
      id: '5',
      name: 'Cloud Computing',
      code: 'CS405',
      staff: 'Dr. Amanda Lee',
      staffEmail: 'amanda.lee@university.edu',
      enrolledStudents: 36,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('subject-management')}
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            ← Back to Subject Management
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader
          title="Subject List"
          subtitle="View all subjects and manage student enrollments"
          actions={
            <Button
              onClick={() => onNavigate('create-subject')}
              className="bg-primary hover:bg-primary/90"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Create Subject
            </Button>
          }
        />

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search subjects..."
              className="pl-10 h-12 bg-card border-border"
            />
          </div>
        </div>

        {/* Table */}
        <GradientCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Assigned Staff</TableHead>
                  <TableHead>Enrolled Students</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{subject.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{subject.code}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-secondary/10 text-secondary text-xs">
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{subject.staff}</p>
                          <p className="text-xs text-muted-foreground">{subject.staffEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-semibold">
                          {subject.enrolledStudents}
                        </div>
                        <span className="text-sm text-muted-foreground">students</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onNavigate('enroll-students', subject.id)}
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Enroll Students
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GradientCard>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <GradientCard gradient className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Subjects</p>
            <p className="text-3xl font-semibold">{subjects.length}</p>
          </GradientCard>
          <GradientCard gradient className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Enrollments</p>
            <p className="text-3xl font-semibold">
              {subjects.reduce((sum, s) => sum + s.enrolledStudents, 0)}
            </p>
          </GradientCard>
          <GradientCard gradient className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Active Staff</p>
            <p className="text-3xl font-semibold">{subjects.length}</p>
          </GradientCard>
        </div>
      </div>
    </div>
  );
}
