// lib/jwt.ts
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_undefined';

export function verifyJwt(token: string): JwtPayload | null { // declared type JwtPayload gives safety
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") return null; // safety
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}