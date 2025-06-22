'use client';

import { useState } from 'react';

interface Ping {
  id: string;
  lat: string;
  lng: string;
  timestamp: string;
  message: string;
}

export default function PingCard({ ping }: { ping: Ping }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className='cursor-pointer p-4 bg-[#1a1a1a] text-white rounded-lg border border-gray-700 hover:border-green-500 transition duration-200 shadow-lg'
      >
        <p className='text-sm text-gray-400'>
          Ping ID: <span className='text-green-400'>{ping.id}</span>
        </p>
        <p className='text-sm mt-1'>
          <strong>Coordinates:</strong> {ping.lat}, {ping.lng}
        </p>
        <p className='text-sm'>
          <strong>Timestamp:</strong> {ping.timestamp}
        </p>
        <p className='mt-2 text-xs italic text-gray-500'>
          Tap to view encrypted message
        </p>
      </div>

      {/* Modal */}
      {open && (
        <div className='fixed inset-0 bg-gray-900/75 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-[#111] border border-green-500 text-white p-6 rounded-lg w-[90%] max-w-md shadow-xl relative'>
            <h2 className='text-lg font-semibold mb-4 text-green-400'>
              📡 Mission Ping Message
            </h2>
            <p className='text-sm text-gray-300 whitespace-pre-wrap'>
              {ping.message}
            </p>

            <button
              onClick={() => setOpen(false)}
              className='mt-6 w-full py-2 bg-red-600 rounded hover:bg-red-700 text-white text-sm font-semibold'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
