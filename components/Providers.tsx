"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import Preloader from "./Preloader";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScroll />
      <Cursor />
      <Preloader />
      <div className="site-grid" aria-hidden="true" />
      {children}
    </LanguageProvider>
  );
}
