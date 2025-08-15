import mongoose, { Document, Schema } from 'mongoose';

export interface IFertilizerDistribution extends Document {
  farmerId: mongoose.Types.ObjectId;
  officerId: mongoose.Types.ObjectId;
  fertilizerType: string;
  brand: string;
  quantity: number;
  unit: 'kg' | 'bags' | 'tons';
  distributionDate: Date;
  season: string;
  cropPurpose: string;
  location: {
    distributionCenter: string;
    address: string;
  };
  pricing: {
    unitPrice: number;
    subsidyAmount: number;
    farmerPayment: number;
    totalValue: number;
  };
  status: 'requested' | 'approved' | 'distributed' | 'completed' | 'cancelled';
  requestDate: Date;
  approvalDate?: Date;
  distributionDetails?: {
    batchNumber: string;
    manufacturingDate: Date;
    expiryDate: Date;
    qualityCertificate: string;
  };
  farmerAcknowledgment?: {
    receivedDate: Date;
    signature: string;
    feedback?: string;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FertilizerDistributionSchema: Schema = new Schema({
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
  fertilizerType: {
    type: String,
    required: true
  },
  brand: {
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
    enum: ['kg', 'bags', 'tons'],
    required: true
  },
  distributionDate: {
    type: Date,
    required: true
  },
  season: {
    type: String,
    required: true
  },
  cropPurpose: {
    type: String,
    required: true
  },
  location: {
    distributionCenter: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  pricing: {
    unitPrice: {
      type: Number,
      required: true,
      min: 0
    },
    subsidyAmount: {
      type: Number,
      required: true,
      min: 0
    },
    farmerPayment: {
      type: Number,
      required: true,
      min: 0
    },
    totalValue: {
      type: Number,
      required: true,
      min: 0
    }
  },
  status: {
    type: String,
    enum: ['requested', 'approved', 'distributed', 'completed', 'cancelled'],
    default: 'requested'
  },
  requestDate: {
    type: Date,
    required: true
  },
  approvalDate: Date,
  distributionDetails: {
    batchNumber: String,
    manufacturingDate: Date,
    expiryDate: Date,
    qualityCertificate: String
  },
  farmerAcknowledgment: {
    receivedDate: Date,
    signature: String,
    feedback: String
  },
  notes: String
}, {
  timestamps: true
});

FertilizerDistributionSchema.index({ farmerId: 1, status: 1 });
FertilizerDistributionSchema.index({ distributionDate: 1 });

export const FertilizerDistribution = mongoose.models.FertilizerDistribution || mongoose.model<IFertilizerDistribution>('FertilizerDistribution', FertilizerDistributionSchema);
