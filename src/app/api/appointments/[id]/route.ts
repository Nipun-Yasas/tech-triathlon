import { NextRequest } from "next/server";
import { Appointment } from "@/models/Appointment";
import { Notification } from "@/models/Notification";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse } from "@/lib/apiHelpers";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await dbConnect();

    const appointment = await Appointment.findById(context.params.id)
      .populate('farmerId', 'firstName lastName email phone')
      .populate('officerId', 'firstName lastName email phone')
      .populate('serviceId', 'title category');

    if (!appointment) {
      return apiError("Appointment not found", 404);
    }

    return apiResponse(appointment);

  } catch (error) {
    console.error('Appointment fetch error:', error);
    return apiError("Failed to fetch appointment", 500);
  }
}

export const PUT = withAuth(async (req: NextRequest, user, context) => {
  try {
    await dbConnect();

    const appointment = await Appointment.findById(context?.params?.id);
    if (!appointment) {
      return apiError("Appointment not found", 404);
    }

    // Check permissions
    const isOwner = appointment.farmerId.toString() === user.userId;
    const isAssignedOfficer = appointment.officerId.toString() === user.userId;

    if (!isOwner && !isAssignedOfficer) {
      return apiError("Not authorized to update this appointment", 403);
    }

    const body = await req.json();
    const { status, notes, meetingDetails } = body;

    // Update appointment
    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;
    if (meetingDetails) appointment.meetingDetails = meetingDetails;

    await appointment.save();

    // Create notification for status changes
    if (status) {
      const recipientId = isAssignedOfficer ? appointment.farmerId : appointment.officerId;
      const statusMessages = {
        confirmed: 'Your appointment has been confirmed',
        cancelled: 'Your appointment has been cancelled',
        completed: 'Your appointment has been completed',
        rescheduled: 'Your appointment has been rescheduled'
      };

      if (statusMessages[status as keyof typeof statusMessages]) {
        const notification = new Notification({
          recipientId,
          senderId: user.userId,
          title: 'Appointment Update',
          message: statusMessages[status as keyof typeof statusMessages],
          type: status === 'cancelled' ? 'warning' : 'info',
          category: 'appointment',
          priority: 'medium',
          relatedTo: {
            entityType: 'appointment',
            entityId: appointment._id
          }
        });

        await notification.save();
      }
    }

    return apiResponse({
      message: "Appointment updated successfully",
      appointment
    });

  } catch (error) {
    console.error('Appointment update error:', error);
    return apiError("Failed to update appointment", 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest, user, context) => {
  try {
    await dbConnect();

    const appointment = await Appointment.findById(context?.params?.id);
    if (!appointment) {
      return apiError("Appointment not found", 404);
    }

    // Only the farmer who created the appointment can delete it
    if (appointment.farmerId.toString() !== user.userId) {
      return apiError("Not authorized to delete this appointment", 403);
    }

    // Can only delete pending appointments
    if (appointment.status !== 'pending') {
      return apiError("Cannot delete confirmed or completed appointments", 400);
    }

    await Appointment.findByIdAndDelete(context?.params?.id);

    // Notify the officer
    const notification = new Notification({
      recipientId: appointment.officerId,
      senderId: user.userId,
      title: 'Appointment Cancelled',
      message: 'An appointment has been cancelled by the farmer',
      type: 'warning',
      category: 'appointment',
      priority: 'medium'
    });

    await notification.save();

    return apiResponse({
      message: "Appointment cancelled successfully"
    });

  } catch (error) {
    console.error('Appointment deletion error:', error);
    return apiError("Failed to cancel appointment", 500);
  }
});
