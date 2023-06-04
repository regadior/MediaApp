import React, { useState } from "react";
import "./Index.css";
import GameCards from "../../components/game-cards/GameCards";
import SearchGameBar from "../../components/search-game-bar/SearchGameBar";
import PlattformFilter from "../../components/plattform-filter/PlattformFilter";
export default function Inicio() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handlePlatformSelection = (platform) => {
    setSelectedPlatform(platform);
  };
  

  return (
    <div className="index_total">
      <div className="index_filtros">
        <SearchGameBar onSearch={handleSearch} />
        <PlattformFilter
          onPlatformSelection={handlePlatformSelection}
        />
      </div>
      <div className="index_cards">
        <GameCards searchTerm={searchTerm} selectedPlatform={selectedPlatform}  />
      </div>
    </div>
  );
}
