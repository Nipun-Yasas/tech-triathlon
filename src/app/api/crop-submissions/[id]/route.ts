import { NextRequest } from "next/server";
import { CropSubmission } from "@/models/CropSubmission";
import { Notification } from "@/models/Notification";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse } from "@/lib/apiHelpers";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await dbConnect();

    const submission = await CropSubmission.findById(context.params.id)
      .populate('farmerId', 'firstName lastName email phone')
      .populate('officerId', 'firstName lastName email phone');

    if (!submission) {
      return apiError("Crop submission not found", 404);
    }

    return apiResponse(submission);

  } catch (error) {
    console.error('Crop submission fetch error:', error);
    return apiError("Failed to fetch crop submission", 500);
  }
}

export const PUT = withAuth(async (req: NextRequest, user, context) => {
  try {
    await dbConnect();

    const submission = await CropSubmission.findById(context?.params?.id);
    if (!submission) {
      return apiError("Crop submission not found", 404);
    }

    // Check permissions
    const isOwner = submission.farmerId.toString() === user.userId;
    const isOfficer = user.userType === 'officer';

    if (!isOwner && !isOfficer) {
      return apiError("Not authorized to update this submission", 403);
    }

    const body = await req.json();

    // Officers can update status, quality, pricing, transport details
    if (isOfficer) {
      const { status, quality, pricing, transportDetails, notes, rejectionReason } = body;
      
      if (status) {
        submission.status = status;
        
        // Assign officer if not already assigned
        if (!submission.officerId) {
          submission.officerId = user.userId;
        }
      }
      
      if (quality) submission.quality = quality;
      if (pricing) submission.pricing = pricing;
      if (transportDetails) submission.transportDetails = transportDetails;
      if (notes) submission.notes = notes;
      if (rejectionReason) submission.rejectionReason = rejectionReason;

      // Set actual pickup date when collected
      if (status === 'collected' && transportDetails?.arrivalTime) {
        submission.actualPickupDate = new Date(transportDetails.arrivalTime);
      }
    }

    // Farmers can only update before approval
    if (isOwner && submission.status === 'submitted') {
      const allowedFields = ['cropType', 'variety', 'quantity', 'harvestDate', 'expectedPickupDate', 'location'];
      allowedFields.forEach(field => {
        if (body[field]) submission[field] = body[field];
      });
    }

    await submission.save();

    // Create notification for status changes
    if (body.status) {
      const recipientId = isOfficer ? submission.farmerId : submission.officerId;
      const statusMessages = {
        approved: 'Your crop submission has been approved',
        scheduled: 'Pickup has been scheduled for your crop submission',
        collected: 'Your crop has been collected successfully',
        rejected: 'Your crop submission has been rejected'
      };

      if (statusMessages[body.status as keyof typeof statusMessages]) {
        const notification = new Notification({
          recipientId,
          senderId: user.userId,
          title: 'Crop Submission Update',
          message: statusMessages[body.status as keyof typeof statusMessages],
          type: body.status === 'rejected' ? 'warning' : 'info',
          category: 'document',
          priority: 'medium',
          relatedTo: {
            entityType: 'document',
            entityId: submission._id
          }
        });

        await notification.save();
      }
    }

    return apiResponse({
      message: "Crop submission updated successfully",
      submission
    });

  } catch (error) {
    console.error('Crop submission update error:', error);
    return apiError("Failed to update crop submission", 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest, user, context) => {
  try {
    await dbConnect();

    const submission = await CropSubmission.findById(context?.params?.id);
    if (!submission) {
      return apiError("Crop submission not found", 404);
    }

    // Only the farmer who created the submission can delete it
    if (submission.farmerId.toString() !== user.userId) {
      return apiError("Not authorized to delete this submission", 403);
    }

    // Can only delete submitted submissions
    if (submission.status !== 'submitted') {
      return apiError("Cannot delete processed submissions", 400);
    }

    await CropSubmission.findByIdAndDelete(context?.params?.id);

    return apiResponse({
      message: "Crop submission deleted successfully"
    });

  } catch (error) {
    console.error('Crop submission deletion error:', error);
    return apiError("Failed to delete crop submission", 500);
  }
});
