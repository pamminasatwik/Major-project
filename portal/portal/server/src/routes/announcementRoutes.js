const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { message, expiry_date } = req.body;
  if (!message || !expiry_date) {
    return res.status(400).json({ error: "Both message and expiry date are required" });
  }
  try {
    const result = await db.query(`INSERT INTO announcements (message, expiry_date) VALUES ($1, $2)`, [message, expiry_date]);
    if (result.rowCount === 0) {
      return res.status(500).json({ error: "Failed to create announcement" });
    }
    res.status(201).json({ message: "Announcement created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM announcements");
    if (result.rowCount === 0) return res.json([{message:"No Announcements Found",announcement_id:0}]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get an announcement by id
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM announcements WHERE announcement_id = $1", [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "No announcements found" });
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update an announcement
router.put("/:id", async (req, res) => {
  const { message, expiry_date } = req.body;
  try {
    const result = await db.query(`UPDATE announcements SET message = $1, expiry_date = $2 WHERE announcement_id = $3`, [message, expiry_date, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "No announcements found" });
    res.status(200).json({ message: "Announcement updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete an announcement
router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM announcements WHERE announcement_id = $1", [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "No announcements found" });
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
