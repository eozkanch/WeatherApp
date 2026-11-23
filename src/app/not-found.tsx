import type { Metadata } from 'next';
import Link from 'next/link';
import { CloudFog } from 'lucide-react';
import { primaryButton, secondaryButton } from '@/components/ui/buttons';

export const metadata: Metadata = {
  title: 'Page not found | Weather App',
};

export default function NotFound() {
  return (
    // Global stil body'yi sabitler; kısa ekranlarda içerik kesilmesin diye kendi kaydırma alanı
    <main className="relative h-dvh overflow-y-auto bg-slate-950 text-slate-300">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(56,189,248,0.10),transparent)]"
      />

      <div className="relative flex min-h-full items-center justify-center px-6 py-12">
        <div className="max-w-xl text-center">
          <CloudFog aria-hidden="true" className="mx-auto mb-6 h-14 w-14 text-sky-300/80" strokeWidth={1.5} />

          <p className="text-sm font-semibold tracking-[0.3em] text-sky-300">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">Page not found</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            This page doesn&apos;t exist or has moved. Head back to the forecast.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className={primaryButton}>
              Back to forecast
            </Link>
            <Link href="/about" className={secondaryButton}>
              About this project
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
