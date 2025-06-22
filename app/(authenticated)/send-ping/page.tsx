'use client';

import { useState } from 'react';

export default function SendPingPage() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [message, setMessage] = useState('');
  const [parentId, setParentId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const generateRandomCoords = () => {
    const randomLat = (Math.random() * 180 - 90).toFixed(6);
    const randomLng = (Math.random() * 360 - 180).toFixed(6);
    setLat(randomLat);
    setLng(randomLng);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lat && lng && message) {
      console.log('Sent ping:', { lat, lng, parentId, message });
      setSuccess(true);
      setMessage('');
      setLat('');
      setLng('');
      setParentId(null);
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
                  setParentId(e.target.checked ? 'lastPingId123' : null)
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
