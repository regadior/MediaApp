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
  const [selectedGenre, setSelectedGenre] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handlePlatformSelection = (platform) => {
    setSelectedPlatform(platform);
  };
  const handlePageSizeSelection = (size) => {
    setSelectedPageSize(size);
  };
  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
  };
  return (
    <div className="index_total">
      <div className="index_filtros">
        <PlattformFilter
          onPlatformSelection={handlePlatformSelection}
        />
        <GenreFilter onGenreSelection={handleGenreSelection}/>

        <PageSize onPageSizeSelection={handlePageSizeSelection}/>
        <SearchGameBar onSearch={handleSearch} />
        
      </div>
      <div className="index_cards">
        <GameCards searchTerm={searchTerm} selectedPlatform={selectedPlatform} selectedPageSize={selectedPageSize} selectedGenre={selectedGenre} />
      </div>
    </div>
  );
}
