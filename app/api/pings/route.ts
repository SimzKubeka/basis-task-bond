import { connectToDB } from '@/lib/dbConnect';
import { verifyJWT } from '@/lib/auth';
import Ping from '@/lib/models/Ping';
import User from '@/lib/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectToDB();
  const tokenData = verifyJWT(req);
  if (!tokenData)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { lat, lng, message, parentId } = await req.json();
  const timestamp = new Date().toISOString();

  const ping = await Ping.create({
    userId: (tokenData as { id: string }).id,
    lat,
    lng,
    message,
    timestamp,
    parentId: parentId || null,
  });

  return NextResponse.json({ success: true, ping });
}

export async function GET(req: NextRequest) {
  await connectToDB();
  const tokenData = verifyJWT(req);
  if (!tokenData)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const user = await User.findById((tokenData as { id: string }).id);

  let pings;
  if (user.role === 'handler') {
    pings = await Ping.find().sort({ createdAt: -1 }).lean();
  } else {
    pings = await Ping.find({ userId: (tokenData as { id: string }).id })
      .sort({ createdAt: -1 })
      .lean();
  }

  return NextResponse.json({ success: true, pings });
}
