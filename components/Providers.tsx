"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider, Theme } from "@/lib/theme";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import Preloader from "./Preloader";

export default function Providers({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: Theme;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LanguageProvider>
        {!isAdmin && (
          <>
            <SmoothScroll />
            <Cursor />
            <Preloader />
            <div className="site-grid" aria-hidden="true" />
          </>
        )}
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
