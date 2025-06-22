/**
 * =============================================
 * File: page.tsx (All Pings Page)
 * Purpose:
 * This file defines the page that displays all sent pings in a table format,
 * allowing users to view the complete history of ping communications.
 *
 * Features:
 * - Fetches and displays all pings from the API
 * - Uses PingTable component for organized data presentation
 * - Provides comprehensive view of ping history
 * - Includes location coordinates, timestamps, and messages
 * - Supports parent-child ping relationships
 *
 * Notes:
 * - Uses 'use client' directive for client-side data fetching
 * - Automatically loads ping data on component mount
 * - Transforms API data to match PingTable component interface
 * =============================================
 */

'use client';

import { useEffect, useState } from 'react';
import PingTable from '../../../components/PingTable';

interface Ping {
  _id: string;
  lat: string;
  lng: string;
  parentId: string | null;
  timestamp: string;
  message?: string;
}

export default function AllPingsPage() {
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

  return (
    <div>
      <h1 className='text-2xl font-bold text-green-400 mb-4'>All Sent Pings</h1>
      <PingTable
        pings={pings.map((ping) => ({
          id: ping._id,
          lat: ping.lat,
          lng: ping.lng,
          timestamp: ping.timestamp,
          message: ping.message,
          parentId: ping.parentId,
        }))}
      />
    </div>
  );
}
