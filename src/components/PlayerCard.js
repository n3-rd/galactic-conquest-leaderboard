import React from 'react';

function PlayerCard({ player, onEdit, currentRank, arrow }) {
  return (
    <div className="player-card">
      <div className="rank-info">
        <span className="current-rank">{currentRank}</span>
        <span className={`rank-change ${arrow === '↑' ? 'up' : arrow === '↓' ? 'down' : 'same'}`}>
          {arrow}
        </span>
      </div>
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