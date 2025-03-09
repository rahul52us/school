import School from "../models/school.model";

export const registerSchoolService = async (name: string, contactEmail: string, contactPhone: string, address: object) => {
    // Check if school already exists
    const existingSchool = await School.findOne({ contactEmail });
    if (existingSchool) {
        throw new Error("School already registered");
    }

    // Create new school entry
    const newSchool = new School({ name, contactEmail, contactPhone, address });
    return await newSchool.save();
};
