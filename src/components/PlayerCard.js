import React from 'react';

function PlayerCard({ player, onEdit }) {
  return (
    <div className="player-card">
      <img src={player.image} alt={player.name} className="player-avatar" />
      <div className="player-info">
        <h2>{player.name}</h2>
        <p>Kill Count: {player.kill_count}</p>
        <button onClick={() => onEdit(player)}>Edit Kill Count</button>
      </div>
    </div>
  );
}

export default PlayerCard;