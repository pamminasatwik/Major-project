const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

router.post("/login", async (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    const user = result.rows[0];
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(user, "secret");
      res.status(200).json({ message: "Login successful", token, user });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/signup", async (req, res) => {
  let { user_id, first_name, last_name, password, role } = req.body;
  if (!user_id || !first_name || !last_name || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (role === undefined) {
      role = "student";
    }
    const email = role == "student" ? user_id + "@cmrcet.ac.in" : user_id + "@cmrcet.org";
    const results = await db.query("INSERT INTO users (user_id, email, first_name, last_name, password, role) VALUES ($1, $2, $3, $4, $5, $6)", [user_id, email, first_name, last_name, hashedPassword, role]);
    res.status(200).send({ message: "Successfully Registered" });
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      res.status(409).send({ message: `${user_id} already exists` });
    } else {
      res.status(500).send({ message: "An error occurred" });
    }
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("sid");
    res.redirect("/");
  });
});

module.exports = router;
