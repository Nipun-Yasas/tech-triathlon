import mongoose, { Document, Schema } from 'mongoose';

export interface IOfficer extends Document {
  userId: mongoose.Types.ObjectId;
  employeeId: string;
  department: string;
  designation: string;
  assignedDistricts: string[];
  assignedProvinces: string[];
  workLocation: {
    office: string;
    address: string;
    district: string;
    province: string;
  };
  specializations: string[];
  qualifications: string[];
  experience: number; // in years
  contactInfo: {
    officePhone: string;
    mobilePhone: string;
    email: string;
  };
  profileImage?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OfficerSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true,
    enum: ['Agriculture', 'Livestock', 'Fisheries', 'Forestry', 'Research', 'Extension Services']
  },
  designation: {
    type: String,
    required: true
  },
  assignedDistricts: [{
    type: String,
    required: true
  }],
  assignedProvinces: [{
    type: String,
    required: true
  }],
  workLocation: {
    office: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
    province: { type: String, required: true }
  },
  specializations: [String],
  qualifications: [String],
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  contactInfo: {
    officePhone: String,
    mobilePhone: String,
    email: String
  },
  profileImage: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Officer = mongoose.models.Officer || mongoose.model<IOfficer>('Officer', OfficerSchema);
