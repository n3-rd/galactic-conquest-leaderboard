import React, { useState, useMemo, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import EditPointsPopup from './EditPointsPopup';
import TopUsers from './TopUsers';
import usePlayerData, { Player } from '../hooks/usePlayerData';

function Leaderboard() {
  const { players, loading, error, updatePlayer, previousRankingsRef } = usePlayerData();
  
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => b.pts - a.pts);
  }, [players]);

  useEffect(() => {
    const newRankings = new Map(sortedPlayers.map((player, index) => [player.id, index + 1]));
    previousRankingsRef.current = newRankings;
  }, [sortedPlayers, previousRankingsRef]);

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
  };

  const handleSave = async (id: string, newPoints: number) => {
    await updatePlayer(id, newPoints);
    setEditingPlayer(null);
  };

  const getArrow = (player: Player, currentRank: number): React.ReactNode => {
    const previousRank = previousRankingsRef.current.get(player.id);
    if (previousRank === undefined) return null;
    if (currentRank < previousRank) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#12d316" d="M216.49 168.49a12 12 0 0 1-17 0L128 97l-71.51 71.49a12 12 0 0 1-17-17l80-80a12 12 0 0 1 17 0l80 80a12 12 0 0 1 0 17"/></svg>;
    } else if (currentRank > previousRank) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#d34312" d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"/></svg>;
    } else {
      return<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#d6d6d6" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12"/></svg>;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="leaderboard">
      {/* Top 3 Users */}
      <TopUsers players={sortedPlayers.slice(0, 3).map(player => ({
        ...player,
        prize: 0 // Adding a default prize value
      }))} />

      {/* Full Leaderboard */}
      <h2>Full Leaderboard</h2>
      {sortedPlayers.map((player, index) => (
        <PlayerCard 
          key={player.id} 
          player={player} 
          onEdit={handleEdit} 
          currentRank={index + 1}
          arrow={getArrow(player, index + 1)}
        />
      ))}

      {/* Popup for editing points */}
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