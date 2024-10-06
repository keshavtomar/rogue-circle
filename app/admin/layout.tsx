'use client'

import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme-provider";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar/>
        {children}
      </ThemeProvider>
    </div>
  );
}
