import { connectToDB } from '@/lib/dbConnect';
import { verifyJWT } from '@/lib/auth';
import Ping from '@/lib/models/Ping';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDB();
  const tokenData = verifyJWT(req);
  if (!tokenData)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const trail: { _id: string; parentId?: string }[] = [];

  let current = (await Ping.findById(id).lean()) as {
    _id: string;
    parentId?: string;
  } | null;
  while (current) {
    trail.unshift(current);
    if (!current.parentId) break;
    current = (await Ping.findById(current.parentId).lean()) as {
      _id: string;
      parentId?: string;
    } | null;
  }

  return NextResponse.json({ success: true, trail });
}
