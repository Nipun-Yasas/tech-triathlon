import mongoose, { Document, Schema } from 'mongoose';

export interface IOfficer extends Document {
  userId: mongoose.Types.ObjectId;
  employeeId?: string; // Make optional
  department: string;
  designation?: string; // Make optional
  assignedDistricts?: string[]; // Make optional
  assignedProvinces?: string[]; // Make optional
  workLocation?: { // Make optional
    office?: string;
    address?: string;
    district?: string;
    province?: string;
  };
  specializations: string[];
  qualifications: string[];
  experience?: number; // Make optional
  contactInfo: {
    officePhone?: string;
    mobilePhone?: string;
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
    default: '',
    sparse: true // Only enforce uniqueness if value exists and not empty
  },
  department: {
    type: String,
    required: true,
    enum: ['Agriculture', 'Livestock', 'Fisheries', 'Forestry', 'Research', 'Extension Services']
  },
  designation: {
    type: String,
    default: ''
  },
  assignedDistricts: {
    type: [String],
    default: []
  },
  assignedProvinces: {
    type: [String], 
    default: []
  },
  workLocation: {
    office: { type: String, default: '' },
    address: { type: String, default: '' },
    district: { type: String, default: '' },
    province: { type: String, default: '' }
  },
  specializations: [String],
  qualifications: [String],
  experience: {
    type: Number,
    required: false, // Make optional during registration
    min: 0,
    default: 0
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
