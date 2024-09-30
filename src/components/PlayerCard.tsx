import React from 'react';
import { Player } from '../hooks/usePlayerData';

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  currentRank: number;
  arrow: React.ReactNode;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onEdit, currentRank, arrow }) => {
  return (
    <div className="player-card">
      <div className="rank-info">
        <span className="current-rank">{currentRank}</span>
        <span className="rank-change">{arrow}</span>
      </div>
      <img src={player.image} alt={player.name} className="player-avatar" />
      <div className="player-info">
        <h2>{player.name}</h2>
        <p>PTS: {player.pts}</p>
        <button onClick={() => onEdit(player)}>Edit Points</button>
      </div>
    </div>
  );
}

export default PlayerCard;