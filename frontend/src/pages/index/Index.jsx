import React, { useState } from "react";
import "./Index.css";
import GameCards from "../../components/game-cards/GameCards";
import SearchGameBar from "../../components/search-game-bar/SearchGameBar";
import PlattformFilter from "../../components/plattform-filter/PlattformFilter";
import PageSize from "../../components/page-size/PageSize";
import GenreFilter from "../../components/genre-filter/GenreFilter";
export default function Inicio() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handlePlatformSelection = (platform) => {
    setSelectedPlatform(platform);
  };
  const handlePageSizeSelection = (size) => {
    setSelectedPageSize(size);
  };
  return (
    <div className="index_total">
      <div className="index_filtros">
        <SearchGameBar onSearch={handleSearch} />
        <PlattformFilter
          onPlatformSelection={handlePlatformSelection}
        />
        <GenreFilter/>
        <PageSize onPageSizeSelection={handlePageSizeSelection}/>
      </div>
      <div className="index_cards">
        <GameCards searchTerm={searchTerm} selectedPlatform={selectedPlatform} selectedPageSize={selectedPageSize}  />
      </div>
    </div>
  );
}
