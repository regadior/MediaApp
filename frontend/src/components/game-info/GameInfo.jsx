import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./GameInfo.css";
export default function GameInfo({ searchTerm }) {
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/games?search_precise=true&page=${page}&page_size=${pageSize}&ordering=${ordering}&search=${search}&`
      );
      const data = await response.json();
      setGameData(data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
    setIsLoading(false);
  };
  const handleNextClick = () => {
    if (gameData.next != null) {
      navigate(`?page=${page + 1}&search=${search}`);
    }
  };
  const handlePrevClick = () => {
    if (gameData.previous != null) {
      navigate(`?page=${page - 1}&search=${search}`);
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
              {gameData.results.map((game) => {
                if (!game.background_image) {
                  return null; // Si no hay imagen, se omite el juego
                }
                return (
                  <div key={game.id} className="index_game-card">
                    <img src={game.background_image} alt={game.name} />
                    <div className="index_botton">
                      <Link to={`/game/${game.slug}`} className="Link">
                        <p>{game.name}</p>
                      </Link>
                    </div>
                  </div>
                );
              })}
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
