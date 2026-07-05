"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const DUR = 1500;
    let rafId: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DUR, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) rafId = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    rafId = requestAnimationFrame(tick);
    // hard fallback: never block the page (e.g. rAF paused in background tabs)
    const safety = setTimeout(() => setDone(true), 2600);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="preloader-inner">
            <div className="preloader-brand">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                Xron<span style={{ color: "var(--em)" }}>uz</span>
                <span className="mono-dim" style={{ display: "block", marginTop: 8 }}>
                  Engineering the Future
                </span>
              </motion.div>
            </div>
          </div>
          <div className="preloader-count">{count}</div>
          <motion.div
            className="preloader-bar"
            style={{ width: `${count}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
