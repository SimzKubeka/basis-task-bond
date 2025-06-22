import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/dbConnect';
import User from '@/lib/models/User';
import { signJWT } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password, agentCode, role, type } = await req.json();
  await connectToDB();

  if (type === 'register') {
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashed,
      agentCode,
      role,
    });

    const token = signJWT({ id: user._id, email: user.email });
    const res = NextResponse.json({ success: true });
    res.cookies.set('token', token, { httpOnly: true, path: '/' });
    return res;
  }

  if (type === 'login') {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signJWT({ id: user._id, email: user.email });
    const res = NextResponse.json({ success: true });
    res.cookies.set('token', token, { httpOnly: true, path: '/' });
    return res;
  }

  return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
}

export async function GET() {
  // Logout: Clear the token cookie
  const res = NextResponse.json({ success: true, message: 'Logged out' });
  res.cookies.set('token', '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
