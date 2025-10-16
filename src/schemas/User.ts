import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  name: string;
  email?: string;
  phone: string;
  gender: string;
  pic?: string;
  bio?: string;
  company?: Schema.Types.ObjectId;
  permissions: Schema.Types.Mixed;
  isActive: boolean;
  type: "user" | "admin" | "superAdmin";
  password?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  createdBy?: Schema.Types.ObjectId;
  roleDescription?: string;
  auditLogs?: {
    action: string;
    entity: string;
    entityId: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }[];
}

const UserSchema: Schema<UserInterface> = new Schema<UserInterface>(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, required: true },
    pic: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    bio: { type: String, trim: true },
    company: { type: Schema.Types.ObjectId, ref: "Company" },

    // System Controls
    isActive: { type: Boolean, default: true },
    permissions: { type: Schema.Types.Mixed, default: {} },
    type: { type: String, enum: ["user", "admin", "superAdmin"], default: "user" },
    password: { type: String, trim: true },

    // Audit & Hierarchy
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // for knowing who added the user
    roleDescription: { type: String, trim: true }, // optional field for superadmins to define role info
    lastLogin: { type: Date },
    auditLogs: [
      {
        action: { type: String, required: true }, // e.g., "CREATE_SCHOOL", "DELETE_USER"
        entity: { type: String, required: true }, // e.g., "School", "User", "Class"
        entityId: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        metadata: { type: Schema.Types.Mixed },
      },
    ],

    // Soft Delete & Timestamps
    deletedAt: { type: Date },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date },
  }
);

const UserModel = mongoose.model<UserInterface>("User", UserSchema);
export default UserModel;
