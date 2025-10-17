import mongoose, { Schema, Document } from "mongoose";

export interface UserCompanyInterface extends Document {
    type: "customer" | "vendor";
    company_ids?: Schema.Types.ObjectId[];
    parent : {
        type : mongoose.Schema.Types.ObjectId
    }
    isActive?:Boolean;
    company_details?: {
        name: string;
        phone: string;
        email: string;
        gstin?: string;
        pan: string;
    };
    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date
}

const UserCompanySchema: Schema<UserCompanyInterface> = new Schema<UserCompanyInterface>(
    {
        type: {
            type: String,
            enum: ["customer", "vendor"],
            default: "customer",
        },
        company_ids: [
            {
                type: Schema.Types.ObjectId,
                ref: "Company"
            }
        ],
        parent : {
            type : mongoose.Schema.Types.ObjectId
        },
        company_details: {
            name: { type: String, trim: true },
            address: { type: String, trim: true },
            phone: { type: String, trim: true },
            email: { type: String, trim: true },
            gstin: { type: String, trim: true },
            pan: { type: String, trim: true }
        },
        isActive:{
            type : Boolean,
            default : true
        },
        deletedAt: {
            type: Date
        },
        createdAt: {
            type: Date,
            default: new Date()
        },
        updatedAt: {
            type: Date
        }
    }
);

const Company = mongoose.model<UserCompanyInterface>("Company", UserCompanySchema);

export default Company;
