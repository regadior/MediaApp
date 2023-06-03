import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import Load from "../load-element/Load";
import "./GameInfo.css";

export default function GameInfo({ searchTerm }) {
  const { gameName } = useParams();
  const location = useLocation();
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/1/games/${gameName}`
      );
      const data = await response.json();
      setGameData(data);
      setIsInWishlist(data?.whishlist ? true : false);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
    setIsLoading(false);
  };
  const handleAddToWishlist = () => {
    console.log(gameData.id);
    axios
      .post(`http://localhost:8000/api/games/${gameData.id}/users/1`, {
        whishlist: true,
      })
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleRemoveToWishlist = () => {
    console.log(gameData.id);
    axios
      .post(`http://localhost:8000/api/games/${gameData.id}/users/1`, {
        whishlist: true,
      })
      .then((response) => {
        // Lógica adicional después de la respuesta del servidor
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.log(isInWishlist);
  return (
    <div>
      {isLoading ? (
        <div className="game_info_loader">
          <Load />
        </div>
      ) : (
        gameData && (
          <div className="game_info_total">
            <div className="game_info_img_name">
              <div className="game_info_img">
                <img src={gameData.background_image} alt={gameData.name} />
              </div>
              <div className="game_info_name">
                <p>{gameData.name}</p>
                <p className="metacritic">Metacritic: {gameData.metacritic}</p>
                <p className="updated">Updated: {gameData.updated}</p>
                <div className="game_info_favorites_score">
                  {isInWishlist ? (
                    <div>
                      <div
                        className="game_info_favorites_button"
                        onClick={handleRemoveToWishlist}
                      >
                        <p>{gameData.whishlist.gameState.description}</p>
                      </div>
                      <div className="game_info_score_button">
                        <p>Score: {gameData.whishlist.score}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className="game_info_favorites_button"
                        onClick={handleAddToWishlist}
                      >
                        <p>Add this game to your wishlist.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="game_info_botton">
              <div className="game_info_about">
                <p>About</p>
                <div className="game_info_description">
                  {gameData.description_raw}
                </div>
              </div>
              <div className="game_info_requirements">
                <p>Requirements for PC</p>
                <div className="game_info_req">{}</div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
