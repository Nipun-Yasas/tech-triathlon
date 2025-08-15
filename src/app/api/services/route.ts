import { NextRequest } from "next/server";
import { Service } from "@/models/Service";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse, validateRequired, parsePaginationParams, buildFilterQuery } from "@/lib/apiHelpers";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const filter = buildFilterQuery(searchParams, ['category', 'department', 'isActive']);

    // Add text search if query parameter exists
    const search = searchParams.get('search');
    if (search) {
      filter.$text = { $search: search };
    }

    // Only show active services for public access
    filter.isActive = true;

    const services = await Service.find(filter)
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments(filter);

    return apiResponse({
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Services fetch error:', error);
    return apiError("Failed to fetch services", 500);
  }
}

export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const body = await req.json();
    const validationError = validateRequired(body, [
      'title', 'description', 'category', 'department', 'requiredDocuments', 'processingTime'
    ]);

    if (validationError) {
      return apiError(validationError, 400);
    }

    const service = new Service({
      ...body,
      createdBy: user.userId
    });

    await service.save();

    return apiResponse({
      message: "Service created successfully",
      service
    }, 201);

  } catch (error) {
    console.error('Service creation error:', error);
    return apiError("Failed to create service", 500);
  }
}, ['officer']);
