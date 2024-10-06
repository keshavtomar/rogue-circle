import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

// Handle POST requests
export async function POST(req) {
  const cookie = serialize('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Expire the cookie immediately
    path: '/', // Clear the cookie for the entire domain
  });

  // Create a response and set the cookie header
  const response = NextResponse.json({ message: 'Logout successful' });
  response.headers.set('Set-Cookie', cookie);

  return response;
}
