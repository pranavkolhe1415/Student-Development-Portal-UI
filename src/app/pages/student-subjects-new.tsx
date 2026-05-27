import React, { useState } from 'react';
import { StudentSidebar } from '@/app/components/student-sidebar';
import { GradientCard } from '@/app/components/gradient-card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { BookOpen, Search, User, ArrowRight, BookMarked } from 'lucide-react';

interface StudentSubjectsNewProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function StudentSubjectsNew({ currentPage, onNavigate, onLogout }: StudentSubjectsNewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = [
    {
      id: '1',
      name: 'Web Development',
      code: 'CS301',
      staff: 'Dr. Sarah Johnson',
      assignmentCount: 3,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: '2',
      name: 'Data Structures & Algorithms',
      code: 'CS205',
      staff: 'Prof. Michael Chen',
      assignmentCount: 5,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: '3',
      name: 'Database Management Systems',
      code: 'CS303',
      staff: 'Dr. Emily Rodriguez',
      assignmentCount: 2,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: '4',
      name: 'Mobile App Development',
      code: 'CS401',
      staff: 'Prof. James Wilson',
      assignmentCount: 4,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: '5',
      name: 'Cloud Computing',
      code: 'CS405',
      staff: 'Dr. Amanda Lee',
      assignmentCount: 3,
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-1 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">My Subjects</h1>
          <p className="text-muted-foreground">View all your enrolled subjects and access assignments</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-border"
            />
          </div>
        </div>

        {/* Subject Cards Grid */}
        {filteredSubjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <GradientCard key={subject.id} className="group hover:shadow-lg transition-all duration-200">
                {/* Subject header with gradient */}
                <div className={`bg-gradient-to-r ${subject.color} p-4 rounded-2xl mb-4`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-1 bg-white/30 text-white border-0">
                        {subject.code}
                      </Badge>
                      <h3 className="font-semibold text-white">{subject.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Subject details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned Staff</p>
                      <p className="font-medium">{subject.staff}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="flex items-center gap-2">
                      <BookMarked className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{subject.assignmentCount} Assignments</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onNavigate('assignments')}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                  >
                    View Assignments
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </GradientCard>
            ))}
          </div>
        ) : (
          // Empty state
          <GradientCard className="text-center py-16">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery ? 'No subjects found' : 'No Subjects Enrolled'}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? 'Try adjusting your search terms'
                : "You haven't been enrolled in any subjects yet."}
            </p>
          </GradientCard>
        )}
      </main>
    </div>
  );
}
