import PingCard from '../../../components/PingCard';
import { pingData } from '../../../lib/pingData';

export default function DashboardPage() {
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4 text-green-400'>
        Recent Pings
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {pingData.map((ping) => (
          <PingCard key={ping.id} ping={ping} />
        ))}
      </div>
    </div>
  );
}
