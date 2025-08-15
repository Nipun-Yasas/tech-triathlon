import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  recipientId: mongoose.Types.ObjectId;
  senderId?: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'reminder';
  category: 'appointment' | 'service' | 'document' | 'system' | 'announcement';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  relatedTo?: {
    entityType: 'appointment' | 'service' | 'document' | 'application';
    entityId: mongoose.Types.ObjectId;
  };
  actionRequired: boolean;
  actionUrl?: string;
  isRead: boolean;
  readAt?: Date;
  scheduledFor?: Date;
  expiresAt?: Date;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema({
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'success', 'error', 'reminder'],
    default: 'info'
  },
  category: {
    type: String,
    enum: ['appointment', 'service', 'document', 'system', 'announcement'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  relatedTo: {
    entityType: {
      type: String,
      enum: ['appointment', 'service', 'document', 'application']
    },
    entityId: Schema.Types.ObjectId
  },
  actionRequired: {
    type: Boolean,
    default: false
  },
  actionUrl: String,
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  scheduledFor: Date,
  expiresAt: Date,
  metadata: Schema.Types.Mixed
}, {
  timestamps: true
});

NotificationSchema.index({ recipientId: 1, isRead: 1 });
NotificationSchema.index({ createdAt: -1 });
NotificationSchema.index({ expiresAt: 1 });

export const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
