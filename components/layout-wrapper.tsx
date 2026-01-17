"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Toaster />
    </>
  );
}
