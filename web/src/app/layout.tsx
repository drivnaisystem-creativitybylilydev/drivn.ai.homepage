import type { Metadata } from "next";
import { Inter, Poppins, Oswald } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-navbar",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drivn.ai — AI Quote-to-Booking Engine for Quote-Based Businesses",
  description:
    "Drivn.ai designs AI infrastructure for $500K+ businesses. Revenue systems audits, custom architecture, measurable ROI. 90-day builds, ongoing optimization. $12K-$30K investments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} ${oswald.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
