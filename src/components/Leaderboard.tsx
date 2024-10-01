import React, { useState, useMemo, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import EditPointsPopup from './EditPointsPopup';
import TopUsers from './TopUsers';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
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