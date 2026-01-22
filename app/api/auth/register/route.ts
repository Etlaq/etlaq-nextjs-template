import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateToken } from '@/lib/auth';

interface MongooseValidationError extends Error {
  name: 'ValidationError';
  errors: Record<string, { message: string }>;
}

interface MongooseDuplicateError extends Error {
  code: number;
}

function isValidationError(error: unknown): error is MongooseValidationError {
  return error instanceof Error && error.name === 'ValidationError' && 'errors' in error;
}

function isDuplicateError(error: unknown): error is MongooseDuplicateError {
  return error instanceof Error && 'code' in error && (error as MongooseDuplicateError).code === 11000;
}

// POST /api/auth/register - Create a new user
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مسجّل مسبقاً' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name.trim(),
    });

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    return NextResponse.json(
      {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);

    if (isValidationError(error)) {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
    }

    if (isDuplicateError(error)) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مسجّل مسبقاً' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    );
  }
}
