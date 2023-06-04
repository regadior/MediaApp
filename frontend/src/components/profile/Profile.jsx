import React, { useEffect, useState } from "react";
import "./Profile.css";
import Load from "../load-element/Load";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const userLoginData = JSON.parse(
    window.localStorage.getItem("userLoginData")
  );
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${userLoginData.userId}`
      );
      const data = await response.json();
      window.localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <div className="index_loader">
          <Load />
        </div>
      ) : (
        <div className="Profile_total">
          <div className="Profile_imgs">
            <div className="Profile_banner">
              <img src={userData.imgBanner} alt="" />
            </div>
            <div className="Profile_avatar">
              <img src={userData.imgPerfil} alt="" />
            </div>
          </div>
          <div className="Profile_left_des">
            <div className="Profile_username_des">
              <div className="Profile_name">{userData.username}</div>
              <div className="Profile_description">{userData.description}</div>
            </div>
            <div className="Profile_data">
              a
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
