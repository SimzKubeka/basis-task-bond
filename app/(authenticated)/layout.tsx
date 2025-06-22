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
