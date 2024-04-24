const express = require("express");
const multer = require("multer");
const router = express.Router();
const db = require("../db"); // replace with your db config file

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, uniqueSuffix + "." + extension);
  }
});
const upload = multer({ storage: storage });
const cpUpload = upload.any();

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM achievements");
    const achievements = result.rows.map(achievement => ({
      ...achievement,
      certificate: achievement.certificate ? `http://localhost:3001/${achievement.certificate}` : null,
      photos: achievement.photos.map(photo => `http://localhost:3001/${photo}`)
    }));
    res.status(200).json(achievements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", cpUpload, async (req, res) => {
  const { user_id, achievement_summary, date_of_achievement } = req.body;
  const certificateFile = req.files.find(file => file.fieldname === "certificate");
  const certificate = certificateFile ? certificateFile.path : null;

  const photoFiles = req.files.filter(file => file.fieldname.startsWith("photos"));
  const photos = photoFiles.length > 0 ? photoFiles.map(file => file.path) : [];

  if (!user_id || !achievement_summary || !date_of_achievement) {
    return res.status(400).json({ error: "User ID, achievement summary and date of achievement are required" });
  }
  try {
    const result = await db.query(`INSERT INTO achievements (user_id, achievement_summary, date_of_achievement, certificate, photos) VALUES ($1, $2, $3, $4, $5)`, [user_id, achievement_summary, new Date(date_of_achievement).toISOString().slice(0, 10), certificate, photos]);
    if (result.rowCount === 0) {
      return res.status(500).json({ error: "Error creating achievement" });
    }
    res.status(201).json({ message: "Achievement created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id/approve", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query("UPDATE achievements SET is_approved = true WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No achievement found with this ID" });
    }
    res.status(200).json({ message: "Achievement approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM achievements WHERE user_id = $1", [req.params.user_id]);
    if (result.rowCount === 0) {
      return res.json([{message:"No achievement Found",id:0}]);
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
