import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  farmerId: mongoose.Types.ObjectId;
  officerId: mongoose.Types.ObjectId;
  serviceId?: mongoose.Types.ObjectId;
  appointmentDate: Date;
  timeSlot: string;
  purpose: string;
  description: string;
  location: {
    type: 'office' | 'farm' | 'field';
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  attachments?: string[];
  meetingDetails?: {
    duration: number; // in minutes
    outcome?: string;
    actionItems?: string[];
    followUpRequired?: boolean;
    followUpDate?: Date;
  };
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema({
  farmerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  officerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true,
    enum: ['Consultation', 'Inspection', 'Training', 'Application', 'Follow-up', 'Emergency', 'Other']
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['office', 'farm', 'field'],
      required: true
    },
    address: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  notes: String,
  attachments: [String],
  meetingDetails: {
    duration: Number,
    outcome: String,
    actionItems: [String],
    followUpRequired: {
      type: Boolean,
      default: false
    },
    followUpDate: Date
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

AppointmentSchema.index({ appointmentDate: 1, officerId: 1 });
AppointmentSchema.index({ farmerId: 1, status: 1 });

export const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
