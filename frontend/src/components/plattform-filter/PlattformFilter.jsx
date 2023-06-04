import React, { useState, useEffect, useRef } from "react";
import "./PlattformFilter.css";

export default function PlattformFilter({ onPlatformSelection }) {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/games/platforms")
      .then((response) => response.json())
      .then((data) => {
        const platformNames = data.results.map((platform) => platform.name);
        setPlatforms(platformNames);
      })
      .catch((error) => {
        console.error("Error fetching platforms:", error);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePlatformSelection = (platform) => {
    onPlatformSelection(platform);
    setSelectedPlatform(platform);
    setIsDropdownOpen(false);
  };

  const handleClearSelection = () => {
    onPlatformSelection("");
    setSelectedPlatform("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="PlattformFilter_total" ref={filterRef}>
      <div className="PlattformFilter_dropdown_button" onClick={handleDropdownToggle}>
        {selectedPlatform ? selectedPlatform : "Select Platform"}
      </div>
      {isDropdownOpen && (
        <div className="PlattformFilter_dropdown_content">
          <div className="PlattformFilter_dropdown_item" onClick={handleClearSelection}>
            Clear
          </div>
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="PlattformFilter_dropdown_item"
              onClick={() => handlePlatformSelection(platform)}
            >
              {platform}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
