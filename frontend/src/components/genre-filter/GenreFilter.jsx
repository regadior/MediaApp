import React, { useState, useEffect, useRef } from "react";
import "./GenreFilter.css";
import ArrowDown from '../../assets/flecha-hacia-abajo.png';
// { ongenreelection }
export default function GenreFilter() {
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/games/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenre(data.results);
      })
      .catch((error) => {
        console.error("Error fetching genre:", error);
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const GenreParam = urlParams.get("genre");
    if (GenreParam && GenreParam.trim() === "") {
      setSelectedGenre(""); // Establecer valor por defecto si el parámetro está vacío
    }
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlegenreelection = (Genre) => {
    // ongenreelection(Genre.id);
    setSelectedGenre(Genre.name);
    setIsDropdownOpen(false);
  };

  const handleClearSelection = () => {
    // ongenreelection("");
    setSelectedGenre("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="PlattformFilter_total" ref={filterRef}>
      <div className="PlattformFilter_dropdown_button" onClick={handleDropdownToggle}>
        {selectedGenre ? selectedGenre : "Select Genre"}
        <img src={ArrowDown} alt="Arrow down" />
      </div>
      {isDropdownOpen && (
        <div className="PlattformFilter_dropdown_content">
          {selectedGenre && (
            <div className="PlattformFilter_dropdown_item" onClick={handleClearSelection}>
              Clear
            </div>
          )}
          {genre.map((Genre) => (
            <div
              key={Genre.id}
              className="PlattformFilter_dropdown_item"
              onClick={() => handlegenreelection(Genre)}
            >
              {Genre.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
