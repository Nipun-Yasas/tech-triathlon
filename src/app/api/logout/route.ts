import { NextRequest } from "next/server";
import { apiResponse } from "@/lib/apiHelpers";

export async function POST(req: NextRequest) {
  const response = apiResponse({
    message: "Logout successful"
  });

  // Clear the token cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0 // Expire immediately
  });

  return response;
}
