import React from 'react';

// Individual leaderboard item component
const LeaderboardItem = ({ rank, name, pts, prize, image }) => {
  return (
    <div className={`leaderboard-item rank-${rank}`}>
      <img src={image} alt={name} className="leaderboard-avatar" />
      <div className={`leaderboard-item-content`}>
        <p className="leaderboard-rank">{rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd'}</p>
        <p className="leaderboard-stats">{pts} PTS · ${prize}</p>
      </div>
      <p className="leaderboard-name">{name}</p>
    </div>
  );
};

// Top 3 leaderboard component
const TopUsers = ({ players }) => {
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
          prize={player.prize}
          image={player.image}
        />
      ))}
    </div>
  );
};

export default TopUsers;
