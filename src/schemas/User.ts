import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  name: string;
  code?:string;
  profile_details?:mongoose.Schema.Types.ObjectId;
  email?: string;
  phone: string;
  gender: string;
  pic?: string;
  bio?: string;
  company?: Schema.Types.ObjectId;
  permissions: Schema.Types.Mixed;
  isActive: boolean;
  type: "user" | "admin" | "superAdmin";
  userType:String,  // student, teacher, staff, principle
  password?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  createdBy?: Schema.Types.ObjectId;
}

const UserSchema: Schema<UserInterface> = new Schema<UserInterface>(
  {
    name: { type: String, trim: true, required: true },
    code : {type : String, trim : true, index : true},
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, required: true },
    pic: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    bio: { type: String, trim: true },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    profile_details: { type: Schema.Types.ObjectId, ref: "ProfileDetails" },
    // System Controls
    isActive: { type: Boolean, default: false },
    permissions: { type: Schema.Types.Mixed, default: {} },
    type: { type: String, enum: ["user", "admin", "superAdmin"], default: "user" },
    userType: { type: String },
    password: { type: String, trim: true },

    // Audit & Hierarchy
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // for knowing who added the user
    lastLogin: { type: Date },

    // Soft Delete & Timestamps
    deletedAt: { type: Date },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date },
  }
);

const UserModel = mongoose.model<UserInterface>("User", UserSchema);
export default UserModel;