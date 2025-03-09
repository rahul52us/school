import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactEmail: { type: String, required: true, unique: true },
    contactPhone: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
    }
}, { timestamps: true });

const School = mongoose.model("School", schoolSchema);
export default School;

