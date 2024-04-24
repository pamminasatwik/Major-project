import React from "react";

function Statistics() {
  // Sample statistics data (fetch from an API in a real app)
  const stats = [
    { title: "Finished Courses", value: 12 },
    { title: "Hours Learned", value: 85 },
    { title: "Skills Achieved", value: 20 },
    { title: "Credits Earned", value: 150 }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-indigo-500">Total Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map(stat => (
          <div key={stat.title} className="flex items-center justify-between bg-indigo-100 p-4 rounded-lg">
            <p className="text-gray-800">{stat.title}</p>
            <p className="font-bold text-lg text-indigo-500">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
