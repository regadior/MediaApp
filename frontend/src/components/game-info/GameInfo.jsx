import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import Load from "../load-element/Load";
import "./GameInfo.css";
import { useSelector } from "react-redux";

export default function GameInfo() {
  const userData = JSON.parse(window.localStorage.getItem("userLoginData"));
  const { gameName } = useParams();
  const location = useLocation();
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const isLoggedIn = useSelector((state) => state.authUser.isLoggedIn);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let url;
      if (userData?.userId) {
        url = `http://localhost:8000/api/users/${userData.userId}/games/${gameName}`;
      } else {
        url = `http://localhost:8000/api/users/games/${gameName}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setGameData(data);
      setIsInWishlist(data?.whishlist ? true : false);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
    setIsLoading(false);
  };
  const handleAddToWishlist = () => {
    axios
      .post(
        `http://localhost:8000/api/games/${gameData.id}/users/${userData.userId}`,
        {
          whishlist: true,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      )
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
                      >
                        <p>{gameData.whishlist.gameState.description}</p>
                      </div>
                      <div className="game_info_score_button">
                        <p>Score: {gameData.whishlist.score}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {isLoggedIn ? (
                        <div
                          className="game_info_favorites_button"
                          onClick={handleAddToWishlist}
                        >
                          <p>Add this game to your lists.</p>
                        </div>
                      ) : (
                        <Link
                          to="/login"
                          className="game_info_favorites_button_log"
                        >
                          <p>Add this game to your lists.</p>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="game_info_botton">
              <div className="game_info_about">
                <p className="p">About</p>
                <div className="game_info_description">
                  {gameData.description_raw}
                </div>
                <p className="game_info_tags">
                  Tags: 
                  {gameData.tags.map((tag, index) => (
                    <React.Fragment key={tag.id}>
                      <span>{tag.name}</span>
                      {index !== gameData.tags.length - 1 && (
                        <span className="tag_separator">,</span>
                      )}
                    </React.Fragment>
                  ))}
                </p>

                <p className="game_info_released">
                  Released at: {gameData.released}
                </p>
              </div>
              <div className="game_info_requirements">
                <p className="p">Save Games</p>
                <div className="game_info_req">{}</div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
