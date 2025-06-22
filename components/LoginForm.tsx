'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email && form.password) {
      window.location.href = '/dashboard';
    } else {
      alert('Enter credentials to proceed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 text-white'>
      <input
        type='email'
        placeholder='Email'
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      <button
        type='submit'
        className='w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
      >
        Login
      </button>
    </form>
  );
}
