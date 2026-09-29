import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist_Mono, Inter, Source_Serif_4 } from "next/font/google";

import { ThemeProvider } from "@/components/common/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "app · Foundation",
  description: "Delad app-foundation med auth, företag och Smart arbetsyta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={`${inter.variable} ${sourceSerif.variable} ${geistMono.variable} ${inter.className}`}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
