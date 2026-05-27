import React, { useState } from 'react';

// Student Pages - New Design
import { StudentLogin } from '@/app/pages/student-login';
import { StudentSubjectsNew } from '@/app/pages/student-subjects-new';
import { StudentAssignmentsNew } from '@/app/pages/student-assignments-new';
import { StudentDeadlines } from '@/app/pages/student-deadlines';
import { StudentMeetings } from '@/app/pages/student-meetings';

// Admin Pages
import { AdminLogin } from '@/app/pages/admin-login';
import { AdminDashboard } from '@/app/pages/admin-dashboard';
import { UserManagement } from '@/app/pages/user-management';
import { AddStudents } from '@/app/pages/add-students';
import { AddStaff } from '@/app/pages/add-staff';
import { AddAdmin } from '@/app/pages/add-admin';
import { SubjectManagement } from '@/app/pages/subject-management';
import { CreateSubject } from '@/app/pages/create-subject';
import { SubjectList } from '@/app/pages/subject-list';
import { EnrollStudents } from '@/app/pages/enroll-students';

type Page =
  | 'student-login'
  | 'subjects'
  | 'assignments'
  | 'deadlines'
  | 'meetings'
  | 'admin-login'
  | 'admin-dashboard'
  | 'user-management'
  | 'add-students'
  | 'add-staff'
  | 'add-admin'
  | 'subject-management'
  | 'create-subject'
  | 'subject-list'
  | 'enroll-students';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('student-login');
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | undefined>();

  const handleNavigate = (page: Page, subjectId?: string) => {
    setCurrentPage(page);
    if (subjectId) {
      setSelectedSubjectId(subjectId);
    }
  };

  const handleStudentLogin = () => {
    setIsStudentLoggedIn(true);
    setCurrentPage('subjects'); // Default landing is My Subjects
  };

  const handleStudentLogout = () => {
    setIsStudentLoggedIn(false);
    setCurrentPage('student-login');
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setCurrentPage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('admin-login');
  };

  // Welcome Screen - Quick Navigation
  if (!isStudentLoggedIn && !isAdminLoggedIn && currentPage === 'student-login') {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Quick Navigation Bar */}
        <div className="bg-slate-900 border-b border-slate-700 py-3">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                  🎓
                </div>
                <span className="text-white font-semibold">Student Development Portal</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentPage('student-login')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'student-login'
                      ? 'bg-primary text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Student Portal
                </button>
                <button
                  onClick={() => setCurrentPage('admin-login')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'admin-login'
                      ? 'bg-primary text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Admin Portal
                </button>
              </div>
            </div>
          </div>
        </div>

        <StudentLogin onLogin={handleStudentLogin} />
      </div>
    );
  }

  // Render based on current page
  switch (currentPage) {
    case 'student-login':
      return (
        <div className="min-h-screen flex flex-col">
          <div className="bg-slate-900 border-b border-slate-700 py-3">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                    🎓
                  </div>
                  <span className="text-white font-semibold">Student Development Portal</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentPage('student-login')}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white"
                  >
                    Student Portal
                  </button>
                  <button
                    onClick={() => setCurrentPage('admin-login')}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    Admin Portal
                  </button>
                </div>
              </div>
            </div>
          </div>
          <StudentLogin onLogin={handleStudentLogin} />
        </div>
      );

    case 'subjects':
      return (
        <StudentSubjectsNew
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleStudentLogout}
        />
      );

    case 'assignments':
      return (
        <StudentAssignmentsNew
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleStudentLogout}
        />
      );

    case 'deadlines':
      return (
        <StudentDeadlines
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleStudentLogout}
        />
      );

    case 'meetings':
      return (
        <StudentMeetings
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleStudentLogout}
        />
      );

    case 'admin-login':
      return (
        <div>
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setCurrentPage('student-login')}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              ← Student Portal
            </button>
          </div>
          <AdminLogin onLogin={handleAdminLogin} />
        </div>
      );

    case 'admin-dashboard':
      return <AdminDashboard onLogout={handleAdminLogout} onNavigate={handleNavigate} />;

    case 'user-management':
      return <UserManagement onNavigate={handleNavigate} />;

    case 'add-students':
      return <AddStudents onNavigate={handleNavigate} />;

    case 'add-staff':
      return <AddStaff onNavigate={handleNavigate} />;

    case 'add-admin':
      return <AddAdmin onNavigate={handleNavigate} />;

    case 'subject-management':
      return <SubjectManagement onNavigate={handleNavigate} />;

    case 'create-subject':
      return <CreateSubject onNavigate={handleNavigate} />;

    case 'subject-list':
      return <SubjectList onNavigate={handleNavigate} />;

    case 'enroll-students':
      return <EnrollStudents subjectId={selectedSubjectId} onNavigate={handleNavigate} />;

    default:
      return <StudentLogin onLogin={handleStudentLogin} />;
  }
}