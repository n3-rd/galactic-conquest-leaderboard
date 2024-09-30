const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

// Updated mock player data
let players = [
    { "id": 1, "name": "Alice Johnson", "kill_count": 10, "image": "https://randomuser.me/api/portraits/women/1.jpg" },
    { "id": 2, "name": "Michael Smith", "kill_count": 20, "image": "https://randomuser.me/api/portraits/men/2.jpg" },
    // ... (rest of the player data)
];

// GET /api/users - Fetch all player data
app.get('/api/users', (req, res) => {
  res.json(players);
});

// POST /api/users - Update a player's stats
app.post('/api/users', (req, res) => {
  const { id, kill_count } = req.body;
  const playerIndex = players.findIndex(p => p.id === id);
  
  if (playerIndex !== -1) {
    players[playerIndex] = { ...players[playerIndex], kill_count };
    res.json(players[playerIndex]);
  } else {
    res.status(404).json({ error: "Player not found" });
  }
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));