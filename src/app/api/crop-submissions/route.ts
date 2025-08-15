import { NextRequest } from "next/server";
import { CropSubmission } from "@/models/CropSubmission";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse, validateRequired, parsePaginationParams, buildFilterQuery } from "@/lib/apiHelpers";

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const filter = buildFilterQuery(searchParams, ['status', 'cropType']);

    // Filter by user type
    if (user.userType === 'farmer') {
      filter.farmerId = user.userId;
    } else if (user.userType === 'officer') {
      // Officers can see all submissions or filter by assigned ones
      const assignedOnly = searchParams.get('assignedOnly');
      if (assignedOnly === 'true') {
        filter.officerId = user.userId;
      }
    }

    const submissions = await CropSubmission.find(filter)
      .populate('farmerId', 'firstName lastName email phone')
      .populate('officerId', 'firstName lastName email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await CropSubmission.countDocuments(filter);

    return apiResponse({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Crop submissions fetch error:', error);
    return apiError("Failed to fetch crop submissions", 500);
  }
});

export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const body = await req.json();
    const validationError = validateRequired(body, [
      'cropType', 'variety', 'quantity', 'unit', 'harvestDate', 
      'expectedPickupDate', 'location', 'pricing'
    ]);

    if (validationError) {
      return apiError(validationError, 400);
    }

    const submission = new CropSubmission({
      ...body,
      farmerId: user.userId,
      submissionDate: new Date()
    });

    await submission.save();

    // Create notification for officers in the area (simplified - you might want to implement geolocation-based assignment)
    const officers = await User.find({ userType: 'officer', isActive: true }).limit(5);
    
    for (const officer of officers) {
      const notification = new Notification({
        recipientId: officer._id,
        senderId: user.userId,
        title: 'New Crop Submission',
        message: `New ${body.cropType} submission requires review`,
        type: 'info',
        category: 'document',
        priority: 'medium',
        relatedTo: {
          entityType: 'document',
          entityId: submission._id
        },
        actionRequired: true,
        actionUrl: `/officer/crop-submission/${submission._id}`
      });

      await notification.save();
    }

    return apiResponse({
      message: "Crop submission created successfully",
      submission
    }, 201);

  } catch (error) {
    console.error('Crop submission creation error:', error);
    return apiError("Failed to create crop submission", 500);
  }
}, ['farmer']);
