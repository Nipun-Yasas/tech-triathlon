// Cleanup script for incomplete officer registrations
// This will help identify and clean up any partial registrations

import { NextRequest } from "next/server";
import { User } from "@/models/User";
import { Officer } from "@/models/Officer";
import dbConnect from "@/lib/mongoose";
import { apiError, apiResponse } from "@/lib/apiHelpers";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { action, email } = body;

    if (action === 'cleanup_user') {
      if (!email) {
        return apiError("Email is required", 400);
      }

      // Find user by email
      const user = await User.findOne({ email });
      
      if (user) {
        // Check if officer profile exists
        const officer = await Officer.findOne({ userId: user._id });
        
        // If user exists but officer profile creation failed, clean up
        if (user.userType === 'officer' && !officer) {
          await User.findByIdAndDelete(user._id);
          return apiResponse({
            message: "Incomplete officer registration cleaned up successfully",
            cleaned: true
          });
        }
        
        return apiResponse({
          message: "User found - registration appears complete",
          user: {
            id: user._id,
            email: user.email,
            userType: user.userType,
            hasProfile: !!officer
          },
          cleaned: false
        });
      } else {
        return apiResponse({
          message: "No user found with this email",
          cleaned: false
        });
      }
    }

    if (action === 'cleanup_all_incomplete') {
      // Find all users without corresponding profiles
      const users = await User.find({ userType: 'officer' });
      let cleanedCount = 0;
      
      for (const user of users) {
        const officer = await Officer.findOne({ userId: user._id });
        if (!officer) {
          await User.findByIdAndDelete(user._id);
          cleanedCount++;
        }
      }
      
      return apiResponse({
        message: `Cleaned up ${cleanedCount} incomplete officer registrations`,
        cleanedCount
      });
    }

    return apiError("Invalid action. Use 'cleanup_user' or 'cleanup_all_incomplete'", 400);
    
  } catch (error: unknown) {
    console.error('Cleanup error:', error);
    return apiError("Cleanup failed", 500);
  }
}
