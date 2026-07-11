import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FileXray",
  description: "AI Assisted Static Malware Analysis Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-950 text-white">
        {children}
      </body>
    </html>
  );
}