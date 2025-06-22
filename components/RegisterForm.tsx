'use client';

import { useState } from 'react';

export default function RegisterForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    agentCode: '',
    role: 'field',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email && form.password && form.agentCode) {
      alert('Agent registered. Redirecting to Mission Control...');
      window.location.href = '/dashboard';
    } else {
      alert('Complete all fields to register.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 text-white'>
      <input
        type='email'
        placeholder='Email'
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
        required
      />
      <input
        type='text'
        placeholder='Agent Code (e.g. 007)'
        value={form.agentCode}
        onChange={(e) => setForm({ ...form, agentCode: e.target.value })}
        className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
        required
      />

      <div className='text-sm text-gray-300'>
        <label className='block mb-2 font-semibold'>Select Role:</label>
        <label className='inline-flex items-center mr-4'>
          <input
            type='radio'
            value='field'
            checked={form.role === 'field'}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className='form-radio text-green-600'
          />
          <span className='ml-2'>Field Agent</span>
        </label>
        <label className='inline-flex items-center'>
          <input
            type='radio'
            value='handler'
            checked={form.role === 'handler'}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className='form-radio text-green-600'
          />
          <span className='ml-2'>Handler</span>
        </label>
      </div>

      <button
        type='submit'
        className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
      >
        Register Agent
      </button>
    </form>
  );
}
