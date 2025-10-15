'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

// Lazy load non-critical components
const ServiceWorkerRegistration = dynamic(() => import("@/components/ServiceWorkerRegistration"), {
  ssr: false,
});
const OfflineIndicator = dynamic(() => import("@/components/OfflineIndicator"), {
  ssr: false,
});
const CacheDebugPanel = dynamic(() => import("@/components/CacheDebugPanel"), {
  ssr: false,
});

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Document Title */}
        <title>Weather App - Real-time Weather Forecast</title>
        <meta name="description" content="Get real-time weather forecasts with beautiful backgrounds. Offline-capable Progressive Web App with accurate weather data for any location worldwide." />
        <meta name="keywords" content="weather, forecast, meteorology, climate, temperature, rain, snow, sunshine, offline weather app" />
        <meta name="author" content="Weather App" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Weather App - Real-time Weather Forecast" />
        <meta property="og:description" content="Get real-time weather forecasts with beautiful backgrounds. Offline-capable Progressive Web App." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weather-app-orpin-eight.vercel.app" />
        <meta property="og:image" content="https://weather-app-orpin-eight.vercel.app/icon-512.png" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weather App - Real-time Weather Forecast" />
        <meta name="twitter:description" content="Get real-time weather forecasts with beautiful backgrounds. Offline-capable Progressive Web App." />
        <meta name="twitter:image" content="https://weather-app-orpin-eight.vercel.app/icon-512.png" />
        
        {/* Kritik CSS inline - Above the fold */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            html,body{height:100%;margin:0;padding:0;overflow:hidden;background:#0a0a0a;color:#ededed;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
            #__next{height:100%}
            .h-screen{height:100vh}
            .w-screen{width:100vw}
            .flex{display:flex}
            .items-center{align-items:center}
            .justify-center{justify-content:center}
            .overflow-hidden{overflow:hidden}
            .relative{position:relative}
            .absolute{position:absolute}
            .inset-0{top:0;right:0;bottom:0;left:0}
            .z-10{z-index:10}
            .w-full{width:100%}
            .h-full{height:100%}
            .max-w-md{max-width:28rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            .object-cover{object-fit:cover}
            .bg-gradient-to-b{background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}
            .from-black\\/30{--tw-gradient-from:rgba(0,0,0,0.3);--tw-gradient-to:rgba(0,0,0,0);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}
            .via-black\\/20{--tw-gradient-to:rgba(0,0,0,0.2);--tw-gradient-stops:var(--tw-gradient-from),rgba(0,0,0,0.2),var(--tw-gradient-to)}
            .to-black\\/40{--tw-gradient-to:rgba(0,0,0,0.4)}
            /* Loading skeleton */
            .loading-skeleton{background:linear-gradient(90deg,#1a1a1a 25%,#2a2a2a 50%,#1a1a1a 75%);background-size:200% 100%;animation:loading 1.5s infinite}
            @keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
          `
        }} />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#667eea" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Weather App" />
        
        {/* Preload kritik kaynaklar */}
        <link rel="dns-prefetch" href="//api.weatherapi.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ServiceWorkerRegistration />
        <OfflineIndicator />
        <CacheDebugPanel />
        {children}
      </body>
    </html>
  );
}
