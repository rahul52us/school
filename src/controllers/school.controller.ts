import { Request, Response } from "express";
import School from "../models/school.model";

export const registerSchool = async (req: Request, res: Response) => {
    try {
        console.log("📢 Received Request Body:", req.body); 
        const { name, contactEmail, contactPhone, address } = req.body;

        const existingSchool = await School.findOne({ contactEmail });  
        if (existingSchool) {
            return res.status(400).json({ message: "School already registered" });
        }

        const newSchool = new School({ name, contactEmail, contactPhone, address });
        await newSchool.save();

        res.status(201).json({ message: "School registered successfully" });
    } catch (error) {
        console.error("❌ Error registering school:", error); // Debugging log
        res.status(500).json({ message: "Server error", error });
    }
};
