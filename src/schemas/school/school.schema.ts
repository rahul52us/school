import mongoose, { Document, Schema } from 'mongoose';

export interface ISchool extends Document {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contactEmail: string;
  contactPhone: string;
  principalName: string;
  website?: string;
  foundedYear?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SchoolSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  address: {
    type: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    required: true
  },
  contactEmail: { type: String, required: true, trim: true },
  contactPhone: { type: String, required: true, trim: true },
  principalName: { type: String, required: true, trim: true },
  website: { type: String, trim: true },
  foundedYear: { type: Number },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// `updatedAt` update karne ke liye middleware
SchoolSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Model export fix
const SchoolModel = mongoose.models.School || mongoose.model<ISchool>('School', SchoolSchema);
export default SchoolModel;
