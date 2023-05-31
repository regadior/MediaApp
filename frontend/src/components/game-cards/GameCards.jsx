import React, { useEffect, useState } from "react";
import './GameCards.css';
export default function GameCards() {
  const [gameData, setGameData] = useState(null);
  const [page, setPage] = useState(null);
  const [pageSize, setPageSize] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/games?search_precise=true`);
        const data = await response.json();
        setGameData(data); // Almacenar los datos en el estado del componente
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Renderizar el campo 'name' de los datos obtenidos */}
      {gameData && (
        <div className="game-cards-container">
          {gameData.results.map((game) => (
            <div key={game.id} className="game-card">
              <img src={game.background_image} alt={game.name} />
              <p>{game.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}