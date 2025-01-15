import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Web3ProviderContext } from "@/app/context/Web3Context";
import { CssBaseline, Container } from "@mui/material";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniswapV2 Mock",
  description: "A simplified UniswapV2-inspired SPA for token trading and liquidity management.",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3ProviderContext>
          <CssBaseline />
          <Container maxWidth="md" sx={{ paddingY: 4 }}>
            {children}
          </Container>
        </Web3ProviderContext>
      </body>
    </html>
  );
}
