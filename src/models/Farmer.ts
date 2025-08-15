import mongoose, { Document, Schema } from 'mongoose';

export interface IFarmer extends Document {
  userId: mongoose.Types.ObjectId;
  farmLocation: {
    address: string;
    district: string;
    province: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  farmSize: number; // in acres
  cropTypes: string[];
  farmingExperience: number; // in years
  governmentId: string;
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    branch: string;
  };
  profileImage?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FarmerSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  farmLocation: {
    address: { type: String, required: true },
    district: { type: String, required: true },
    province: { type: String, required: true },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  farmSize: {
    type: Number,
    required: true,
    min: 0
  },
  cropTypes: [{
    type: String,
    required: true
  }],
  farmingExperience: {
    type: Number,
    required: true,
    min: 0
  },
  governmentId: {
    type: String,
    required: true,
    unique: true
  },
  bankDetails: {
    accountNumber: String,
    bankName: String,
    branch: String
  },
  profileImage: String,
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for location-based queries
FarmerSchema.index({ 'farmLocation.coordinates': '2dsphere' });

export const Farmer = mongoose.models.Farmer || mongoose.model<IFarmer>('Farmer', FarmerSchema);
