/**
 * =============================================
 * File: error.tsx (Dashboard Error Boundary)
 * Purpose:
 * This file defines the error boundary component specifically for the
 * dashboard page, handling errors that occur during dashboard operations.
 *
 * Features:
 * - Catches and handles errors within the dashboard page
 * - Displays dashboard-specific error messages
 * - Provides retry functionality for dashboard reload
 * - Includes navigation to alternative ping viewing options
 * - Logs dashboard-specific errors for debugging purposes
 *
 * Notes:
 * - This component is used for error handling within the dashboard route
 * - Different from global and authenticated error boundaries for specific context
 * - Focuses on dashboard data loading and display errors
 * - Provides alternative navigation to all-pings page
 * =============================================
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white px-4 text-center'>
      <h1 className='text-3xl font-bold text-red-500 mb-4'>
        📊 Dashboard Error
      </h1>
      <p className='text-gray-400 max-w-md'>
        Failed to load dashboard data. This could be due to network issues or
        data corruption.
      </p>

      <div className='mt-6 flex space-x-4'>
        <button
          onClick={() => reset()}
          className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Reload Dashboard
        </button>
        <button
          onClick={() => router.push('/all-pings')}
          className='px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600'
        >
          View All Pings
        </button>
      </div>
    </div>
  );
}
