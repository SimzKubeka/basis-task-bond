/**
 * =============================================
 * File: page.tsx (Dashboard Page)
 * Purpose:
 * This file defines the main dashboard page that displays recent pings
 * in a card-based layout, serving as the primary landing page for
 * authenticated users.
 *
 * Features:
 * - Displays recent pings in a responsive grid layout
 * - Uses PingCard components for individual ping display
 * - Fetches ping data from the API on component mount
 * - Includes test error functionality for error boundary testing
 * - Responsive design that adapts to different screen sizes
 * - Shows ping coordinates, timestamps, and messages
 *
 * Notes:
 * - Uses 'use client' directive for client-side data fetching
 * - Includes hidden test error button for development purposes
 * - Automatically loads and displays ping data
 * - Serves as the main hub for viewing ping communications
 * =============================================
 */

'use client';

import { useEffect, useState } from 'react';
import PingCard from '../../../components/PingCard';

interface Ping {
  _id: string;
  lat: string;
  lng: string;
  parentId: string;
  timestamp: string;
  message: string;
}

export default function DashboardPage() {
  const [pings, setPings] = useState<Ping[]>([]);

  useEffect(() => {
    const loadPings = async () => {
      const res = await fetch('/api/pings');
      if (res.ok) {
        const data = await res.json();
        setPings(data.pings);
      }
    };
    loadPings();
  }, []);

  // TEST Error button - hidden for now
  const triggerTestError = () => {
    throw new Error(
      'Test error - this is intentional to demonstrate error boundaries!'
    );
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-semibold text-green-400'>Recent Pings</h2>
        {/* TEST Error button - hidden for now */}
        <button
          onClick={triggerTestError}
          className='hidden px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm'
        >
          🧪 Test Error
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {pings.map((ping) => (
          <PingCard
            key={ping._id}
            ping={{
              id: ping._id,
              lat: ping.lat,
              lng: ping.lng,
              timestamp: ping.timestamp,
              message: ping.message,
            }}
          />
        ))}
      </div>
    </div>
  );
}
