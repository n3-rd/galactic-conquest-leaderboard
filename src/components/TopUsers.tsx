import React from 'react';
import { Player } from '../hooks/usePlayerData';

// Individual leaderboard item component
const LeaderboardItem = ({ rank, name, pts, image, prize }: {
  rank: number;
  name: string;
  pts: number;
  image: string;
  prize: number;
}) => {
  // Static prize values
  const prizes = {
    1: 1000,
    2: 500,
    3: 250
  };

  return (
    <div className={`leaderboard-item rank-${rank}`}>
      <img src={image} alt={name} className="leaderboard-avatar" />
      <div className="leaderboard-item-content">
        <p className="leaderboard-rank">{rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd'}</p>
        <p className="leaderboard-stats">{pts} PTS · ${prizes[rank as keyof typeof prizes]}</p>
      </div>
      <p className="leaderboard-name">{name}</p>
    </div>
  );
};

// Top 3 leaderboard component
const TopUsers: React.FC<{ players: (Player & { prize: number })[] }> = ({ players }) => {
  // Get top 3 players
  const top3Players = players.slice(0, 3);

  // Reorder the players to put the first place in the middle
  const orderedPlayers = [top3Players[1], top3Players[0], top3Players[2]];

  return (
    <div className="top-3-leaderboard">
      {orderedPlayers.map((player, index) => (
        <LeaderboardItem
          key={player.id}
          rank={index === 0 ? 2 : index === 1 ? 1 : 3}
          name={player.name}
          pts={player.pts}
          image={player.image}
          prize={player.prize}
        />
      ))}
    </div>
  );
};

export default TopUsers;
