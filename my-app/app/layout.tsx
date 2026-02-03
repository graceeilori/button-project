import type { Metadata } from "next";
import { Jersey_20, Space_Mono, Quantico } from "next/font/google";
import "./globals.css";
import SpaceBackground from "../components/SpaceBackground";

const jersey20 = Jersey_20({
  variable: "--font-jersey",
  weight: "400",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const quantico = Quantico({
  variable: "--font-quantico",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Family of Buttons",
  description: "A look into our personalities using our custom solar system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jersey20.variable} ${spaceMono.variable} ${quantico.variable} antialiased`}
      >
        <SpaceBackground />
        {children}
      </body>
    </html>
  );
}
