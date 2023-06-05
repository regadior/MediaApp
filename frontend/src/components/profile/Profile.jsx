import React, { useEffect, useState, useRef } from "react";
import "./Profile.css";
import Load from "../load-element/Load";
import editar from "../../assets/editar.png";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Nuevo estado para controlar el popup
  const [selectedOption, setSelectedOption] = useState(""); // Estado para almacenar la opción seleccionada del select
  const [inputValue, setInputValue] = useState(""); // Estado para almacenar el valor del input
  const popupRef = useRef(null); // Nueva referencia para el pop-up
  const userLoginData = JSON.parse(
    window.localStorage.getItem("userLoginData")
  );
  const userData = JSON.parse(window.localStorage.getItem("userData"));

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${userLoginData.userId}`
      );
      const data = await response.json();
      window.localStorage.setItem("userData", JSON.stringify(data));
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
    setIsLoading(false);
  };

  const handleEditClick = (event) => {
    event.stopPropagation(); // Detener la propagación del evento click
    setIsPopupOpen(true); // Abre el popup al hacer clic en el botón de editar
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSaveClick = async () => {
    if (!selectedOption || !inputValue) {
      return;
    }

    const patchData = {
      [selectedOption]: inputValue,
    };

    try {
      await fetch(`http://localhost:8000/api/users/${userLoginData.userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLoginData.accessToken}`,
        },
        body: JSON.stringify(patchData),
      });

      // Actualizar los datos en el almacenamiento local
      const updatedUserData = { ...userData, [selectedOption]: inputValue };
      window.localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setIsDataLoaded(true);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };
  if (isLoading) {
    return (
      <div className="index_loader">
        <Load />
      </div>
    );
  }

  if (!isDataLoaded) {
    return null;
  }

  return (
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
          <div className="Profile_name_edit">
            <div className="Profile_name">
              {userData.username}
              <div className="Profile_edit" onClick={handleEditClick}>
                <img src={editar} alt="" />
              </div>
            </div>
          </div>
          <div className="Profile_description">{userData.description}</div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="Profile_Popup" ref={popupRef}>
          <h2>Edit Profile</h2>
          <p>Select the option you want to edit</p>
          <div className="select-container">
            <select value={selectedOption} onChange={handleSelectChange}>
              <option value="">Select an option</option>
              <option value="username">Username</option>
              <option value="description">Description</option>
            </select>
          </div>
          {selectedOption && (
            <div>
              <div className="input-container">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile_buttons_save_clo">
                <button onClick={() => setIsPopupOpen(false)}>Close</button>
                <button onClick={handleSaveClick}>Save</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
