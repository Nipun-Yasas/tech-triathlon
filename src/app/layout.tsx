"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { NextAppProvider } from "@toolpad/core/nextjs";
import NAVIGATION from "./utils/navigation";
import theme from "../theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <NextAppProvider navigation={NAVIGATION} theme={theme}>
        {children}
       </NextAppProvider>
      </body>
    </html>
  );
}
