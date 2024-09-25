import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";


export const metadata: Metadata = {
  title: "AuTistiC BoYs CLub",
  description: "Sending Avax autists back to nursery to learn how not to jeet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
