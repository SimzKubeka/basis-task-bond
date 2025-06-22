'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    agentCode: '',
    role: 'field',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!form.email || !form.password || !form.agentCode) {
      setError('Please complete all fields to register.');
      toast.error('Please complete all fields to register.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          agentCode: form.agentCode,
          role: form.role,
          type: 'register',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          'Agent registered successfully! Redirecting to Mission Control...'
        );
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        const errorMessage =
          data.message || 'Registration failed. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage =
        'Network error. Please check your connection and try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 text-white'>
      {error && (
        <div className='bg-red-500/20 border border-red-500 text-red-300 px-3 py-2 rounded text-sm'>
          {error}
        </div>
      )}
      <input
        type='email'
        placeholder='Email'
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
        required
        disabled={loading}
      />
      <input
        type='password'
        placeholder='Password'
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
        required
        disabled={loading}
      />
      <input
        type='text'
        placeholder='Agent Code (e.g. 007)'
        value={form.agentCode}
        onChange={(e) => setForm({ ...form, agentCode: e.target.value })}
        className='w-full bg-transparent px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
        required
        disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
          <span className='ml-2'>Handler</span>
        </label>
      </div>

      <button
        type='submit'
        className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={loading}
      >
        {loading ? 'Registering Agent...' : 'Register Agent'}
      </button>
    </form>
  );
}
