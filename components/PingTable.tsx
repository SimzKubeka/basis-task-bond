'use client';

import { useState, useMemo, useEffect } from 'react';

interface Ping {
  id: string;
  lat: string;
  lng: string;
  timestamp: string;
  parentId: string | null;
  message?: string;
}

interface TrailPing extends Ping {
  _id: string;
}

export default function PingTable({ pings }: { pings: Ping[] }) {
  const [search, setSearch] = useState('');
  const [selectedPing, setSelectedPing] = useState<Ping | null>(null);
  const [trail, setTrail] = useState<TrailPing[]>([]);
  const [loadingTrail, setLoadingTrail] = useState(false);

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

  useEffect(() => {
    if (selectedPing) {
      fetchTrail(selectedPing.id);
    }
  }, [selectedPing]);

  const fetchTrail = async (pingId: string) => {
    setLoadingTrail(true);
    try {
      const response = await fetch(`/api/pings/${pingId}`);
      if (response.ok) {
        const data = await response.json();
        setTrail(data.trail || []);
      }
    } catch (error) {
      console.error('Error fetching trail:', error);
    } finally {
      setLoadingTrail(false);
    }
  };

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
        <div
          className='fixed inset-0 bg-gray-900/75 backdrop-blur-sm flex items-center justify-center z-50'
          onClick={() => {
            setSelectedPing(null);
            setTrail([]);
          }}
        >
          <div
            className='bg-[#111] border border-green-500 text-white p-6 rounded-lg w-[90%] max-w-2xl shadow-xl relative max-h-[80vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className='text-lg font-semibold mb-4 text-green-400'>
              🛤️ Ping Trail
            </h2>

            {loadingTrail ? (
              <div className='text-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto'></div>
                <p className='mt-2 text-gray-400'>Loading trail...</p>
              </div>
            ) : (
              <div className='space-y-4'>
                <div className='bg-[#1a1a1a] p-4 rounded border border-gray-700'>
                  <h3 className='text-green-400 font-semibold mb-2'>
                    Selected Ping:
                  </h3>
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
                  {selectedPing.message && (
                    <p>
                      <strong>Message:</strong> {selectedPing.message}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className='text-green-400 font-semibold mb-3'>
                    Trail History ({trail.length} pings):
                  </h3>
                  {trail.length > 0 ? (
                    <div className='space-y-3'>
                      {trail.map((ping, index) => (
                        <div
                          key={ping._id}
                          className={`p-3 rounded border ${
                            ping._id === selectedPing.id
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-gray-600 bg-[#1a1a1a]'
                          }`}
                        >
                          <div className='flex items-center justify-between mb-2'>
                            <span className='text-sm text-gray-400'>
                              #{index + 1}
                            </span>
                            {ping._id === selectedPing.id && (
                              <span className='text-green-400 text-sm font-semibold'>
                                ← Current
                              </span>
                            )}
                          </div>
                          <p>
                            <strong>ID:</strong> {ping._id}
                          </p>
                          <p>
                            <strong>Coordinates:</strong> {ping.lat}, {ping.lng}
                          </p>
                          <p>
                            <strong>Timestamp:</strong> {ping.timestamp}
                          </p>
                          {ping.message && (
                            <p>
                              <strong>Message:</strong> {ping.message}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-gray-500 text-center py-4'>
                      No trail found for this ping.
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedPing(null);
                setTrail([]);
              }}
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
