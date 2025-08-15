import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  userId: string;
  email: string;
  userType: 'farmer' | 'officer';
  iat?: number;
  exp?: number;
}

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function extractTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check for token in cookies
  const cookieToken = req.cookies.get('token')?.value;
  return cookieToken || null;
}

export function getUserFromRequest(req: NextRequest): JWTPayload | null {
  const token = extractTokenFromRequest(req);
  if (!token) return null;
  
  return verifyToken(token);
}

export function requireAuth(userTypes?: ('farmer' | 'officer')[]): (req: NextRequest) => JWTPayload | null {
  return (req: NextRequest) => {
    const user = getUserFromRequest(req);
    
    if (!user) {
      return null;
    }
    
    if (userTypes && !userTypes.includes(user.userType)) {
      return null;
    }
    
    return user;
  };
}
