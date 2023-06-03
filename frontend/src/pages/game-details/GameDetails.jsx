import React from "react";
import "./GameDetails.css";
import GameInfo from "../../components/game-info/GameInfo";
export default function GameDetails() {
  return (
    <div className="game_details_total">
      <div className="game_total">
        <GameInfo />
      </div>
    </div>
  );
}
