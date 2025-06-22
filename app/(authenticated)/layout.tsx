/**
 * =============================================
 * File: layout.tsx (Authenticated Layout)
 * Purpose:
 * This file defines the layout component for all authenticated routes,
 * providing a consistent navigation structure with sidebar and navbar.
 *
 * Features:
 * - Wraps authenticated pages with navigation components
 * - Manages sidebar open/close state for mobile responsiveness
 * - Integrates NavBar and Sidebar components for navigation
 * - Uses consistent dark theme styling throughout
 * - Responsive design that adapts to different screen sizes
 *
 * Notes:
 * - This layout is applied to all routes within the (authenticated) folder
 * - Uses 'use client' directive for interactive sidebar functionality
 * - Provides a consistent user experience across authenticated pages
 * =============================================
 */

'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-white font-mono'>
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className='flex-1 flex flex-col'>
        <NavBar onToggleSidebar={() => setSidebarOpen(true)} />
        <main className='p-6'>{children}</main>
      </div>
    </div>
  );
}
