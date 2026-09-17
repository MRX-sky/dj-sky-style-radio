"use client";

import { useEffect } from "react";

/** Registers the lightweight service worker only in a production deployment. */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return null;
}
