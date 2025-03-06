import express from "express";
import School from "../schemas/school/school.schema"; // ✅ Updated Path

const router = express.Router();

/**
 * 🎓 Create a new school
 * @route POST /api/schools
 */
router.post("/", async (req, res) => {
    try {
        const school = new School(req.body);
        await school.save();
        res.status(201).json({ message: "School created successfully", school });
    } catch (error) {
        res.status(400).json({ error: "Error creating school", details: error });
    }
});

/**
 * 📌 Get all schools
 * @route GET /api/schools
 */
router.get("/", async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ error: "Error fetching schools", details: error });
    }
});

/**
 * 🏫 Get a school by ID
 * @route GET /api/schools/:id
 */
router.get("/:id", async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        if (!school) {
            return res.status(404).json({ error: "School not found" });
        }
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ error: "Error fetching school", details: error });
    }
});

/**
 * ✏️ Update school details
 * @route PUT /api/schools/:id
 */
router.put("/:id", async (req, res) => {
    try {
        const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!school) {
            return res.status(404).json({ error: "School not found" });
        }
        res.status(200).json({ message: "School updated successfully", school });
    } catch (error) {
        res.status(500).json({ error: "Error updating school", details: error });
    }
});

/**
 * 🗑️ Delete a school
 * @route DELETE /api/schools/:id
 */
router.delete("/:id", async (req, res) => {
    try {
        const school = await School.findByIdAndDelete(req.params.id);
        if (!school) {
            return res.status(404).json({ error: "School not found" });
        }
        res.status(200).json({ message: "School deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting school", details: error });
    }
});

export default router;
