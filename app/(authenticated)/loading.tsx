/**
 * =============================================
 * File: loading.tsx (Authenticated Loading Component)
 * Purpose:
 * This file defines the loading component specifically for authenticated
 * routes, providing feedback during data loading in secure areas.
 *
 * Features:
 * - Displays authentication-themed loading message
 * - Uses consistent James Bond styling with green accents
 * - Provides specific feedback for secure dashboard loading
 * - Includes animation effects to indicate active loading state
 *
 * Notes:
 * - This component is used for loading states within authenticated routes
 * - Different from global loading to provide context-specific feedback
 * - Maintains the app's visual consistency and theming
 * =============================================
 */

export default function AuthenticatedLoading() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-green-400 animate-pulse'>
      <h2 className='text-2xl font-mono mb-2'>🔐 Authenticating Agent...</h2>
      <p className='text-sm text-gray-500'>Loading secure dashboard data</p>
    </div>
  );
}
