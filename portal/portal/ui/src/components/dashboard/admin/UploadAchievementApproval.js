import React, { useState, useEffect } from "react";
import axios from "axios";

function UploadAchievementApproval() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const response = await axios.get("http://localhost:3001/achievement");
      setAchievements(response.data);
    };

    fetchAchievements();
  }, []);

  const handleApproval = async id => {
    try {
      await axios.put(`http://localhost:3001/achievement/${id}/approve`);
      setAchievements(achievements.map(achievement => (achievement.id === id ? { ...achievement, is_approved: true } : achievement)));
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Achievement Approval</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Summary</th>
            <th className="px-4 py-2">Certificate</th>
            <th className="px-4 py-2">Photos</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map(achievement => (
            <tr key={achievement.id}>
              <td className="border px-4 py-2">{achievement.achievement_summary}</td>
              <td className="border px-4 py-2">
                <a href={`${achievement.certificate}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View Certificate
                </a>
              </td>
              <td className="border px-4 py-2">
                {achievement.photos.map((photo, index) => (
                  <img width="100" height="100" src={`${photo}`} alt={`achievement ${achievement.id} photo ${index + 1}`} key={index} className="mt-2" />
                ))}
              </td>
              <td className="border px-4 py-2">
                {achievement.is_approved ? (
                  <>Approved</>
                ) : (
                  <button onClick={() => handleApproval(achievement.id)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UploadAchievementApproval;
