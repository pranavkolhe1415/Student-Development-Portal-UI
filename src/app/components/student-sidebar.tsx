import React, { useState } from 'react';
import { cn } from '@/app/components/ui/utils';
import { Button } from '@/app/components/ui/button';
import {
  BookOpen,
  ClipboardList,
  Clock,
  Calendar,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface StudentSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function StudentSidebar({ currentPage, onNavigate, onLogout }: StudentSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: 'subjects', label: 'My Subjects', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'deadlines', label: 'Upcoming Deadlines', icon: Clock },
    { id: 'meetings', label: 'Meetings', icon: Calendar },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    // Auto-collapse on mobile after navigation
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen bg-card border-r border-border z-50 transition-all duration-300 ease-in-out shadow-lg',
          isExpanded ? 'w-64' : 'w-20'
        )}
      >
        {/* Header with toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-primary/10"
          >
            {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isExpanded && (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">
                🎓
              </div>
              <span className="font-semibold text-sm truncate">Student Portal</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <div key={item.id} className="relative group">
                <Button
                  variant="ghost"
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    'w-full justify-start h-12 transition-all duration-200',
                    isExpanded ? 'px-4' : 'px-0 justify-center',
                    isActive && 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90',
                    !isActive && 'hover:bg-primary/10'
                  )}
                >
                  <Icon className={cn('w-5 h-5 flex-shrink-0', isExpanded && 'mr-3')} />
                  {isExpanded && <span className="truncate">{item.label}</span>}
                </Button>

                {/* Tooltip for collapsed state */}
                {!isExpanded && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout at bottom */}
        <div className="p-3 border-t border-border">
          <div className="relative group">
            <Button
              variant="outline"
              onClick={onLogout}
              className={cn(
                'w-full justify-start h-12 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all duration-200',
                isExpanded ? 'px-4' : 'px-0 justify-center'
              )}
            >
              <LogOut className={cn('w-5 h-5 flex-shrink-0', isExpanded && 'mr-3')} />
              {isExpanded && <span className="truncate">Logout</span>}
            </Button>

            {/* Tooltip for collapsed state */}
            {!isExpanded && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
                Logout
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Spacer to prevent content overlap */}
      <div className={cn('transition-all duration-300', isExpanded ? 'w-64' : 'w-20')} />
    </>
  );
}
