const express = require("express");
const router = express.Router();
const db = require("../db");

// Get attendance report for the past 7 days
router.get("/attendanceReport/:user_id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM attendance WHERE user_id = $1 AND attendance_date >= NOW() - INTERVAL '7 days'", [req.params.student_id]);

    res.status(200).json({ attendance: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/fullAttendanceReport", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM attendance");

    res.status(200).json({ attendance: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get full attendance report
router.get("/fullAttendanceReport/:user_id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM attendance WHERE user_id = $1", [req.params.user_id]);

    res.status(200).json({ attendance: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/markAttendance", async (req, res) => {
  const { user_id, course_id, attendance_date } = req.body;

  if (!user_id || !course_id || !attendance_date) {
    return res.status(400).json({ error: "Student ID, Course ID, and Attendance Date are required" });
  }

  try {
    const result = await db.query("INSERT INTO attendance (user_id, course_id, attendance_date) VALUES ($1, $2, $3) RETURNING *", [user_id, course_id, attendance_date]);
    
    // Check if the insertion was successful by examining the result
    if (result.rows && result.rows.length > 0) {
      // Assuming RETURNING * returns the inserted record, adjust as needed
      res.status(201).json({ message: "Attendance marked successfully", attendance: result.rows[0] });
    } else {
      throw new Error("Attendance marking failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
