import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { withAuth } from '@/lib/middleware';

// GET /api/auth/me - Get current authenticated user
export const GET = withAuth(async (request, payload) => {
  try {
    await connectDB();

    const user = await User.findById(payload.userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' }, // User not found
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    );
  }
});
