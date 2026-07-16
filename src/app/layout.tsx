import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorker from "@/components/pwa/ServiceWorker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "queSigue Viewer",
  description: "Guía de escenario para músicos y técnicos.",
  manifest: "/manifest.json",

  applicationName: "queSigue",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "queSigue",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <ServiceWorker />
        {children}
      </body>
    </html>
  );
}
