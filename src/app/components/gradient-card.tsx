import React from 'react';
import { cn } from '@/app/components/ui/utils';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function GradientCard({ children, className, gradient = false }: GradientCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl p-8 shadow-sm border border-border bg-card",
        gradient && "bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5",
        className
      )}
    >
      {children}
    </div>
  );
}
