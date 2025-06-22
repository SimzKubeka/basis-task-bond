'use client';

import { FiMenu } from 'react-icons/fi';

export default function Navbar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  return (
    <header className='w-full bg-[#1a1a1a] px-6 py-4 flex justify-between items-center border-b border-gray-800 shadow-md'>
      <div className='flex items-center space-x-4'>
        <button
          onClick={onToggleSidebar}
          className='md:hidden text-gray-400 hover:text-green-400'
        >
          <FiMenu size={24} />
        </button>
        <h1 className='text-lg font-semibold tracking-widest text-green-400'>
          🕵️ Mission Control
        </h1>
      </div>
      <button
        onClick={() => {
          alert('Logging out... (not wired yet)');
          window.location.href = '/';
        }}
        className='text-sm text-red-500 hover:underline'
      >
        Logout
      </button>
    </header>
  );
}
