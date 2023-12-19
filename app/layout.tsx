import { Inter } from "next/font/google";
import { FC } from "react";

import "./globals.css";
import "./reset.css";

import type { Metadata } from "next"

import { cn } from "app/components/molecules/lib/utils"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
      className={cn(
          "flex min-h-screen overflow-x-hidden bg-gray-950 text-gray-50",
          inter.className,
        )}
      >
        <main className="flex flex-1 flex-col items-center justify-center gap-12">
          {children}
        </main>
      </body>
    </html>
  );
};


