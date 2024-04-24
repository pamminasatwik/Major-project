const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/enroll", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM student_courses");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/enroll/:id", async (req, res) => {
  const course_id = req.params.id;
  if (!course_id) {
    return res.status(400).json({ error: "Course ID are required" });
  }

  try {
    const { rows } = await db.query("SELECT * FROM student_courses WHERE course_id = $1", [course_id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/enroll", async (req, res) => {
  const { student_id, course_ids } = req.body; // Expect course_ids to be an array

  if (!student_id || !course_ids || !Array.isArray(course_ids) || course_ids.length === 0) {
    return res.status(400).json({ error: "Student ID and Course IDs are required, and Course IDs should be an array" });
  }

  try {

    const values = course_ids.map(course_id => `('${student_id}', '${course_id}')`).join(",");
    const query = `INSERT INTO student_courses (user_id, course_id) VALUES ${values}`;
    await db.query(query);
    res.status(201).json({ message: "Student enrolled in courses successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// Create a course
router.post("/", async (req, res) => {
  const { sem, courses } = req.body;
  if (!sem || !courses || !Array.isArray(courses)) {
    return res.status(400).json({ error: "Semester and courses array are required" });
  }

  try {
    for (let course of courses) {
      let { course_id, course_name, course_credit, course_eligibility, course_type, faculty_id, available_seats, course_syllabus } = course;

      if (!course_id || !course_name || !course_credit || !course_eligibility || !course_type || !faculty_id || !available_seats || !course_syllabus) {
        return res.status(400).json({ error: "All fields are required in each course" });
      }
      if (typeof course_credit !== "number" || typeof course_eligibility !== "number" || typeof available_seats !== "number") {
        course_credit = parseInt(course_credit, 10);
        course_eligibility = parseInt(course_eligibility, 10);
        available_seats = parseInt(available_seats, 10);
      }
      await db.query(`INSERT INTO courses (sem, course_id, course_name, course_credit, course_eligibility, course_type, faculty_id, available_seats, course_syllabus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [sem, course_id, course_name, course_credit, course_eligibility, course_type, faculty_id, available_seats, course_syllabus]);
    }

    res.status(201).json({ message: "Courses created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM courses");
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No courses found" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a course by id
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM courses WHERE course_id = $1", [req.params.id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/updateSeats/:id", async (req, res) => {
  const { available_seats } = req.body;

  if (available_seats === undefined || typeof available_seats !== "number") {
    return res.status(400).json({ error: "Available seats is required and must be a number" });
  }

  try {
    await db.query("UPDATE courses SET available_seats = $1 WHERE course_id = $2", [available_seats, req.params.id]);
    res.status(200).json({ message: "Available seats updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/seats/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT available_seats FROM courses WHERE course_id = $1", [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ available_seats: rows[0].available_seats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/sem/:id", async (req, res) => {
  const sem = req.params.id;
  try {
    const { rows } = await db.query("SELECT * FROM courses WHERE sem = $1", [sem]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a course
router.put("/:id", async (req, res) => {
  const { course_name, course_credit, course_eligibility, course_type, faculty_id, available_seats, course_syllabus } = req.body;
  try {
    const result = await db.query(`UPDATE courses SET course_name = $1, course_credit = $2, course_eligibility = $3, course_type = $4, faculty_id = $5, available_seats = $6, course_syllabus = $7 WHERE course_id = $8`, [course_name, course_credit, course_eligibility, course_type, faculty_id, available_seats, course_syllabus, req.params.id]);
    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a course
router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM courses WHERE course_id = $1", [req.params.id]);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
