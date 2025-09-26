import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { withAuth } from '@/lib/middleware';

// Example of a protected route using the withAuth middleware
export const GET = withAuth(async (request: NextRequest, userId: string) => {
    try {
        // Connect to database
        await connectDB();

        // Find user by ID (userId is extracted from the JWT token)
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Protected route accessed successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            timestamp: new Date().toISOString(),
        });

    } catch (error: any) {
        console.error('Protected route error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});

export const PUT = withAuth(async (request: NextRequest, userId: string) => {
    try {
        const { name } = await request.json();

        if (!name || name.trim().length === 0) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            );
        }

        // Connect to database
        await connectDB();

        // Update user
        const user = await User.findByIdAndUpdate(
            userId,
            { name: name.trim() },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });

    } catch (error: any) {
        console.error('Profile update error:', error);

        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map((err: any) => err.message);
            return NextResponse.json(
                { error: errorMessages.join(', ') },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});
