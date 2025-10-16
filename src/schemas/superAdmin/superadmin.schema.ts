import mongoose, { Schema, Document } from "mongoose";

export interface ISuperAdmin extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string; // always "SUPERADMIN"
  permissions: string[]; // e.g. ["CREATE_SCHOOL", "DELETE_USER", "VIEW_LOGS"]
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SuperAdminSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "SUPERADMIN" },
    permissions: {
      type: [String],
      default: [
        "MANAGE_SCHOOLS",
        "MANAGE_USERS",
        "MANAGE_CLASSES",
        "MANAGE_TEACHERS",
        "MANAGE_STUDENTS",
        "VIEW_AUDIT_LOGS",
        "SYSTEM_SETTINGS",
      ],
    },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISuperAdmin>("SuperAdmin", SuperAdminSchema);
