import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "LeaseMate",
  description: "LeaseMate - wynajmij swoją nieruchomość z łatwością",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
