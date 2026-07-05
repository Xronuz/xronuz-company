import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-f",
});

export const metadata: Metadata = {
  title: "Xronuz — Engineering the Future | IT & AI",
  description:
    "Xronuz — IT & AI engineering studio. AI Solutions, Web & Mobile Development, ERP/CRM, UI/UX, Cloud & DevOps, Cybersecurity, IT Consulting. Tashkent, Uzbekistan.",
  openGraph: {
    title: "Xronuz — Engineering the Future",
    description:
      "IT & AI engineering studio crafting intelligent software: AI, Web, Mobile, ERP/CRM, Cloud, Cybersecurity.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#04120c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
