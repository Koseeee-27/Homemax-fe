import type { Metadata } from "next";
import { Geist, Geist_Mono, Kiwi_Maru } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header/Header";
import Footer from "@/components/layouts/Footer/Footer";
import { getCurrentUser } from "@/features/auth/utils/session";
import JotaiProvider from "@/features/providers/JotaiProvider";

const kiwiMaru = Kiwi_Maru({
  variable: "--font-kiwi-maru",
  weight: ["300", "400", "500"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HomeMax",
  description: "HomeMax Next.js App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="ja">
      <body
        className={`${kiwiMaru.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JotaiProvider initialUser={user}>
          <div className="flex h-dvh w-full flex-col overflow-hidden font-kiwi-maru">
            <Header />
            <main className="flex flex-col h-full pt-12 pb-8">{children}</main>
            <Footer />
          </div>
        </JotaiProvider>
      </body>
    </html>
  );
}
