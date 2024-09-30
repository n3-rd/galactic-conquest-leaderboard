import { useState, useEffect, useRef } from 'react';

const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

function usePlayerData() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const previousRankingsRef = useRef(new Map());
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isInitialLoad) {
          console.log('Resetting player data');
          await fetch(`${API_URL}/reset`, { method: 'POST' });
        }

        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch player data');
        }
        const data = await response.json();
        setPlayers(data);
        
        if (isInitialLoad) {
          initializeRankings(data);
          setIsInitialLoad(false);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isInitialLoad]);

  const initializeRankings = (currentPlayers) => {
    const newRankings = new Map();
    currentPlayers.forEach((player, index) => {
      newRankings.set(player.id, index + 1);
    });
    previousRankingsRef.current = newRankings;
  };

  async function updatePlayer(id, pts) {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, pts }),
      });
      if (!response.ok) {
        throw new Error('Failed to update player data');
      }
      const updatedPlayer = await response.json();
      setPlayers(prevPlayers => {
        const updatedPlayers = prevPlayers.map(p => p.id === id ? updatedPlayer : p);
        return updatedPlayers;
      });
    } catch (err) {
      setError(err);
    }
  }

  return { players, loading, error, updatePlayer, previousRankingsRef };
}

export default usePlayerData;