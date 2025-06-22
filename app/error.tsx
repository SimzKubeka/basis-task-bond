/**
 * =============================================
 * File: error.tsx (Global Error Boundary)
 * Purpose:
 * This file defines the global error boundary component that catches
 * and handles errors throughout the application.
 *
 * Features:
 * - Catches JavaScript errors anywhere in the component tree
 * - Displays a user-friendly error message with James Bond theming
 * - Provides retry functionality to attempt error recovery
 * - Includes navigation back to the home page
 * - Logs errors to console for debugging purposes
 *
 * Notes:
 * - This component is automatically used by Next.js for error handling
 * - Uses 'use client' directive for client-side error handling
 * - Provides multiple recovery options for users
 * =============================================
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white px-4 text-center'>
      <h1 className='text-3xl font-bold text-red-500 mb-4'>
        💥 Mission Failed
      </h1>
      <p className='text-gray-400 max-w-md'>
        Something went wrong. Please report the incident to HQ or try again.
      </p>

      <div className='mt-6 flex space-x-4'>
        <button
          onClick={() => reset()}
          className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Retry
        </button>
        <button
          onClick={() => router.push('/')}
          className='px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600'
        >
          Return to Base
        </button>
      </div>
    </div>
  );
}
