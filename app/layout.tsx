import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const RobotoMono = Roboto_Mono({
  variable: "--font-robot-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Who's Chat",
  description: "An anonymous chatroom you can create, share, and delete anytime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/anonim.png" type="image/png" />
      </head>
      <body
        className={`${RobotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
