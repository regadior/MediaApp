import React, { useState } from "react";
import "./Index.css";
import GameCards from "../../components/game-cards/GameCards";
import SearchGameBar from "../../components/search-game-bar/SearchGameBar";
export default function Inicio() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <div className="index_total">
      <div className="index_filtros">
        <SearchGameBar onSearch={handleSearch} />
      </div>
      <div className="index_cards">
        <GameCards searchTerm={searchTerm} />
      </div>
    </div>
  );
}
