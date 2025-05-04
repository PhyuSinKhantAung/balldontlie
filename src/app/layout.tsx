import type { Metadata } from "next";
import { Nunito, Space_Grotesk } from "next/font/google";
import StoreProvider from "@/providers/StoreProvider";
import QueryProvider from "@/providers/QueryClientProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const space_grotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Balldontlie",
  description: "A simple app to manage your basketball team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <QueryProvider>
          <body
            className={`${nunito.variable} ${space_grotesk.variable} antialiased`}
          >
            {children}
            <Toaster />
          </body>
        </QueryProvider>
      </StoreProvider>
    </html>
  );
}
