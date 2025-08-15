import { NextRequest } from "next/server";
import { User } from "@/models/User";
import { Farmer } from "@/models/Farmer";
import { Officer } from "@/models/Officer";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse } from "@/lib/apiHelpers";

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const userData = await User.findById(user.userId).select('-password');
    if (!userData) {
      return apiError("User not found", 404);
    }

    let profileData = null;
    if (user.userType === 'farmer') {
      profileData = await Farmer.findOne({ userId: user.userId });
    } else if (user.userType === 'officer') {
      profileData = await Officer.findOne({ userId: user.userId });
    }

    return apiResponse({
      user: userData,
      profile: profileData
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return apiError("Failed to fetch profile", 500);
  }
});

export const PUT = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { firstName, lastName, phone, profileData } = body;

    // Update user basic info
    const userData = await User.findById(user.userId);
    if (!userData) {
      return apiError("User not found", 404);
    }

    if (firstName) userData.firstName = firstName;
    if (lastName) userData.lastName = lastName;
    if (phone) userData.phone = phone;

    await userData.save();

    // Update profile data
    if (profileData) {
      if (user.userType === 'farmer') {
        await Farmer.findOneAndUpdate(
          { userId: user.userId },
          profileData,
          { upsert: true, new: true }
        );
      } else if (user.userType === 'officer') {
        await Officer.findOneAndUpdate(
          { userId: user.userId },
          profileData,
          { upsert: true, new: true }
        );
      }
    }

    return apiResponse({
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return apiError("Failed to update profile", 500);
  }
});
