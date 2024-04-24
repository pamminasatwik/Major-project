import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Achievements({userId}) {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
        const response = await fetch(`http://localhost:3001/achievement/${userId}`);
        const data = await response.json();
        console.log(data);
        setAchievements(data)
    };
    fetchAchievements();
  }, [userId]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-indigo-500">Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center p-2 bg-indigo-100 rounded-lg">
            <div className="p-3 rounded-full bg-indigo-500 text-white">
              <span className="text-2xl font-semibold">{index + 1}</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{achievement.achievement_summary}</h3>
              <p className="text-sm text-gray-600">{achievement.date_of_achievement}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/dashboard/student/achievement-upload">upload achievement</Link>
    </div>
  );
}

export default Achievements;
