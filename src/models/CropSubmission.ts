import mongoose, { Document, Schema } from 'mongoose';

export interface ICropSubmission extends Document {
  farmerId: mongoose.Types.ObjectId;
  officerId?: mongoose.Types.ObjectId;
  cropType: string;
  variety: string;
  quantity: number;
  unit: 'kg' | 'tons' | 'bags' | 'crates';
  harvestDate: Date;
  submissionDate: Date;
  expectedPickupDate: Date;
  actualPickupDate?: Date;
  location: {
    farmName: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  quality: {
    grade: 'A' | 'B' | 'C' | 'Reject';
    moistureContent?: number;
    purityLevel?: number;
    notes?: string;
  };
  pricing: {
    basePrice: number;
    qualityBonus?: number;
    totalAmount: number;
    currency: string;
  };
  status: 'submitted' | 'approved' | 'scheduled' | 'collected' | 'rejected' | 'cancelled';
  images: string[];
  documents: string[];
  transportDetails?: {
    vehicleNumber: string;
    driverName: string;
    driverContact: string;
    departureTime?: Date;
    arrivalTime?: Date;
  };
  notes?: string;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CropSubmissionSchema: Schema = new Schema({
  farmerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  officerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cropType: {
    type: String,
    required: true
  },
  variety: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    enum: ['kg', 'tons', 'bags', 'crates'],
    required: true
  },
  harvestDate: {
    type: Date,
    required: true
  },
  submissionDate: {
    type: Date,
    required: true
  },
  expectedPickupDate: {
    type: Date,
    required: true
  },
  actualPickupDate: Date,
  location: {
    farmName: {
      type: String,
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
  quality: {
    grade: {
      type: String,
      enum: ['A', 'B', 'C', 'Reject'],
      default: 'B'
    },
    moistureContent: Number,
    purityLevel: Number,
    notes: String
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true,
      min: 0
    },
    qualityBonus: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'LKR'
    }
  },
  status: {
    type: String,
    enum: ['submitted', 'approved', 'scheduled', 'collected', 'rejected', 'cancelled'],
    default: 'submitted'
  },
  images: [String],
  documents: [String],
  transportDetails: {
    vehicleNumber: String,
    driverName: String,
    driverContact: String,
    departureTime: Date,
    arrivalTime: Date
  },
  notes: String,
  rejectionReason: String
}, {
  timestamps: true
});

CropSubmissionSchema.index({ farmerId: 1, status: 1 });
CropSubmissionSchema.index({ expectedPickupDate: 1 });

export const CropSubmission = mongoose.models.CropSubmission || mongoose.model<ICropSubmission>('CropSubmission', CropSubmissionSchema);
