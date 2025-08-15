import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  category: string;
  department: string;
  requiredDocuments: string[];
  processingTime: string;
  fee: number;
  eligibilityCriteria: string[];
  applicationProcess: string[];
  contactInfo: {
    office: string;
    phone: string;
    email: string;
  };
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Subsidy', 'License', 'Certification', 'Training', 'Equipment', 'Financial', 'Advisory', 'Other']
  },
  department: {
    type: String,
    required: true
  },
  requiredDocuments: [{
    type: String,
    required: true
  }],
  processingTime: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    default: 0,
    min: 0
  },
  eligibilityCriteria: [String],
  applicationProcess: [String],
  contactInfo: {
    office: String,
    phone: String,
    email: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

ServiceSchema.index({ title: 'text', description: 'text', category: 1 });

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
