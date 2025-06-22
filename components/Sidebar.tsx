'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiSend, FiList, FiX } from 'react-icons/fi';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
  { href: '/send-ping', label: 'Send Ping', icon: <FiSend /> },
  { href: '/all-pings', label: 'All Pings', icon: <FiList /> },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed z-40 inset-y-0 left-0 w-64 bg-[#111] border-r border-gray-800 transform transition-transform duration-200 ease-in-out
        ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:flex`}
    >
      <div className='flex flex-col h-full py-6 px-4 space-y-6'>
        <div className='md:hidden flex justify-end'>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-red-500'
          >
            <FiX size={24} />
          </button>
        </div>

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center space-x-3 px-2 py-2 rounded text-sm font-medium 
              ${
                pathname === item.href
                  ? 'text-green-500'
                  : 'text-gray-400 hover:text-green-400'
              }`}
          >
            <span className='text-xl'>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
