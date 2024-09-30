import React, { useState } from 'react';
import PlayerCard from './PlayerCard';
import LeaderboardControls from './LeaderboardControls';
import EditKillCountPopup from './EditKillCountPopup';
import usePlayerData from '../hooks/usePlayerData';

function Leaderboard() {
  const [sortBy, setSortBy] = useState('kill_count');
  const [displayCount, setDisplayCount] = useState(10);
  const { players, loading, error, updatePlayer } = usePlayerData();
  const [editingPlayer, setEditingPlayer] = useState(null);

  const sortedPlayers = [...players].sort((a, b) => b[sortBy] - a[sortBy]);
  const displayedPlayers = sortedPlayers.slice(0, displayCount);

  const handleEdit = (player) => {
    setEditingPlayer(player);
  };

  const handleSave = async (id, newKillCount) => {
    await updatePlayer(id, newKillCount);
    setEditingPlayer(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="leaderboard">
      <LeaderboardControls
        sortBy={sortBy}
        onSortChange={setSortBy}
        displayCount={displayCount}
        onDisplayCountChange={setDisplayCount}
      />
      {displayedPlayers.map(player => (
        <PlayerCard key={player.id} player={player} onEdit={handleEdit} />
      ))}
      {editingPlayer && (
        <EditKillCountPopup
          player={editingPlayer}
          onSave={handleSave}
          onClose={() => setEditingPlayer(null)}
        />
      )}
    </div>
  );
}

export default Leaderboard;