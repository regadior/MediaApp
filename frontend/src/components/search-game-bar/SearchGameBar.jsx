import React, { useState } from "react";
import "./searchGameBar.css";

export default function SearchGameBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Buscar juego..."
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}
