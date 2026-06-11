import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "expense tracker",
  description: "expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-950 dark:text-white">
        <AppProviders>
          <Navbar />
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
