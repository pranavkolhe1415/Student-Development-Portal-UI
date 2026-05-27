import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
        {actions && <div>{actions}</div>}
      </div>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
