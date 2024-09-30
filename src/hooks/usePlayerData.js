import { useState, useEffect } from 'react';

const API_URL = process.env.NODE_ENV === 'production' ? '/api/users' : 'http://localhost:5000/api/users';

function usePlayerData() {
  const [players, setPlayers] = useState([]);
  const [previousRankings, setPreviousRankings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch player data');
        }
        const data = await response.json();
        setPlayers(data);
        updateRankings(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function updateRankings(currentPlayers) {
    const newRankings = {};
    currentPlayers.forEach((player, index) => {
      newRankings[player.id] = index + 1;
    });
    setPreviousRankings(newRankings);
  }

  async function updatePlayer(id, kill_count) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, kill_count }),
      });
      if (!response.ok) {
        throw new Error('Failed to update player data');
      }
      const updatedPlayer = await response.json();
      const updatedPlayers = players.map(p => p.id === id ? updatedPlayer : p);
      setPlayers(updatedPlayers);
      updateRankings(updatedPlayers);
    } catch (err) {
      setError(err);
    }
  }

  return { players, previousRankings, loading, error, updatePlayer };
}

export default usePlayerData;