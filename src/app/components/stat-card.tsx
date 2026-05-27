import React from 'react';
import { cn } from '@/app/components/ui/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  onClick?: () => void;
  gradient?: boolean;
}

export function StatCard({ title, value, icon: Icon, description, onClick, gradient = false }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group rounded-2xl p-6 shadow-sm border border-border bg-card transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-md hover:-translate-y-0.5",
        gradient && "bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold text-foreground mb-1">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
