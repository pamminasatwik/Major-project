const express = require("express");
const session = require("express-session");
const passport = require("./controllers/authController");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/courses", coursesRoutes);
app.use("/announcement", announcementRoutes);
app.use("/achievement", achievementRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(3001, () => console.log("Server started on port 3001"));
