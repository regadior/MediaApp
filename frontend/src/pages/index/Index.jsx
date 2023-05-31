import React from 'react';
import './Index.css'
import GameCards from '../../components/game-cards/GameCards';
function Inicio() {
  return (
    <div className='index-total'>
      <div className='index_filtros'>
      </div>
      <div className='index_cards'>
        <GameCards/>
      </div>
    </div>
  )
}

export default Inicio;