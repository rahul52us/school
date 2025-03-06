import express from "express";
import Student from "../schemas/students/students.schema";

const router = express.Router();

// ✅ Create a new student
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ message: "Student created successfully", student });
    } catch (error) {
        res.status(500).json({ error: "Error creating student", details: error });
    }
});

// ✅ Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching students", details: error });
    }
});

// ✅ Get a student by ID
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: "Error fetching student", details: error });
    }
});

// ✅ Update student by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json({ message: "Student updated successfully", updatedStudent });
    } catch (error) {
        res.status(500).json({ error: "Error updating student", details: error });
    }
});

// ✅ Delete a student by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting student", details: error });
    }
});

export default router;
