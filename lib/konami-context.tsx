"use client";

import { createContext, useContext, useState, useLayoutEffect, ReactNode } from "react";

type KonamiContextType = {
  secretTheme: boolean;
  toggleSecretTheme: () => void;
};

const KonamiContext = createContext<KonamiContextType | undefined>(undefined);

export function KonamiProvider({ children }: { children: ReactNode }) {
  const [secretTheme, setSecretTheme] = useState(false);

  // Apply/remove secret theme class on <html>
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("konami-theme", secretTheme);
  }, [secretTheme]);

  return (
    <KonamiContext.Provider value={{ secretTheme, toggleSecretTheme: () => setSecretTheme((v) => !v) }}>
      {children}
    </KonamiContext.Provider>
  );
}

export function useKonami() {
  const context = useContext(KonamiContext);
  if (context === undefined) {
    throw new Error("useKonami must be used within a KonamiProvider");
  }
  return context;
}
