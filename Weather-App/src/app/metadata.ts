import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Real-time weather forecast application with offline support",
  keywords: ["weather", "forecast", "meteorology", "climate"],
  authors: [{ name: "Weather App" }],
  robots: "index, follow",
  openGraph: {
    title: "Weather App",
    description: "Real-time weather forecast application with offline support",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};
