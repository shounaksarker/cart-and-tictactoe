import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { RootLayout as Layout } from "@/layouts/RootLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assignments Hub - Tic-Tac-Toe & CRUD",
  description: "Interactive assignments featuring Tic-Tac-Toe game and Product CRUD application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <Layout>
            {children}
          </Layout>
        </StoreProvider>
      </body>
    </html>
  );
}
