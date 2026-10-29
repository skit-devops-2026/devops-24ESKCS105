
import express from "express";
import Student from "../models/Student.js";

const router = express.Router();


// Get all student profiles
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({
      createdAt: -1
    });

    res.json(students);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Create a new student profile
router.post("/", async (req, res) => {
  try {
    const studentData = req.body;

    const newStudent = await Student.create(studentData);

    res.status(201).json(newStudent);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});


// Update an existing student profile
router.put("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedData = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(updatedStudent);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});


// Delete a student profile
router.delete("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(
      studentId
    );

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({
      message: "Student deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});


// Export the routes
export default router;
