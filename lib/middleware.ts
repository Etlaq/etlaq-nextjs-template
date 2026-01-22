import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractToken, JWTPayload } from '@/lib/auth';

export type AuthenticatedHandler = (
  request: NextRequest,
  payload: JWTPayload
) => Promise<NextResponse | Response>;

/**
 * Higher-order function to wrap API routes with authentication
 * Usage: export const GET = withAuth(async (req, payload) => { ... })
 */
export function withAuth(handler: AuthenticatedHandler) {
  return async (request: NextRequest): Promise<NextResponse | Response> => {
    const authHeader = request.headers.get('authorization');
    const token = extractToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'التوثيق مطلوب' }, // Authentication required
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'الجلسة منتهية. يرجى تسجيل الدخول مرة أخرى' }, // Invalid/expired token
        { status: 401 }
      );
    }

    return handler(request, payload);
  };
}

/**
 * Optional auth - doesn't fail if no token, but provides payload if present
 */
export type OptionalAuthHandler = (
  request: NextRequest,
  payload: JWTPayload | null
) => Promise<NextResponse>;

export function withOptionalAuth(handler: OptionalAuthHandler) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authHeader = request.headers.get('authorization');
    const token = extractToken(authHeader);
    const payload = token ? verifyToken(token) : null;

    return handler(request, payload);
  };
}
