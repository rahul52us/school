import mongoose, { Document, Schema } from 'mongoose';

// Interface for School document
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

// Schema definition
const SchoolSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide school name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
    trim: true
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please provide street address'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please provide city'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'Please provide state/province'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'Please provide zip/postal code'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Please provide country'],
      trim: true
    }
  },
  contactEmail: {
    type: String,
    required: [true, 'Please provide contact email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ],
    unique: true,
    trim: true
  },
  contactPhone: {
    type: String,
    required: [true, 'Please provide contact phone number'],
    trim: true
  },
  principalName: {
    type: String,
    required: [true, 'Please provide principal name'],
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  foundedYear: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt field before saving
SchoolSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export model with interface type
export default mongoose.model<ISchool>('School', SchoolSchema);