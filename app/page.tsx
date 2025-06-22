'use client';

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

export default function Home() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className='min-h-screen bg-[#0a0a0a] flex items-center justify-center font-mono text-white'>
      <div className='w-full max-w-md p-8 bg-[#1c1c1c] border border-gray-700 rounded-lg shadow-xl'>
        <h1 className='text-2xl font-semibold text-center mb-6 tracking-widest text-green-400'>
          {mode === 'login'
            ? 'LOGIN TO MISSION CONTROL'
            : 'REGISTER AS AN AGENT'}
        </h1>

        {mode === 'login' ? <LoginForm /> : <RegisterForm />}

        <div className='mt-6 text-center'>
          <button
            className='text-sm text-blue-400 hover:underline'
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login'
              ? 'Need access clearance? Register'
              : 'Already have clearance? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
