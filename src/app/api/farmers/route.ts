import { NextRequest } from "next/server";
import { User } from "@/models/User";
import { Farmer } from "@/models/Farmer";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse, parsePaginationParams, buildFilterQuery } from "@/lib/apiHelpers";

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    
    // Build filter for farmers
    const userFilter = { userType: 'farmer', isActive: true };
    const farmerFilter = buildFilterQuery(searchParams, ['farmLocation.district', 'farmLocation.province', 'isVerified']);

    const search = searchParams.get('search');
    if (search) {
      userFilter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Get farmers with their user data
    const farmers = await Farmer.find(farmerFilter)
      .populate({
        path: 'userId',
        match: userFilter,
        select: 'firstName lastName email phone createdAt'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Filter out farmers whose user data didn't match
    const validFarmers = farmers.filter(farmer => farmer.userId);

    const total = await Farmer.countDocuments(farmerFilter);

    return apiResponse({
      farmers: validFarmers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Farmers fetch error:', error);
    return apiError("Failed to fetch farmers", 500);
  }
}, ['officer']);
