import React, { useState, useEffect } from "react";


function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
        const response = await fetch("http://localhost:3001/announcement");
        const data = await response.json();
        setAnnouncements(data)
    };
    fetchAnnouncements();
  }, []);


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-indigo-500">Announcements</h2>
      <ul className="divide-y divide-gray-200">
        {announcements.map(item => (
          <li key={item.announcement_id} className="py-4">
            <h3 className="text-lg font-semibold">{item.message}</h3>
            <p className="text-sm text-gray-600">{item?.expiry_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Announcements;
