import type { Metadata } from "next";
import './globals.css'
import Providers from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Digital vCard",
  description: "Create and manage your digital business card",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
