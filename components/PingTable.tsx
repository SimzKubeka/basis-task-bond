'use client';

import { useState, useMemo } from 'react';

interface Ping {
  id: string;
  lat: string;
  lng: string;
  timestamp: string;
  parentId: string | null;
  message?: string;
}

export default function PingTable({ pings }: { pings: Ping[] }) {
  const [search, setSearch] = useState('');
  const [selectedPing, setSelectedPing] = useState<Ping | null>(null);

  const filtered = useMemo(() => {
    return pings.filter((ping) => {
      const query = search.toLowerCase();
      return (
        ping.id.toLowerCase().includes(query) ||
        ping.lat.toLowerCase().includes(query) ||
        ping.lng.toLowerCase().includes(query) ||
        ping.message?.toLowerCase().includes(query)
      );
    });
  }, [search, pings]);

  return (
    <div className='space-y-4'>
      {/* Search */}
      <div>
        <input
          type='text'
          placeholder='🔍 Filter by ID, Coordinates, or Message'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full bg-transparent px-4 py-2 border border-gray-700 rounded text-white placeholder-gray-500'
        />
      </div>

      {/* Table */}
      <div className='overflow-x-auto bg-[#1a1a1a] shadow-md rounded-lg border border-gray-700 max-h-[70vh] overflow-y-auto'>
        <table className='min-w-full text-sm text-left text-gray-300'>
          <thead className='sticky top-0 bg-[#111] text-green-400 border-b border-gray-700 z-10'>
            <tr>
              <th className='px-4 py-3 font-semibold'>ID</th>
              <th className='px-4 py-3 font-semibold'>Coordinates</th>
              <th className='px-4 py-3 font-semibold'>Timestamp</th>
              <th className='px-4 py-3 font-semibold'>Parent Ping</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ping) => (
              <tr
                key={ping.id}
                onClick={() => setSelectedPing(ping)}
                className='border-b border-gray-700 hover:bg-[#222] cursor-pointer transition-colors'
              >
                <td className='px-4 py-2'>{ping.id}</td>
                <td className='px-4 py-2'>
                  <span className='text-blue-400'>{ping.lat}</span>,{' '}
                  <span className='text-blue-400'>{ping.lng}</span>
                </td>
                <td className='px-4 py-2'>{ping.timestamp}</td>
                <td className='px-4 py-2'>
                  {ping.parentId ? (
                    <span className='text-yellow-400'>#{ping.parentId}</span>
                  ) : (
                    <span className='text-gray-500'>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className='text-center text-gray-500 py-8'>
            No pings match your search.
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPing && (
        <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-[#111] border border-green-500 text-white p-6 rounded-lg w-[90%] max-w-md shadow-xl relative'>
            <h2 className='text-lg font-semibold mb-4 text-green-400'>
              📡 Ping Details
            </h2>
            <p>
              <strong>ID:</strong> {selectedPing.id}
            </p>
            <p>
              <strong>Coordinates:</strong> {selectedPing.lat},{' '}
              {selectedPing.lng}
            </p>
            <p>
              <strong>Timestamp:</strong> {selectedPing.timestamp}
            </p>
            <p>
              <strong>Parent ID:</strong> {selectedPing.parentId || '—'}
            </p>
            {selectedPing.message && (
              <p className='mt-2'>
                <strong>Message:</strong>
                <br />
                {selectedPing.message}
              </p>
            )}

            <button
              onClick={() => setSelectedPing(null)}
              className='mt-6 w-full py-2 bg-red-600 rounded hover:bg-red-700 text-white text-sm font-semibold'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
