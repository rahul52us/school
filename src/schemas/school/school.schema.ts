import mongoose, { Document, Schema } from 'mongoose';

export interface ISchool extends Document {
  name: string;
  domain : string;
  address: [{
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }];
  email: string;
  phone: string;
  createdBy: mongoose.Schema.Types.ObjectId,
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
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  principalName: { type: String, required: true, trim: true },
  website: { type: String, trim: true },
  foundedYear: { type: Number },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const SchoolModel = mongoose.model<ISchool>('School', SchoolSchema);
export default SchoolModel;
