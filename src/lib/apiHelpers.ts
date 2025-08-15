import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, JWTPayload } from './auth';

export function withAuth(
  handler: (req: NextRequest, user: JWTPayload, context?: { params: Record<string, string> }) => Promise<NextResponse>, 
  requiredUserTypes?: ('farmer' | 'officer')[]
) {
  return async (req: NextRequest, context?: { params: Record<string, string> }): Promise<NextResponse> => {
    const user = getUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (requiredUserTypes && !requiredUserTypes.includes(user.userType)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }
    
    return handler(req, user, context);
  };
}

export function apiResponse(data: unknown, status: number = 200) {
  return NextResponse.json(data, { status });
}

export function apiError(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function validateRequired(obj: Record<string, unknown>, fields: string[]): string | null {
  for (const field of fields) {
    if (!obj[field]) {
      return `${field} is required`;
    }
  }
  return null;
}

export function parsePaginationParams(searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;
  
  return { page, limit, skip };
}

export function buildFilterQuery(searchParams: URLSearchParams, allowedFilters: string[]) {
  const filter: Record<string, string> = {};
  
  for (const key of allowedFilters) {
    const value = searchParams.get(key);
    if (value) {
      filter[key] = value;
    }
  }
  
  return filter;
}
