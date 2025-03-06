import express from "express";
import Class from "../schemas/class/class.schema";  // Importing the Class Schema
import School from "../schemas/school/school.schema"; // Import School Model (if needed to verify the school)
import Student from "../schemas/students/students.schema";  // Import Student Model (for managing students)

const router = express.Router();

/**
 * 🎓 Create a new class
 * @route POST /api/classes
 */
router.post("/", async (req, res) => {
    try {
        // Create a new class
        const { name, section, school, students, subjects } = req.body;

        // Check if the school exists
        const schoolExists = await School.findById(school);
        if (!schoolExists) {
            return res.status(400).json({ error: "School not found" });
        }

        // Check if all students exist
        const studentsExist = await Student.find({ '_id': { $in: students } });
        if (studentsExist.length !== students.length) {
            return res.status(400).json({ error: "Some students not found" });
        }

        // Create the class
        const newClass = new Class({ name, section, school, students, subjects });
        await newClass.save();
        res.status(201).json({ message: "Class created successfully", newClass });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: "Error creating class", details: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

/**
 * 📚 Get all classes
 * @route GET /api/classes
 */
router.get("/", async (req, res) => {
    try {
        const classes = await Class.find().populate("school students subjects");
        res.status(200).json(classes);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: "Error fetching classes", details: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

/**
 * 🏫 Get a class by ID
 * @route GET /api/classes/:id
 */
router.get("/:id", async (req, res) => {
    try {
        const classData = await Class.findById(req.params.id).populate("school students subjects");
        if (!classData) {
            return res.status(404).json({ error: "Class not found" });
        }
        res.status(200).json(classData);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: "Error fetching class", details: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

/**
 * ✏️ Update a class by ID
 * @route PUT /api/classes/:id
 */
router.put("/:id", async (req, res) => {
    try {
        const { name, section, school, students, subjects } = req.body;

        // Check if the school exists
        const schoolExists = await School.findById(school);
        if (!schoolExists) {
            return res.status(400).json({ error: "School not found" });
        }

        // Check if all students exist
        const studentsExist = await Student.find({ '_id': { $in: students } });
        if (studentsExist.length !== students.length) {
            return res.status(400).json({ error: "Some students not found" });
        }

        // Find the class and update
        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            { name, section, school, students, subjects },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        res.status(200).json({ message: "Class updated successfully", updatedClass });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: "Error updating class", details: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

/**
 * 🗑️ Delete a class by ID
 * @route DELETE /api/classes/:id
 */
router.delete("/:id", async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).json({ error: "Class not found" });
        }
        res.status(200).json({ message: "Class deleted successfully" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: "Error deleting class", details: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

/**
 * 🔄 Add students to a class
 * @route PATCH /api/classes/:id/students
 */
router.patch("/:id/students", async (req, res) => {
    try {
        const { students } = req.body;

        // Check if the students exist
        const studentsExist = await Student.find({ '_id': { $in: students } });
        if (studentsExist.length !== students.length) {
            return res.status(400).json({ error: "Some students not found" });
        }

        // Add students to the class
        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            { $push: { students: { $each: students } } },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        res.status(200).json({ message: "Students added to class", updatedClass });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: "Error adding students to class", details: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

export default router;
