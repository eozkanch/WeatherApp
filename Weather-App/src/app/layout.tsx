import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Font optimizasyonu - display swap ile
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Mono font daha az kullanıldığı için preload false
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Real-time weather forecast application",
  keywords: ["weather", "forecast", "meteorology", "climate"],
  authors: [{ name: "Weather App" }],
  robots: "index, follow",
  openGraph: {
    title: "Weather App",
    description: "Real-time weather forecast application",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Kritik CSS inline */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body { height: 100%; margin: 0; padding: 0; overflow: hidden; }
            body { background: #0a0a0a; color: #ededed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
            #__next { height: 100%; }
            .h-screen { height: 100vh; }
            .w-screen { width: 100vw; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .overflow-hidden { overflow: hidden; }
            .relative { position: relative; }
            .absolute { position: absolute; }
            .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
            .z-10 { z-index: 10; }
            .w-full { width: 100%; }
            .h-full { height: 100%; }
            .max-w-md { max-width: 28rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .bg-gradient-to-b { background-image: linear-gradient(to bottom, var(--tw-gradient-stops)); }
            .from-black\/30 { --tw-gradient-from: rgba(0, 0, 0, 0.3); --tw-gradient-to: rgba(0, 0, 0, 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .via-black\/20 { --tw-gradient-to: rgba(0, 0, 0, 0.2); --tw-gradient-stops: var(--tw-gradient-from), rgba(0, 0, 0, 0.2), var(--tw-gradient-to); }
            .to-black\/40 { --tw-gradient-to: rgba(0, 0, 0, 0.4); }
            .object-cover { object-fit: cover; }
          `
        }} />
        {/* Preload kritik kaynaklar */}
        <link rel="preload" href="/bg-images-optimized/general-day.webp" as="image" type="image/webp" />
        <link rel="preload" href="/bg-images-optimized/general-day.avif" as="image" type="image/avif" />
        <link rel="dns-prefetch" href="//api.weatherapi.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
