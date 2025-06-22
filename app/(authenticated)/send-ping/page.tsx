/**
 * =============================================
 * File: page.tsx (Send Ping Page)
 * Purpose:
 * This file defines the page that allows users to send new pings with
 * location coordinates and messages, supporting the core functionality
 * of the James Bond-themed communication system.
 *
 * Features:
 * - Form for creating new pings with coordinates and messages
 * - Automatic coordinate generation with random location feature
 * - Option to respond to the most recent ping (parent-child relationship)
 * - Real-time form validation and submission handling
 * - Success feedback and form reset after successful submission
 * - Integration with the ping API for data persistence
 *
 * Notes:
 * - Uses 'use client' directive for interactive form functionality
 * - Fetches recent ping data to enable response functionality
 * - Provides both manual and automatic coordinate generation
 * - Maintains consistent James Bond theming throughout
 * =============================================
 */

'use client';

import { useState, useEffect } from 'react';

export default function SendPingPage() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [message, setMessage] = useState('');
  const [parentId, setParentId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [recentPingId, setRecentPingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentPing = async () => {
      try {
        const res = await fetch('/api/pings');
        if (res.ok) {
          const data = await res.json();
          if (data.pings && data.pings.length > 0) {
            setRecentPingId(data.pings[0]._id);
          }
        }
      } catch (error) {
        console.error('Error fetching recent ping:', error);
      }
    };

    fetchRecentPing();
  }, []);

  const generateRandomCoords = () => {
    const randomLat = (Math.random() * 180 - 90).toFixed(6);
    const randomLng = (Math.random() * 360 - 180).toFixed(6);
    setLat(randomLat);
    setLng(randomLng);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lat && lng && message) {
      const res = await fetch('/api/pings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng, message, parentId }),
      });

      if (res.ok) {
        setSuccess(true);
        setLat('');
        setLng('');
        setMessage('');
        setParentId(null);
      }
    }
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold text-green-400'>Send New Ping</h1>

      <div className='bg-[#1c1c1c] w-full md:w-1/2 text-white p-6 rounded-lg border border-gray-700 shadow-lg'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-col md:flex-row md:items-center md:space-x-4'>
            <div className='flex-1'>
              <button
                type='button'
                onClick={generateRandomCoords}
                className='w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
              >
                Generate Coordinates
              </button>
            </div>
          </div>

          <div>
            <label className='block text-sm text-gray-300 mb-1'>Latitude</label>
            <input
              type='text'
              value={lat}
              readOnly
              onChange={(e) => setLat(e.target.value)}
              className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded text-white'
            />
          </div>

          <div>
            <label className='block text-sm text-gray-300 mb-1'>
              Longitude
            </label>
            <input
              type='text'
              value={lng}
              readOnly
              onChange={(e) => setLng(e.target.value)}
              className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded text-white'
            />
          </div>

          <div>
            <label className='block text-sm text-gray-300 mb-1'>Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded text-white'
            />
          </div>

          <div className='text-sm text-gray-300'>
            <label className='inline-flex items-center'>
              <input
                type='checkbox'
                onChange={(e) =>
                  setParentId(e.target.checked ? recentPingId : null)
                }
                className='form-checkbox text-green-600 mr-2'
              />
              Respond to last ping?
            </label>
          </div>

          <div className='w-full flex justify-center'>
            <button
              type='submit'
              className='w-2/3 py-4 bg-green-600 text-white font-semibold text-xl rounded-full hover:bg-green-700 transition-all'
            >
              Send Ping
            </button>
          </div>

          {success && (
            <p className='text-green-500 text-sm mt-2 text-center'>
              Ping sent successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
