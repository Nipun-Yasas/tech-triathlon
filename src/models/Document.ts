import mongoose, { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  description: string;
  category: string;
  type: 'application' | 'certificate' | 'license' | 'report' | 'form' | 'other';
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: mongoose.Types.ObjectId;
  relatedTo?: {
    entityType: 'appointment' | 'service' | 'farmer' | 'officer';
    entityId: mongoose.Types.ObjectId;
  };
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  visibility: 'public' | 'private' | 'restricted';
  tags: string[];
  metadata: {
    downloadCount: number;
    lastDownloaded?: Date;
    expiryDate?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema = new Schema({
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
    enum: ['Application', 'Certificate', 'License', 'Report', 'Form', 'Guide', 'Policy', 'Other']
  },
  type: {
    type: String,
    enum: ['application', 'certificate', 'license', 'report', 'form', 'other'],
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  relatedTo: {
    entityType: {
      type: String,
      enum: ['appointment', 'service', 'farmer', 'officer']
    },
    entityId: Schema.Types.ObjectId
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'processing'],
    default: 'pending'
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'restricted'],
    default: 'private'
  },
  tags: [String],
  metadata: {
    downloadCount: {
      type: Number,
      default: 0
    },
    lastDownloaded: Date,
    expiryDate: Date
  }
}, {
  timestamps: true
});

DocumentSchema.index({ title: 'text', description: 'text', tags: 1 });
DocumentSchema.index({ uploadedBy: 1, category: 1 });

export const Document = mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);
