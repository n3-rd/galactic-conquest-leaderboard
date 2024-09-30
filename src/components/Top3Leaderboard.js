import React from 'react';

// Individual leaderboard item component
const LeaderboardItem = ({ rank, name, pts, image }) => {
  // Dynamic styling based on rank
  const height = rank === 1 ? 'h-48' : rank === 2 ? 'h-40' : 'h-36';
  const color = rank === 1 ? 'bg-yellow-400' : rank === 2 ? 'bg-gray-300' : 'bg-orange-300';

  return (
    <div className={`flex flex-col items-center ${rank === 1 ? 'order-2' : rank === 2 ? 'order-1' : 'order-3'}`}>
      <img src={image} alt={name} className="w-16 h-16 rounded-full mb-2" />
      <div className={`${height} ${color} rounded-t-2xl flex flex-col justify-end items-center p-2`}>
        <p className="font-bold">{rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd'}</p>
        <p>{pts} Points</p>
      </div>
      <p className="mt-2 text-sm font-semibold">{name}</p>
    </div>
  );
};

// Top 3 leaderboard component
const Top3Leaderboard = ({ players }) => {
  // Get top 3 players
  const top3Players = players.slice(0, 3);

  return (
    <div className="flex justify-center items-end gap-4 p-4">
      {top3Players.map((player, index) => (
        <LeaderboardItem
          key={player.id}
          rank={index + 1}
          name={player.name}
          pts={player.pts}
          image={player.image}
        />
      ))}
    </div>
  );
};

export default Top3Leaderboard;