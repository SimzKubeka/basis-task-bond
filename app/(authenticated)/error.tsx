/**
 * =============================================
 * File: error.tsx (Authenticated Error Boundary)
 * Purpose:
 * This file defines the error boundary component specifically for
 * authenticated routes, handling errors in secure areas of the app.
 *
 * Features:
 * - Catches and handles errors within authenticated routes
 * - Displays authentication-themed error messages
 * - Provides retry functionality for connection issues
 * - Includes navigation back to login page
 * - Logs authentication-specific errors for debugging
 *
 * Notes:
 * - This component is used for error handling within authenticated routes
 * - Different from global error boundary to provide context-specific handling
 * - Focuses on authentication and connection-related error scenarios
 * =============================================
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthenticatedError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Authenticated route error:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white px-4 text-center'>
      <h1 className='text-3xl font-bold text-red-500 mb-4'>🔐 Access Denied</h1>
      <p className='text-gray-400 max-w-md'>
        There was an issue with your secure connection. This could be due to
        authentication problems or data loading issues.
      </p>

      <div className='mt-6 flex space-x-4'>
        <button
          onClick={() => reset()}
          className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Retry Connection
        </button>
        <button
          onClick={() => router.push('/')}
          className='px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600'
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}
