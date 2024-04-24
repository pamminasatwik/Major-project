import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard";
import AdminDashbord from "./components/dashboard/admin";
import AdminStudent from "./components/dashboard/student";
import Attendance from "./components/dashboard/admin/Attendance";
import AttendanceSummary from "./components/dashboard/admin/AttendanceSummary";
import NewCourseForm from "./components/dashboard/admin/NewCourseForm";
import CourseApproval from "./components/dashboard/admin/CourseApproval";
import NewAnnouncements from "./components/dashboard/admin/NewAnnouncements";
import UploadAchievementApproval from "./components/dashboard/admin/UploadAchievementApproval";
import AchievementUpload from "./components/dashboard/student/AchievementUpload";
import CourseRegistration from "./components/dashboard/student/CourseRegistration";
import CourseDetail from './components/dashboard/student/CourseDetail'; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen  bg-gray-100">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashbord />} />
            <Route path="/dashboard/admin/attendance" element={<Attendance />} />
            <Route path="/dashboard/admin/attendance-summary" element={<AttendanceSummary />} />
            <Route path="/dashboard/admin/new-course-registration" element={<NewCourseForm />} />
            <Route path="/dashboard/admin/achievement-upload-approval" element={<UploadAchievementApproval />} />
            <Route path="/dashboard/admin/new-course-registration-approval" element={<CourseApproval />} />
            <Route path="/dashboard/admin/announcements" element={<NewAnnouncements />} />
            <Route path="/dashboard/student" element={<AdminStudent />} />
            <Route path="/dashboard/student/achievement-upload" element={<AchievementUpload />} />
            <Route path="/course-form/:id" element={<CourseRegistration />} />
            <Route path="/course/:id" element={<CourseDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
