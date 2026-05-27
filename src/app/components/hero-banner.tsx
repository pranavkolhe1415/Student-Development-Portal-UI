import React from 'react';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  emoji?: string;
}

export function HeroBanner({ title, subtitle, emoji }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-8 mb-8 shadow-lg">
      <div className="relative z-10">
        <h1 className="text-3xl font-semibold text-white mb-2">
          {title} {emoji}
        </h1>
        <p className="text-white/90 text-lg">{subtitle}</p>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
    </div>
  );
}
