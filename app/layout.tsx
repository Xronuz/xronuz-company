import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Providers from "@/components/Providers";
import type { Theme } from "@/lib/theme";

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // theme lives in a cookie so the server renders the correct data-theme
  // directly — no flash of the wrong theme and no hydration mismatch
  const theme: Theme =
    (await cookies()).get("xronuz-theme")?.value === "light" ? "light" : "dark";

  return (
    <html
      lang="uz"
      className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}
      data-theme={theme === "light" ? "light" : undefined}
      suppressHydrationWarning
    >
      <body>
        <Providers initialTheme={theme}>{children}</Providers>
      </body>
    </html>
  );
}
