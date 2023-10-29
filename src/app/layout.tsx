import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shatra | Шатра",
  description:
    "Shatra is an intellectual board game of the Telengit people. The goal of this project is to create an Internet platform for the game “Shatra” in real time between two people or with artificial intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
