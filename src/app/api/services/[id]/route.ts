import { NextRequest } from "next/server";
import { Service } from "@/models/Service";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse } from "@/lib/apiHelpers";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await dbConnect();

    const service = await Service.findById(context.params.id)
      .populate('createdBy', 'firstName lastName');

    if (!service) {
      return apiError("Service not found", 404);
    }

    return apiResponse(service);

  } catch (error) {
    console.error('Service fetch error:', error);
    return apiError("Failed to fetch service", 500);
  }
}

export const PUT = withAuth(async (req: NextRequest, user, context) => {
  try {
    await dbConnect();

    const service = await Service.findById(context?.params?.id);
    if (!service) {
      return apiError("Service not found", 404);
    }

    // Only the creator or officers can update
    if (service.createdBy.toString() !== user.userId && user.userType !== 'officer') {
      return apiError("Not authorized to update this service", 403);
    }

    const body = await req.json();
    Object.assign(service, body);
    await service.save();

    return apiResponse({
      message: "Service updated successfully",
      service
    });

  } catch (error) {
    console.error('Service update error:', error);
    return apiError("Failed to update service", 500);
  }
}, ['officer']);

export const DELETE = withAuth(async (req: NextRequest, user, context) => {
  try {
    await dbConnect();

    const service = await Service.findById(context?.params?.id);
    if (!service) {
      return apiError("Service not found", 404);
    }

    // Only the creator or officers can delete
    if (service.createdBy.toString() !== user.userId && user.userType !== 'officer') {
      return apiError("Not authorized to delete this service", 403);
    }

    await Service.findByIdAndDelete(context?.params?.id);

    return apiResponse({
      message: "Service deleted successfully"
    });

  } catch (error) {
    console.error('Service deletion error:', error);
    return apiError("Failed to delete service", 500);
  }
}, ['officer']);
