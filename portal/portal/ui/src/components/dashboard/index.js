import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    if (userData && userData.user && userData.user.role) {
      if (userData.user.role === "admin") {
        navigate("/dashboard/admin");
      } else if (userData.user.role === "student") {
        navigate("/dashboard/student");
      }
    }
  }, []);

  return <div>INDEX</div>;
}

export default Index;
