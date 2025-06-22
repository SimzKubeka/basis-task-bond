/**
 * =============================================
 * File: loading.tsx (Global Loading Component)
 * Purpose:
 * This file defines the global loading component that is displayed
 * while pages are loading throughout the application.
 *
 * Features:
 * - Displays a themed loading message with James Bond styling
 * - Uses animation effects to indicate loading state
 * - Consistent with the app's dark theme and green accent colors
 * - Provides user feedback during page transitions
 *
 * Notes:
 * - This component is automatically used by Next.js for loading states
 * - The animation helps users understand the app is working
 * =============================================
 */

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-green-400 animate-pulse'>
      <h2 className='text-2xl font-mono mb-2'>
        🔄 Establishing Secure Uplink...
      </h2>
      <p className='text-sm text-gray-500'>Please stand by, agent.</p>
    </div>
  );
}
