import { NextRequest } from "next/server";
import { Appointment } from "@/models/Appointment";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse, validateRequired, parsePaginationParams, buildFilterQuery } from "@/lib/apiHelpers";

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const filter = buildFilterQuery(searchParams, ['status', 'priority', 'purpose']);

    // Filter by user type
    if (user.userType === 'farmer') {
      filter.farmerId = user.userId;
    } else if (user.userType === 'officer') {
      filter.officerId = user.userId;
    }

    const appointments = await Appointment.find(filter)
      .populate('farmerId', 'firstName lastName email phone')
      .populate('officerId', 'firstName lastName email phone')
      .populate('serviceId', 'title category')
      .sort({ appointmentDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Appointment.countDocuments(filter);

    return apiResponse({
      appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Appointments fetch error:', error);
    return apiError("Failed to fetch appointments", 500);
  }
});

export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const body = await req.json();
    const validationError = validateRequired(body, [
      'officerId', 'appointmentDate', 'timeSlot', 'purpose', 'description', 'location'
    ]);

    if (validationError) {
      return apiError(validationError, 400);
    }

    // Verify the officer exists
    const officer = await User.findOne({ _id: body.officerId, userType: 'officer' });
    if (!officer) {
      return apiError("Invalid officer selected", 400);
    }

    // Check for appointment conflicts
    const conflictingAppointment = await Appointment.findOne({
      officerId: body.officerId,
      appointmentDate: new Date(body.appointmentDate),
      timeSlot: body.timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (conflictingAppointment) {
      return apiError("Time slot is already booked", 400);
    }

    const appointment = new Appointment({
      ...body,
      farmerId: user.userId,
      createdBy: user.userId
    });

    await appointment.save();

    // Create notification for the officer
    const notification = new Notification({
      recipientId: body.officerId,
      senderId: user.userId,
      title: 'New Appointment Request',
      message: `You have a new appointment request from ${user.email}`,
      type: 'info',
      category: 'appointment',
      priority: 'medium',
      relatedTo: {
        entityType: 'appointment',
        entityId: appointment._id
      },
      actionRequired: true,
      actionUrl: `/officer/appointments/${appointment._id}`
    });

    await notification.save();

    return apiResponse({
      message: "Appointment booked successfully",
      appointment
    }, 201);

  } catch (error) {
    console.error('Appointment creation error:', error);
    return apiError("Failed to book appointment", 500);
  }
}, ['farmer']);
