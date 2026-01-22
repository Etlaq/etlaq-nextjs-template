import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Todo from '@/models/Todo';

interface RouteParams {
  params: Promise<{ id: string }>;
}

function getValidationErrorMessages(error: unknown): string[] {
  if (error instanceof Error && error.name === 'ValidationError' && 'errors' in error) {
    const mongooseError = error as Error & { errors: Record<string, { message: string }> };
    return Object.values(mongooseError.errors).map((e) => e.message);
  }
  return [];
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();

    const todo = await Todo.findById(id);
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        ...(body.title !== undefined && { title: body.title.trim() }),
        ...(body.completed !== undefined && { completed: body.completed }),
      },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);

    const messages = getValidationErrorMessages(error);
    if (messages.length > 0) {
      return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();

    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
