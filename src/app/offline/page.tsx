'use client';

import { WifiOff } from 'lucide-react';
import { primaryButton, secondaryButton } from '@/components/ui/buttons';

const AVAILABLE = ['Forecasts you have already viewed', 'The app interface'];
const NEEDS_CONNECTION = ['Searching for a new city', 'City photos and live updates'];

function Group({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-50">{title}</h2>
      <ul className="space-y-1.5 text-sm text-slate-400">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/70" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OfflinePage() {
  return (
    <main className="relative h-dvh overflow-y-auto bg-slate-950 text-slate-300">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(56,189,248,0.10),transparent)]"
      />

      <div className="relative flex min-h-full items-center justify-center px-5 py-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 ring-1 ring-sky-400/30">
              <WifiOff aria-hidden="true" className="h-7 w-7 text-sky-300" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50">You&apos;re offline</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Check your connection. Forecasts you have already viewed stay available and refresh when you are
              back online.
            </p>
          </div>

          <div className="mt-6 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
            <Group title="Still available" items={AVAILABLE} />
            <Group title="Needs a connection" items={NEEDS_CONNECTION} />
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <button type="button" onClick={() => window.location.reload()} className={primaryButton}>
              Try again
            </button>
            <button type="button" onClick={() => window.history.back()} className={secondaryButton}>
              Go back
            </button>
          </div>

          <p role="status" className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-400 motion-safe:animate-pulse" />
            No internet connection
          </p>
        </div>
      </div>
    </main>
  );
}
