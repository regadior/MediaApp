import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./GameCards.css";
import NextButton from "../buttons-next-prev/next/NextButton";
import PrevButton from "../buttons-next-prev/previous/PrevButton";
import Load from "../load-element/Load";
export default function GameCards({ searchTerm, selectedPlatform }) {
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(null);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [platforms, setPlatforms] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const pageNumber = parseInt(pageParam) || 1;
    setPage(pageNumber);
    const searchParam = searchParams.get("search");
    setSearch(searchParam);
    const plattform = searchParams.get("plattform");
    setPlatforms(plattform);

}, [location.pathname, location.search]);
  useEffect(() => {
    navigate(`?page=${1}&search=${searchTerm}&plattform=${selectedPlatform}`);
  }, [searchTerm, selectedPlatform]);
  useEffect(() => {
    fetchData();
  }, [page, search, ordering, platforms]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/games?search_precise=true&page=${page}&page_size=${pageSize}&ordering=${ordering}&search=${search}&platforms=${platforms}`
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
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", String(page + 1));
      navigate(`?${searchParams.toString()}`);
    }
  };

  const handlePrevClick = () => {
    if (gameData.previous != null) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", String(page - 1));
      navigate(`?${searchParams.toString()}`);
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
