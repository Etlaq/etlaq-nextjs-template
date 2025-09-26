import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export function withAuth(handler: (request: NextRequest, userId: string) => Promise<NextResponse>) {
    return async (request: NextRequest) => {
        try {
            // Extract token from Authorization header
            const authHeader = request.headers.get('authorization');
            const token = extractTokenFromHeader(authHeader);

            if (!token) {
                return NextResponse.json(
                    { error: 'Authentication required' },
                    { status: 401 }
                );
            }

            // Verify token
            const payload = verifyToken(token);
            if (!payload) {
                return NextResponse.json(
                    { error: 'Invalid or expired token' },
                    { status: 401 }
                );
            }

            // Call the original handler with the user ID
            return await handler(request, payload.userId);

        } catch (error: any) {
            console.error('Auth middleware error:', error);
            return NextResponse.json(
                { error: 'Internal server error' },
                { status: 500 }
            );
        }
    };
}
