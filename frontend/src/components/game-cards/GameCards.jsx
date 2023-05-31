import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./GameCards.css";
import NextButton from "../buttons-next-prev/next/NextButton";
import PrevButton from "../buttons-next-prev/previous/PrevButton";
import Load from "../load-element/Load";
export default function GameCards() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/games?search_precise=true&page=${page}&page_size=${pageSize}`
      );
      const data = await response.json();
      navigate(`?page=${page}`);
      setGameData(data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
    setIsLoading(false);
  };
  const handleNextClick = () => {
    setPage(page + 1);
    navigate(`?page=${page + 1}`);
  };
  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
      navigate(`?page=${page - 1}`);
    }
  };
  return (
    <div>
      {isLoading ? (
        <div className="index_loader">
          <Load />
        </div>
      ) : (
        gameData && (
          <div>
            <div className="index_game-cards-container">
              {gameData.results.map((game) => (
                <div key={game.id} className="index_game-card">
                  <img src={game.background_image} alt={game.name} />
                  <div className="index_botton">
                    <Link to={`/game/${game.slug}`} className="Link">
                      <p>{game.name}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="index_total_next_prev">
              <div className="index_next_prev">
                <PrevButton onClick={handlePrevClick} />
                <NextButton onClick={handleNextClick} />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
