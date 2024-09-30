import React, { useState } from 'react';
import PlayerCard from './PlayerCard';
import LeaderboardControls from './LeaderboardControls';
import EditKillCountPopup from './EditKillCountPopup';
import Top3Leaderboard from './Top3Leaderboard';
import usePlayerData from '../hooks/usePlayerData';

function Leaderboard() {
  // State management for sorting, display count, and active tab
  const [sortBy, setSortBy] = useState('kill_count');
  const [displayCount, setDisplayCount] = useState(10);
  const [activeTab, setActiveTab] = useState('full'); // 'full' or 'top3'
  
  // Custom hook to fetch and manage player data
  const { players, previousRankings, loading, error, updatePlayer } = usePlayerData();
  
  // State for managing the player being edited
  const [editingPlayer, setEditingPlayer] = useState(null);

  // Sort players and slice based on display count
  const sortedPlayers = [...players].sort((a, b) => b[sortBy] - a[sortBy]);
  const displayedPlayers = sortedPlayers.slice(0, displayCount);

  // Handler for initiating player edit
  const handleEdit = (player) => {
    setEditingPlayer(player);
  };

  // Handler for saving updated kill count
  const handleSave = async (id, newKillCount) => {
    await updatePlayer(id, newKillCount);
    setEditingPlayer(null);
  };

  // Loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="leaderboard">
      {/* Tab navigation */}
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'full' ? 'active' : ''}`}
          onClick={() => setActiveTab('full')}
        >
          Full Leaderboard
        </button>
        <button
          className={`tab-button ${activeTab === 'top3' ? 'active' : ''}`}
          onClick={() => setActiveTab('top3')}
        >
          Top 3
        </button>
      </div>

      {/* Conditional rendering based on active tab */}
      {activeTab === 'full' ? (
        <>
          <LeaderboardControls
            sortBy={sortBy}
            onSortChange={setSortBy}
            displayCount={displayCount}
            onDisplayCountChange={setDisplayCount}
          />
          {displayedPlayers.map((player, index) => (
            <PlayerCard 
              key={player.id} 
              player={player} 
              onEdit={handleEdit} 
              currentRank={index + 1}
              previousRank={previousRankings[player.id]}
            />
          ))}
        </>
      ) : (
        <Top3Leaderboard players={sortedPlayers} />
      )}

      {/* Popup for editing kill count */}
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