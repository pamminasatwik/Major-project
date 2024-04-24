import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function AchievementUpload() {
  const [certificateFile, setCertificateFile] = useState(null);
  const [achievementPhotos, setAchievementPhotos] = useState([]); // Array for multiple photos
  const [summary, setSummary] = useState("");
  const [achievementDate, setAchievementDate] = useState(null);
  const [success, setSuccess] = useState(false); // New state variable for success status

  const handleDateChange = date => setAchievementDate(date);

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData();
    const data = JSON.parse(localStorage.getItem("data"))
    formData.append("user_id", data.user.user_id);
    formData.append("achievement_summary", summary);
    formData.append("date_of_achievement", achievementDate);
    formData.append("certificate", certificateFile);
    achievementPhotos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo);
    });

    try {
      const response = await axios.post("http://localhost:3001/achievement", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data);
      setCertificateFile(null);
      setAchievementPhotos([]);
      setSummary("");
      setAchievementDate(null);
      setSuccess(true);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Upload Achievement</h1>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your achievement has been uploaded.</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <div>
          <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
            Certificate (PDF):
          </label>
          <input type="file" id="certificate" accept="application/pdf" onChange={event => setCertificateFile(event.target.files[0])} className="mt-2 w-full py-2 px-3 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
            Photos:
          </label>
          <input type="file" id="photos" accept="image/*" multiple onChange={event => setAchievementPhotos([...event.target.files])} className="mt-2 w-full py-2 px-3 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Achievement Summary:
          </label>
          <textarea id="summary" rows="4" value={summary} onChange={e => setSummary(e.target.value)} className="mt-2 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="achievement-date" className="block text-sm font-medium text-gray-700">
            Date of Achievement:
          </label>
          <DatePicker id="achievement-date" selected={achievementDate} onChange={handleDateChange} className="mt-2 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Upload Achievement
        </button>
      </form>
    </div>
  );
}

export default AchievementUpload;
