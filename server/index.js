const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

// Initial player data
const initialPlayers = [
  {
    "id": 1,
    "name": "Alice Johnson",
    "pts": 10,
    "image": "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    "id": 2,
    "name": "Michael Smith",
    "pts": 20,
    "image": "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    "id": 3,
    "name": "Emily Davis",
    "pts": 15,
    "image": "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    "id": 4,
    "name": "James Wilson",
    "pts": 25,
    "image": "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    "id": 5,
    "name": "Sophia Brown",
    "pts": 30,
    "image": "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    "id": 6,
    "name": "David Miller",
    "pts": 18,
    "image": "https://randomuser.me/api/portraits/men/6.jpg"
  },
  {
    "id": 7,
    "name": "Olivia Garcia",
    "pts": 12,
    "image": "https://randomuser.me/api/portraits/women/7.jpg"
  },
  {
    "id": 8,
    "name": "Daniel Martinez",
    "pts": 22,
    "image": "https://randomuser.me/api/portraits/men/8.jpg"
  },
  {
    "id": 9,
    "name": "Mia Rodriguez",
    "pts": 5,
    "image": "https://randomuser.me/api/portraits/women/9.jpg"
  },
  {
    "id": 10,
    "name": "Christopher Hernandez",
    "pts": 17,
    "image": "https://randomuser.me/api/portraits/men/10.jpg"
  },
  {
    "id": 11,
    "name": "Isabella Lopez",
    "pts": 8,
    "image": "https://randomuser.me/api/portraits/women/11.jpg"
  },
  {
    "id": 12,
    "name": "Matthew Gonzalez",
    "pts": 11,
    "image": "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    "id": 13,
    "name": "Ava Wilson",
    "pts": 14,
    "image": "https://randomuser.me/api/portraits/women/13.jpg"
  },
  {
    "id": 14,
    "name": "Ethan Anderson",
    "pts": 27,
    "image": "https://randomuser.me/api/portraits/men/14.jpg"
  },
  {
    "id": 15,
    "name": "Grace Thomas",
    "pts": 23,
    "image": "https://randomuser.me/api/portraits/women/15.jpg"
  },
  {
    "id": 16,
    "name": "Lucas Taylor",
    "pts": 16,
    "image": "https://randomuser.me/api/portraits/men/16.jpg"
  },
  {
    "id": 17,
    "name": "Charlotte Lee",
    "pts": 9,
    "image": "https://randomuser.me/api/portraits/women/17.jpg"
  },
  {
    "id": 18,
    "name": "Alexander Walker",
    "pts": 28,
    "image": "https://randomuser.me/api/portraits/men/18.jpg"
  },
  {
    "id": 19,
    "name": "Amelia Hall",
    "pts": 6,
    "image": "https://randomuser.me/api/portraits/women/19.jpg"
  },
  {
    "id": 20,
    "name": "Benjamin Young",
    "pts": 19,
    "image": "https://randomuser.me/api/portraits/men/20.jpg"
  },
  {
    "id": 21,
    "name": "Zoe Allen",
    "pts": 3,
    "image": "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    "id": 22,
    "name": "Henry King",
    "pts": 29,
    "image": "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    "id": 23,
    "name": "Lily Wright",
    "pts": 7,
    "image": "https://randomuser.me/api/portraits/women/23.jpg"
  },
  {
    "id": 24,
    "name": "Jackson Scott",
    "pts": 24,
    "image": "https://randomuser.me/api/portraits/men/24.jpg"
  },
  {
    "id": 25,
    "name": "Scarlett Green",
    "pts": 13,
    "image": "https://randomuser.me/api/portraits/women/25.jpg"
  },
  {
    "id": 26,
    "name": "Sebastian Adams",
    "pts": 4,
    "image": "https://randomuser.me/api/portraits/men/26.jpg"
  },
  {
    "id": 27,
    "name": "Aria Nelson",
    "pts": 21,
    "image": "https://randomuser.me/api/portraits/women/27.jpg"
  },
  {
    "id": 28,
    "name": "Leo Carter",
    "pts": 26,
    "image": "https://randomuser.me/api/portraits/men/28.jpg"
  },
  {
    "id": 29,
    "name": "Chloe Perez",
    "pts": 2,
    "image": "https://randomuser.me/api/portraits/women/29.jpg"
  },
  {
    "id": 30,
    "name": "Matthew Thompson",
    "pts": 5,
    "image": "https://randomuser.me/api/portraits/men/30.jpg"
  }
]

// Function to reset players
function resetPlayers() {
  return JSON.parse(JSON.stringify(initialPlayers));
}

// Initialize players
let players = resetPlayers();

// GET /api/users - Fetch all player data
app.get('/api/users', (req, res) => {
  res.json(players);
});

// POST /api/users - Update a player's stats
app.post('/api/users', (req, res) => {
  const { id, pts } = req.body;
  const playerIndex = players.findIndex(p => p.id === id);
  
  if (playerIndex !== -1) {
    players[playerIndex] = { ...players[playerIndex], pts };
    res.json(players[playerIndex]);
  } else {
    res.status(404).json({ error: "Player not found" });
  }
});

// New route to reset all player data
app.post('/api/reset', (req, res) => {
  players = resetPlayers();
  res.json({ message: "Player data reset successfully" });
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