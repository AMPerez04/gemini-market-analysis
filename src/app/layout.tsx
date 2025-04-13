import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer";
import { ThemeProvider } from 'next-themes';
import BlobBackground from "@/components/ui/BlobBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VerifAI",
  description: "Your AI-powered market research assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}

      >
        <style>
          {`
        ::-webkit-scrollbar {
          display: none;
        }
          `}
        </style>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <BlobBackground />
            <Header />
            <div className="flex flex-1 items-center justify-center">
              <main className="w-full">{children}</main>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>

    </html>
  );
}
