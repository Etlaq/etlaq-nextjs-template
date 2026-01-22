import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Todo from '@/models/Todo';

export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

function getValidationErrorMessages(error: unknown): string[] {
  if (error instanceof Error && error.name === 'ValidationError' && 'errors' in error) {
    const mongooseError = error as Error & { errors: Record<string, { message: string }> };
    return Object.values(mongooseError.errors).map((e) => e.message);
  }
  return [];
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    await connectDB();
    const todo = await Todo.create({ title: title.trim() });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);

    const messages = getValidationErrorMessages(error);
    if (messages.length > 0) {
      return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
