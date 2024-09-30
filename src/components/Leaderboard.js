import React, { useState, useMemo, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import LeaderboardControls from './LeaderboardControls';
import EditPointsPopup from './EditPointsPopup';
import TopUsers from './TopUsers';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import usePlayerData from '../hooks/usePlayerData';

function Leaderboard() {
  const [sortBy, setSortBy] = useState('pts');
  const [displayCount, setDisplayCount] = useState(10);
  const [activeTab, setActiveTab] = useState('full');
  
  const { players, loading, error, updatePlayer, previousRankingsRef } = usePlayerData();
  
  const [editingPlayer, setEditingPlayer] = useState(null);

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [players, sortBy]);

  const displayedPlayers = sortedPlayers.slice(0, displayCount);

  useEffect(() => {
    const newRankings = new Map(sortedPlayers.map((player, index) => [player.id, index + 1]));
    previousRankingsRef.current = newRankings;
  }, [sortedPlayers, previousRankingsRef]);

  const handleEdit = (player) => {
    setEditingPlayer(player);
  };

  const handleSave = async (id, newPoints) => {
    await updatePlayer(id, newPoints);
    setEditingPlayer(null);
  };

  const getArrow = (player, currentRank) => {
    const previousRank = previousRankingsRef.current.get(player.id);
    if (previousRank === undefined) return null;
    if (currentRank < previousRank) {
      return <ArrowUp color='green' />;
    } else if (currentRank > previousRank) {
      return <ArrowDown color='red' />;
    } else {
      return <Minus color='gray' />;
    }
  };

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
              arrow={getArrow(player, index + 1)}
            />
          ))}
        </>
      ) : (
        <TopUsers players={sortedPlayers} count={3} />
      )}

      {/* Popup for editing kill count */}
      {editingPlayer && (
        <EditPointsPopup
          player={editingPlayer}
          onSave={handleSave}
          onClose={() => setEditingPlayer(null)}
        />
      )}
    </div>
  );
}

export default Leaderboard;