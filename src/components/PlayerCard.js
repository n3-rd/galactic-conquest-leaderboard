import React from 'react';

function PlayerCard({ player, onEdit, currentRank, previousRank }) {
  const getRankChange = () => {
    if (currentRank < previousRank) {
      return <span className="rank-change up">↑</span>;
    } else if (currentRank > previousRank) {
      return <span className="rank-change down">↓</span>;
    }
    return <span className="rank-change same">-</span>;
  };

  return (
    <div className="player-card">
      <div className="rank-info">
        <span className="current-rank">{currentRank}</span>
        {getRankChange()}
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