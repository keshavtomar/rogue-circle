'use client'

import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Conditionally render layout based on the path
  const isAppointmentPage = pathname === '/admin/appointment';

  if (isAppointmentPage) {
    return <>{children}</>;
  }

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
