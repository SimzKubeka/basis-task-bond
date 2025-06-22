/**
 * =============================================
 * File: not-found.tsx (404 Error Page)
 * Purpose:
 * This file defines the 404 error page that is displayed when users
 * navigate to a route that doesn't exist in the application.
 *
 * Features:
 * - Displays a styled 404 error message with James Bond theming
 * - Provides navigation links to return to dashboard or login
 * - Uses consistent dark theme styling with green accents
 * - Responsive design that works on all screen sizes
 *
 * Notes:
 * - This page is automatically used by Next.js for 404 errors
 * - Links provide clear navigation paths for users
 * =============================================
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-6'>
      <div className='text-center max-w-md w-full'>
        <h1 className='text-8xl font-bold text-gray-700 mb-2 tracking-widest'>
          404
        </h1>
        <h2 className='text-2xl font-semibold text-green-400 mb-4'>
          Location Unknown
        </h2>
        <p className='text-gray-400 mb-8'>
          Agent, the page you are looking for is either classified or has been
          wiped from the grid.
        </p>

        <div className='space-y-4'>
          <Link
            href='/dashboard'
            className='inline-block w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors duration-200'
          >
            Return to Mission Control
          </Link>

          <Link
            href='/'
            className='inline-block w-full border border-gray-600 text-gray-300 px-6 py-3 rounded hover:bg-gray-800 transition-colors duration-200'
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
