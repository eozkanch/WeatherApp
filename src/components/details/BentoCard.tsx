import type { ReactNode } from 'react';

interface BentoCardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Bento grid içindeki glassmorphism detay kartı. */
export default function BentoCard({ title, icon, className = '', children }: BentoCardProps) {
  return (
    <section
      className={`px-3.5 py-3.5 sm:px-4 sm:py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col min-w-0 ${className}`}
    >
      <header className="flex items-center gap-2 mb-3 opacity-70">
        {icon}
        <h2 className="text-xs uppercase tracking-wider">{title}</h2>
      </header>
      {children}
    </section>
  );
}
