import React from 'react';
import { StudentSidebar } from '@/app/components/student-sidebar';
import { GradientCard } from '@/app/components/gradient-card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Calendar, Clock, Video, User, MapPin } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

interface StudentMeetingsProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Meeting {
  id: string;
  title: string;
  type: 'lecture' | 'lab' | 'discussion' | 'office-hours';
  date: string;
  time: string;
  duration: string;
  organizer: string;
  location: string;
  isVirtual: boolean;
  status: 'upcoming' | 'ongoing' | 'completed';
  subject: string;
  color: string;
}

export function StudentMeetings({ currentPage, onNavigate, onLogout }: StudentMeetingsProps) {
  const meetings: Meeting[] = [
    {
      id: '1',
      title: 'Web Development - Lecture 12',
      type: 'lecture',
      date: 'Jan 14, 2026',
      time: '10:00 AM',
      duration: '1 hour',
      organizer: 'Dr. Sarah Johnson',
      location: 'Room 301, CS Building',
      isVirtual: false,
      status: 'upcoming',
      subject: 'Web Development',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: '2',
      title: 'Data Structures - Lab Session',
      type: 'lab',
      date: 'Jan 14, 2026',
      time: '02:00 PM',
      duration: '2 hours',
      organizer: 'Prof. Michael Chen',
      location: 'Virtual Meeting',
      isVirtual: true,
      status: 'upcoming',
      subject: 'Data Structures',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: '3',
      title: 'Database Systems - Project Discussion',
      type: 'discussion',
      date: 'Jan 15, 2026',
      time: '11:30 AM',
      duration: '45 minutes',
      organizer: 'Dr. Emily Rodriguez',
      location: 'Virtual Meeting',
      isVirtual: true,
      status: 'upcoming',
      subject: 'Database Systems',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: '4',
      title: 'Office Hours - Mobile App Development',
      type: 'office-hours',
      date: 'Jan 16, 2026',
      time: '03:00 PM',
      duration: '1 hour',
      organizer: 'Prof. James Wilson',
      location: 'Room 405, CS Building',
      isVirtual: false,
      status: 'upcoming',
      subject: 'Mobile App Development',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: '5',
      title: 'Cloud Computing - Guest Lecture',
      type: 'lecture',
      date: 'Jan 17, 2026',
      time: '09:00 AM',
      duration: '1.5 hours',
      organizer: 'Dr. Amanda Lee',
      location: 'Virtual Meeting',
      isVirtual: true,
      status: 'upcoming',
      subject: 'Cloud Computing',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'Lecture';
      case 'lab':
        return 'Lab Session';
      case 'discussion':
        return 'Discussion';
      case 'office-hours':
        return 'Office Hours';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-700';
      case 'lab':
        return 'bg-purple-100 text-purple-700';
      case 'discussion':
        return 'bg-green-100 text-green-700';
      case 'office-hours':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-1 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Meetings</h1>
          <p className="text-muted-foreground">View your upcoming lectures, labs, and academic sessions</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <GradientCard gradient className="text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-3xl font-semibold mb-1">{meetings.length}</p>
            <p className="text-sm text-muted-foreground">Total Meetings</p>
          </GradientCard>
          <GradientCard gradient className="text-center">
            <Video className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-3xl font-semibold mb-1">
              {meetings.filter((m) => m.isVirtual).length}
            </p>
            <p className="text-sm text-muted-foreground">Virtual Meetings</p>
          </GradientCard>
          <GradientCard gradient className="text-center">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-semibold mb-1">
              {meetings.filter((m) => !m.isVirtual).length}
            </p>
            <p className="text-sm text-muted-foreground">In-Person</p>
          </GradientCard>
          <GradientCard gradient className="text-center">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-3xl font-semibold mb-1">This Week</p>
            <p className="text-sm text-muted-foreground">Schedule</p>
          </GradientCard>
        </div>

        {/* Meetings List */}
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <GradientCard key={meeting.id} className="hover:shadow-lg transition-all duration-200">
              <div className="flex items-start gap-4">
                {/* Date indicator */}
                <div className="flex flex-col items-center p-3 rounded-xl bg-primary/10 min-w-[80px]">
                  <p className="text-2xl font-bold text-primary">{meeting.date.split(' ')[1].replace(',', '')}</p>
                  <p className="text-xs text-muted-foreground uppercase">{meeting.date.split(' ')[0]}</p>
                </div>

                {/* Meeting Details */}
                <div className="flex-1 min-w-0">
                  {/* Subject badge */}
                  <div className="mb-2">
                    <div
                      className={cn(
                        'inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r text-white text-xs font-medium',
                        meeting.color
                      )}
                    >
                      {meeting.subject}
                    </div>
                  </div>

                  {/* Title and type */}
                  <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                    <h3 className="font-semibold text-lg">{meeting.title}</h3>
                    <Badge className={cn('text-xs', getTypeColor(meeting.type))}>
                      {getTypeLabel(meeting.type)}
                    </Badge>
                  </div>

                  {/* Meeting info grid */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>
                        {meeting.time} • {meeting.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {meeting.isVirtual ? (
                        <>
                          <Video className="w-4 h-4" />
                          <span>{meeting.location}</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4" />
                          <span>{meeting.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-secondary/10 text-secondary text-xs">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-muted-foreground">Organized by</p>
                        <p className="text-sm font-medium">{meeting.organizer}</p>
                      </div>
                    </div>

                    {/* Join button for virtual meetings */}
                    {meeting.isVirtual && (
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Video className="w-4 h-4 mr-2" />
                        Join Meeting
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </GradientCard>
          ))}

          {meetings.length === 0 && (
            <GradientCard className="text-center py-16">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Upcoming Meetings</h3>
              <p className="text-muted-foreground">You don't have any scheduled meetings at the moment.</p>
            </GradientCard>
          )}
        </div>
      </main>
    </div>
  );
}
