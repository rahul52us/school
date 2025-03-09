import { Request, Response } from "express";
import { registerSchoolService } from "../services/school.service";

export const registerSchool = async (req: Request, res: Response) => {
    try {
        console.log("📢 Received Request Body:", req.body); // Debug log

        const { name, contactEmail, contactPhone, address } = req.body;
        const school = await registerSchoolService(name, contactEmail, contactPhone, address);

        res.status(201).json({ message: "School registered successfully", school });
    } catch (error: any) {
        console.error("❌ Error registering school:", error.message); // Debug log
        res.status(400).json({ message: error.message });
    }
};
