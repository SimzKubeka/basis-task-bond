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
import toast from 'react-hot-toast';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPings = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/pings');
        if (res.ok) {
          const data = await res.json();
          setPings(data.pings);
          if (data.pings.length === 0) {
            toast('No pings found. Send your first ping to get started!', {
              icon: '📡',
            });
          }
        } else {
          toast.error('Failed to load ping data. Please try again.');
        }
      } catch (error) {
        console.error('Error loading pings:', error);
        toast.error(
          'Network error. Please check your connection and try again.'
        );
      } finally {
        setLoading(false);
      }
    };
    loadPings();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='text-green-400 animate-pulse'>
          <h2 className='text-xl font-mono'>
            📡 Loading mission communications...
          </h2>
        </div>
      </div>
    );
  }

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
