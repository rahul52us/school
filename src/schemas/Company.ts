import mongoose, { Schema, Document } from "mongoose";

export interface CompanyInterface extends Document {
  name: string;
  domain?: string; // Unique domain for identification
  type: "customer" | "vendor" | "organization"; // Add organization type for schools
  parentCompany?: mongoose.Schema.Types.ObjectId; // Parent reference for branches
  company_ids?: mongoose.Schema.Types.ObjectId[]; // Optional linked companies
  company_details?: {
    address?: string;
    phone?: string;
    email?: string;
    gstin?: string;
    pan?: string;
  };
  createdBy?: mongoose.Schema.Types.ObjectId; // Who created this company (SuperAdmin)
  isActive: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const CompanySchema = new Schema<CompanyInterface>(
  {
    name: { type: String, required: true, trim: true },
    domain: { type: String, trim: true, unique: true, sparse: true },
    type: {
      type: String,
      enum: ["customer", "vendor", "organization"],
      default: "organization",
    },
    parentCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null, // if null → it's a main company
    },
    company_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
    company_details: {
      address: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true },
      gstin: { type: String, trim: true },
      pan: { type: String, trim: true },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// 🧠 Index for faster lookups
CompanySchema.index({ name: 1, domain: 1 });

const Company = mongoose.model<CompanyInterface>("Company", CompanySchema);
export default Company;