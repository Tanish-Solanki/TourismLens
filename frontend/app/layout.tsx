import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TourismLens — Global Tourism Trends & Destination Insights",
  description: "Data-driven tourism destination decision support system built for Data Analysis & Visualization (DAV) at Nirma University.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#FFF2DA] text-[#162622] min-h-screen flex flex-col antialiased selection:bg-[#213832] selection:text-[#FFF2DA]`}>
        <Suspense fallback={<div className="h-16 bg-[#213832] border-b border-[#76B7A6]/30" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 bg-[#FFF2DA] w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
