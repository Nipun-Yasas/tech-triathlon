import { NextRequest } from "next/server";
import { User } from "@/models/User";
import { Appointment } from "@/models/Appointment";
import { CropSubmission } from "@/models/CropSubmission";
import { FertilizerDistribution } from "@/models/FertilizerDistribution";
import { Notification } from "@/models/Notification";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse } from "@/lib/apiHelpers";

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    if (user.userType === 'farmer') {
      // Farmer dashboard data
      const [
        totalAppointments,
        pendingAppointments,
        completedAppointments,
        totalCropSubmissions,
        pendingCropSubmissions,
        totalFertilizerRequests,
        pendingFertilizerRequests,
        unreadNotifications,
        recentAppointments,
        recentSubmissions
      ] = await Promise.all([
        Appointment.countDocuments({ farmerId: user.userId }),
        Appointment.countDocuments({ farmerId: user.userId, status: 'pending' }),
        Appointment.countDocuments({ farmerId: user.userId, status: 'completed' }),
        CropSubmission.countDocuments({ farmerId: user.userId }),
        CropSubmission.countDocuments({ farmerId: user.userId, status: 'submitted' }),
        FertilizerDistribution.countDocuments({ farmerId: user.userId }),
        FertilizerDistribution.countDocuments({ farmerId: user.userId, status: 'requested' }),
        Notification.countDocuments({ recipientId: user.userId, isRead: false }),
        Appointment.find({ farmerId: user.userId })
          .populate('officerId', 'firstName lastName')
          .sort({ createdAt: -1 })
          .limit(5),
        CropSubmission.find({ farmerId: user.userId })
          .sort({ createdAt: -1 })
          .limit(5)
      ]);

      return apiResponse({
        userType: 'farmer',
        stats: {
          totalAppointments,
          pendingAppointments,
          completedAppointments,
          totalCropSubmissions,
          pendingCropSubmissions,
          totalFertilizerRequests,
          pendingFertilizerRequests,
          unreadNotifications
        },
        recentActivity: {
          appointments: recentAppointments,
          submissions: recentSubmissions
        }
      });

    } else if (user.userType === 'officer') {
      // Officer dashboard data
      const [
        totalAppointments,
        pendingAppointments,
        todaysAppointments,
        totalCropSubmissions,
        pendingCropSubmissions,
        totalFertilizerRequests,
        pendingFertilizerRequests,
        totalFarmersAssigned,
        unreadNotifications,
        recentAppointments,
        recentSubmissions
      ] = await Promise.all([
        Appointment.countDocuments({ officerId: user.userId }),
        Appointment.countDocuments({ officerId: user.userId, status: 'pending' }),
        Appointment.countDocuments({
          officerId: user.userId,
          appointmentDate: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(23, 59, 59, 999))
          }
        }),
        CropSubmission.countDocuments({ officerId: user.userId }),
        CropSubmission.countDocuments({ status: 'submitted' }),
        FertilizerDistribution.countDocuments({ officerId: user.userId }),
        FertilizerDistribution.countDocuments({ status: 'requested' }),
        User.countDocuments({ userType: 'farmer', isActive: true }),
        Notification.countDocuments({ recipientId: user.userId, isRead: false }),
        Appointment.find({ officerId: user.userId })
          .populate('farmerId', 'firstName lastName')
          .sort({ createdAt: -1 })
          .limit(5),
        CropSubmission.find({ status: 'submitted' })
          .populate('farmerId', 'firstName lastName')
          .sort({ createdAt: -1 })
          .limit(5)
      ]);

      return apiResponse({
        userType: 'officer',
        stats: {
          totalAppointments,
          pendingAppointments,
          todaysAppointments,
          totalCropSubmissions,
          pendingCropSubmissions,
          totalFertilizerRequests,
          pendingFertilizerRequests,
          totalFarmersAssigned,
          unreadNotifications
        },
        recentActivity: {
          appointments: recentAppointments,
          submissions: recentSubmissions
        }
      });
    }

    return apiError("Invalid user type", 400);

  } catch (error) {
    console.error('Dashboard fetch error:', error);
    return apiError("Failed to fetch dashboard data", 500);
  }
});
