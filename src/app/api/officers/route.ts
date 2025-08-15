import { NextRequest } from "next/server";
import { User } from "@/models/User";
import { Officer } from "@/models/Officer";
import dbConnect from "@/lib/mongoose";
import { apiError, apiResponse, parsePaginationParams, buildFilterQuery, getUserFromRequest } from "@/lib/apiHelpers";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user = getUserFromRequest(req);
    const { searchParams } = new URL(req.url);

    // If user is authenticated and is an officer, show admin view
    if (user && user.userType === 'officer') {
      const { page, limit, skip } = parsePaginationParams(searchParams);
      
      // Build filter for officers
      const userFilter = { userType: 'officer', isActive: true };
      const officerFilter = buildFilterQuery(searchParams, ['department', 'workLocation.district', 'workLocation.province']);

      const search = searchParams.get('search');
      if (search) {
        userFilter.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      // Get officers with their user data
      const officers = await Officer.find(officerFilter)
        .populate({
          path: 'userId',
          match: userFilter,
          select: 'firstName lastName email phone createdAt'
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // Filter out officers whose user data didn't match
      const validOfficers = officers.filter(officer => officer.userId);

      const total = await Officer.countDocuments(officerFilter);

      return apiResponse({
        officers: validOfficers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } else {
      // Public endpoint for farmers to find officers for appointments
      const district = searchParams.get('district');
      const department = searchParams.get('department');

      const filter: Record<string, unknown> = { isActive: true };
      
      if (district) {
        filter.assignedDistricts = { $in: [district] };
      }
      
      if (department) {
        filter.department = department;
      }

      const officers = await Officer.find(filter)
        .populate('userId', 'firstName lastName email')
        .select('designation department workLocation specializations')
        .limit(20);

      return apiResponse({
        officers: officers.filter(officer => officer.userId)
      });
    }

  } catch (error) {
    console.error('Officers fetch error:', error);
    return apiError("Failed to fetch officers", 500);
  }
}
