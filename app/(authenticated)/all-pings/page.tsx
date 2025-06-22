import PingTable from '../../../components/PingTable';
import { pingData } from '../../../lib/pingData';

export default function AllPingsPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold text-green-400 mb-4'>All Sent Pings</h1>
      <PingTable pings={pingData} />
    </div>
  );
}
