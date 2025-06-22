/**
 * =============================================
 * File: loading.tsx (Dashboard Loading Component)
 * Purpose:
 * This file defines the loading component specifically for the dashboard
 * page, providing feedback while dashboard data is being loaded.
 *
 * Features:
 * - Displays dashboard-specific loading message
 * - Uses consistent James Bond styling with green accents
 * - Provides specific feedback for dashboard data loading
 * - Includes animation effects to indicate active loading state
 * - Focuses on mission statistics gathering theme
 *
 * Notes:
 * - This component is used for loading states within the dashboard route
 * - Different from global and authenticated loading for specific context
 * - Maintains the app's visual consistency and theming
 * - Provides context-specific feedback for dashboard operations
 * =============================================
 */

export default function DashboardLoading() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-green-400 animate-pulse'>
      <h2 className='text-2xl font-mono mb-2'>📊 Loading Dashboard...</h2>
      <p className='text-sm text-gray-500'>Gathering mission statistics</p>
    </div>
  );
}
