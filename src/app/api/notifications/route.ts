import { NextRequest } from "next/server";
import { Notification } from "@/models/Notification";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse, parsePaginationParams } from "@/lib/apiHelpers";

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const isRead = searchParams.get('isRead');

    const filter: Record<string, unknown> = { recipientId: user.userId };
    
    if (isRead !== null) {
      filter.isRead = isRead === 'true';
    }

    // Remove expired notifications
    await Notification.deleteMany({
      expiresAt: { $lt: new Date() }
    });

    const notifications = await Notification.find(filter)
      .populate('senderId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments(filter);
    const unreadCount = await Notification.countDocuments({
      recipientId: user.userId,
      isRead: false
    });

    return apiResponse({
      notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Notifications fetch error:', error);
    return apiError("Failed to fetch notifications", 500);
  }
});

export const PUT = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { notificationIds, markAsRead } = body;

    if (!notificationIds || !Array.isArray(notificationIds)) {
      return apiError("Invalid notification IDs", 400);
    }

    const updateData: Record<string, unknown> = {
      isRead: markAsRead !== false
    };

    if (markAsRead !== false) {
      updateData.readAt = new Date();
    }

    await Notification.updateMany(
      {
        _id: { $in: notificationIds },
        recipientId: user.userId
      },
      updateData
    );

    return apiResponse({
      message: `Notifications marked as ${markAsRead !== false ? 'read' : 'unread'}`
    });

  } catch (error) {
    console.error('Notifications update error:', error);
    return apiError("Failed to update notifications", 500);
  }
});
