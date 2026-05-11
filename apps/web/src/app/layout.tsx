import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Loading } from "@/components/layout/loading";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dalre | Frontend Developer",
  description: "Frontend Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f8f8] text-[#0358d5]">
        <Loading />
        <Header />
        {/* 섹션들 자체 패딩이 있어서 main은 flex-1만 유지 */}
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
