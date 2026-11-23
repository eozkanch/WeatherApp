import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About | Weather App',
  description: 'How the Weather App works: features, technologies and performance decisions.',
};

/* ---- İçerik (veri) ---- */

const FEATURES = [
  'Current conditions and a 3-day forecast from WeatherAPI.com',
  'Hourly forecast that follows the day you select',
  'City photo backgrounds from Unsplash, with photographer credit',
  '°C / °F switch and one-tap “use my location”',
  'Detail cards: wind compass, UV index, air quality, sunrise and sunset',
  'Installable PWA with offline fallback',
  'Responsive, mobile-first glass interface',
];

const TECHNOLOGIES: Array<{ name: string; description: string }> = [
  { name: 'Next.js 15', description: 'App Router and Route Handlers' },
  { name: 'React 19', description: 'UI and state' },
  { name: 'TypeScript', description: 'Typed API models and mappers' },
  { name: 'Tailwind CSS 4', description: 'Utility-first styling' },
  { name: 'Lucide', description: 'Icon set' },
  { name: 'WeatherAPI.com', description: 'Forecast, air quality and astronomy data' },
  { name: 'Unsplash API', description: 'City photography' },
  { name: 'Service Worker', description: 'Offline support and caching' },
  { name: 'Turbopack', description: 'Fast development and builds' },
];

const STEPS = [
  'Search for a city or use your location.',
  'A server route fetches and caches the forecast, so the API key never reaches the browser.',
  'The response is normalized into one typed model, with both °C and °F ready.',
  'A photo of the city loads in parallel and fades in behind the forecast.',
  'Tap a day to focus the hourly forecast and detail cards on it.',
];

const PERFORMANCE: Array<{ title: string; items: string[] }> = [
  {
    title: 'Delivery',
    items: [
      'Weather cached for 10 minutes, city photos for 24 hours',
      'Request timeout with a single retry',
      'First requests preloaded in parallel with the JavaScript',
    ],
  },
  {
    title: 'Rendering',
    items: [
      'Critical CSS inlined, no render-blocking stylesheet',
      'Photo fade-in with a day/night gradient fallback',
      'Motion respects the reduced-motion setting',
    ],
  },
  {
    title: 'Offline',
    items: [
      'Service Worker with network-first API requests',
      'Offline page and connection indicator',
      'Installable from the browser',
    ],
  },
  {
    title: 'Quality',
    items: [
      'Lighthouse: Performance 95+, Accessibility, Best Practices and SEO 100',
      'Semantic markup, labelled controls, keyboard focus styles',
      'Meta tags, Open Graph and Twitter Cards',
    ],
  },
];

/* ---- Küçük bileşenler ---- */

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 sm:p-8">
      <h2 className="mb-5 text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-sm text-sky-300 underline decoration-sky-300/40 underline-offset-4 transition-colors hover:text-sky-200 hover:decoration-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
    >
      {children}
    </a>
  );
}

const iconClass = 'h-5 w-5 shrink-0 text-slate-400';

function GithubIcon() {
  return (
    <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

/* ---- Sayfa ---- */

export default function About() {
  return (
    // Uygulamanın global stili body'yi sabitler (overflow: hidden); bu sayfa kendi kaydırma alanını taşır.
    <main className="h-dvh overflow-y-auto bg-slate-950 text-slate-300">
      {/* Tek, durağan vurgu: üstten hafif gök mavisi ışık */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(56,189,248,0.10),transparent)]"
      />

      <div className="relative mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-sky-300 transition-colors hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Weather App
        </Link>

        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">About this project</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
            A real-time weather app built with Next.js 15, React 19 and TypeScript. Search any city and see its
            forecast over a photograph of the place itself.
          </p>
        </header>

        <div className="space-y-6 text-base leading-relaxed sm:text-lg">
          <Section title="Features">
            <BulletList items={FEATURES} />
          </Section>

          <Section title="Technologies">
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {TECHNOLOGIES.map(({ name, description }) => (
                <div key={name}>
                  <dt className="font-medium text-slate-50">{name}</dt>
                  <dd className="text-slate-400">{description}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="How it works">
            <ol className="space-y-4">
              {STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-400/10 text-sm font-semibold text-sky-300 ring-1 ring-sky-400/30"
                  >
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Performance and reliability">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {PERFORMANCE.map(({ title, items }) => (
                <div key={title}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-50">{title}</h3>
                  <div className="text-base">
                    <BulletList items={items} />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <footer className="mt-10 space-y-2 border-t border-white/10 pt-8 text-sm text-slate-400">
          <p>
            Weather data by <ExternalLink href="https://www.weatherapi.com/">WeatherAPI.com</ExternalLink>. City
            photos by photographers on{' '}
            <ExternalLink href="https://unsplash.com/?utm_source=weather_app&utm_medium=referral">Unsplash</ExternalLink>.
          </p>
        </footer>

        <section
          aria-labelledby="developer-heading"
          className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
        >
          <div className="mb-5 flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-400/10 text-lg font-semibold text-sky-300 ring-1 ring-sky-400/30"
            >
              EO
            </div>
            <div>
              <h2 id="developer-heading" className="text-xl font-semibold tracking-tight text-slate-50">
                Ebubekir OZKAN
              </h2>
              <p className="text-sm text-slate-400">Full-Stack Developer</p>
            </div>
          </div>

          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-3">
              <GithubIcon />
              <ExternalLink href="https://github.com/eozkanch">@eozkanch</ExternalLink>
            </li>
            <li className="flex items-center gap-3">
              <LinkedinIcon />
              <ExternalLink href="https://www.linkedin.com/in/ebubekirozkan/">LinkedIn profile</ExternalLink>
            </li>
            <li className="flex items-center gap-3">
              <PinIcon />
              <span>Genève, Switzerland</span>
            </li>
          </ul>

          <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-slate-400">
            Specialized in Java, React, Next.js, and modern web technologies. Passionate about building
            beautiful and functional applications.
          </p>
        </section>
      </div>
    </main>
  );
}
