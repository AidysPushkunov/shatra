import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/contexts";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Altai Shatra",
  description:
    "Altai checkers (shatra) is one of the varieties of the game of checkers, combining the rules of both checkers and chess.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketProvider>
      <html lang="en" className="bg-[#F8F9FD]">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </html>
    </SocketProvider>
  );
}
