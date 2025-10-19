import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  name: string;
  code?: string;
  profile_details?: mongoose.Schema.Types.ObjectId;
  email?: string;
  phone: string;
  gender: string;
  pic?: string;
  bio?: string;
  company?: Schema.Types.ObjectId;
  school?: Schema.Types.ObjectId;
  branch?: Schema.Types.ObjectId;
  permissions: Schema.Types.Mixed;
  isActive: boolean;
  type: "user" | "admin" | "superAdmin";
  userType: string; // student, teacher, staff, principal
  designation?: string;
  password?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  createdBy?: Schema.Types.ObjectId;
  guardianName?: string;
  guardianPhone?: string;
  joiningDate?: Date;
  department?: string;
  classAssigned?: string;
  section?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  loginAttempts?: number;
  lockUntil?: Date;
}

const UserSchema: Schema<UserInterface> = new Schema<UserInterface>(
  {
    name: { type: String, trim: true, required: true },
    code: { type: String, trim: true, index: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, required: true },
    pic: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    bio: { type: String, trim: true },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    school: { type: Schema.Types.ObjectId, ref: "School" },
    branch: { type: Schema.Types.ObjectId, ref: "Branch" },
    profile_details: { type: Schema.Types.ObjectId, ref: "ProfileDetails" },

    designation: { type: String, trim: true },
    department: { type: String, trim: true },
    joiningDate: { type: Date },
    classAssigned: { type: String, trim: true },
    section: { type: String, trim: true },

    guardianName: { type: String, trim: true },
    guardianPhone: { type: String, trim: true },

    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      country: { type: String, trim: true },
    },

    isActive: { type: Boolean, default: false },
    permissions: { type: Schema.Types.Mixed, default: {} },
    type: { type: String, enum: ["user", "admin", "superAdmin"], default: "user" },
    userType: { type: String },
    password: { type: String, trim: true },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    lastLogin: { type: Date },

    deletedAt: { type: Date },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
  }
);

// Auto-update updatedAt timestamp
UserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// // Auto-link school based on branch before saving
// UserSchema.pre("save", async function (next) {
//   try {
//     if (this.branch && !this.school) {
//       const BranchModel = mongoose.model("Branch"); // lazy load to avoid circular dependency
//       const branchDoc = await BranchModel.findById(this.branch).select("school");

//       if (branchDoc) {
//         this.school = branchDoc.school;
//       }
//     }
//     next();
//   } catch (error) {
//     console.error("Error linking school from branch:", error);
//     next(error);
//   }
// });

const UserModel = mongoose.model<UserInterface>("User", UserSchema);
export default UserModel;