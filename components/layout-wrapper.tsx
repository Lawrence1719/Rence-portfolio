"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        <main className="min-h-screen">{children}</main>
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Toaster />
    </>
  );
}
