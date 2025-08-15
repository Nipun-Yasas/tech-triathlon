import { NextRequest } from "next/server";
import { FertilizerDistribution } from "@/models/FertilizerDistribution";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse, validateRequired, parsePaginationParams, buildFilterQuery } from "@/lib/apiHelpers";

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const filter = buildFilterQuery(searchParams, ['status', 'fertilizerType', 'season']);

    // Filter by user type
    if (user.userType === 'farmer') {
      filter.farmerId = user.userId;
    } else if (user.userType === 'officer') {
      // Officers can see all distributions or filter by assigned ones
      const assignedOnly = searchParams.get('assignedOnly');
      if (assignedOnly === 'true') {
        filter.officerId = user.userId;
      }
    }

    const distributions = await FertilizerDistribution.find(filter)
      .populate('farmerId', 'firstName lastName email phone')
      .populate('officerId', 'firstName lastName email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await FertilizerDistribution.countDocuments(filter);

    return apiResponse({
      distributions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Fertilizer distributions fetch error:', error);
    return apiError("Failed to fetch fertilizer distributions", 500);
  }
});

export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const body = await req.json();
    const validationError = validateRequired(body, [
      'officerId', 'fertilizerType', 'brand', 'quantity', 'unit', 
      'distributionDate', 'season', 'cropPurpose', 'location', 'pricing'
    ]);

    if (validationError) {
      return apiError(validationError, 400);
    }

    // Verify the officer exists
    const officer = await User.findOne({ _id: body.officerId, userType: 'officer' });
    if (!officer) {
      return apiError("Invalid officer selected", 400);
    }

    const distribution = new FertilizerDistribution({
      ...body,
      farmerId: user.userId,
      requestDate: new Date()
    });

    await distribution.save();

    // Create notification for the officer
    const notification = new Notification({
      recipientId: body.officerId,
      senderId: user.userId,
      title: 'New Fertilizer Request',
      message: `New fertilizer distribution request for ${body.fertilizerType}`,
      type: 'info',
      category: 'service',
      priority: 'medium',
      relatedTo: {
        entityType: 'service',
        entityId: distribution._id
      },
      actionRequired: true,
      actionUrl: `/officer/fertilizer-distribution/${distribution._id}`
    });

    await notification.save();

    return apiResponse({
      message: "Fertilizer distribution request created successfully",
      distribution
    }, 201);

  } catch (error) {
    console.error('Fertilizer distribution creation error:', error);
    return apiError("Failed to create fertilizer distribution request", 500);
  }
}, ['farmer']);
