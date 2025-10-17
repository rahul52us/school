import mongoose, { Schema } from "mongoose";

const AuditLog = new Schema<any>(
  {
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    action : {
        type : String
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId
    },
    metaData : {
        type : mongoose.Schema.Types.Mixed
    },
    deletedAt: { type: Date },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date }
  }
);

const AuditLogSchema = mongoose.model<any>("AuditLog", AuditLog);
export default AuditLogSchema;