const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

// Updated mock player data
let players = [
  {
    "id": 1,
    "name": "Alice Johnson",
    "kill_count": 10,
    "image": "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    "id": 2,
    "name": "Michael Smith",
    "kill_count": 20,
    "image": "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    "id": 3,
    "name": "Emily Davis",
    "kill_count": 15,
    "image": "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    "id": 4,
    "name": "James Wilson",
    "kill_count": 25,
    "image": "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    "id": 5,
    "name": "Sophia Brown",
    "kill_count": 30,
    "image": "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    "id": 6,
    "name": "David Miller",
    "kill_count": 18,
    "image": "https://randomuser.me/api/portraits/men/6.jpg"
  },
  {
    "id": 7,
    "name": "Olivia Garcia",
    "kill_count": 12,
    "image": "https://randomuser.me/api/portraits/women/7.jpg"
  },
  {
    "id": 8,
    "name": "Daniel Martinez",
    "kill_count": 22,
    "image": "https://randomuser.me/api/portraits/men/8.jpg"
  },
  {
    "id": 9,
    "name": "Mia Rodriguez",
    "kill_count": 5,
    "image": "https://randomuser.me/api/portraits/women/9.jpg"
  },
  {
    "id": 10,
    "name": "Christopher Hernandez",
    "kill_count": 17,
    "image": "https://randomuser.me/api/portraits/men/10.jpg"
  },
  {
    "id": 11,
    "name": "Isabella Lopez",
    "kill_count": 8,
    "image": "https://randomuser.me/api/portraits/women/11.jpg"
  },
  {
    "id": 12,
    "name": "Matthew Gonzalez",
    "kill_count": 11,
    "image": "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    "id": 13,
    "name": "Ava Wilson",
    "kill_count": 14,
    "image": "https://randomuser.me/api/portraits/women/13.jpg"
  },
  {
    "id": 14,
    "name": "Ethan Anderson",
    "kill_count": 27,
    "image": "https://randomuser.me/api/portraits/men/14.jpg"
  },
  {
    "id": 15,
    "name": "Grace Thomas",
    "kill_count": 23,
    "image": "https://randomuser.me/api/portraits/women/15.jpg"
  },
  {
    "id": 16,
    "name": "Lucas Taylor",
    "kill_count": 16,
    "image": "https://randomuser.me/api/portraits/men/16.jpg"
  },
  {
    "id": 17,
    "name": "Charlotte Lee",
    "kill_count": 9,
    "image": "https://randomuser.me/api/portraits/women/17.jpg"
  },
  {
    "id": 18,
    "name": "Alexander Walker",
    "kill_count": 28,
    "image": "https://randomuser.me/api/portraits/men/18.jpg"
  },
  {
    "id": 19,
    "name": "Amelia Hall",
    "kill_count": 6,
    "image": "https://randomuser.me/api/portraits/women/19.jpg"
  },
  {
    "id": 20,
    "name": "Benjamin Young",
    "kill_count": 19,
    "image": "https://randomuser.me/api/portraits/men/20.jpg"
  },
  {
    "id": 21,
    "name": "Zoe Allen",
    "kill_count": 3,
    "image": "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    "id": 22,
    "name": "Henry King",
    "kill_count": 29,
    "image": "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    "id": 23,
    "name": "Lily Wright",
    "kill_count": 7,
    "image": "https://randomuser.me/api/portraits/women/23.jpg"
  },
  {
    "id": 24,
    "name": "Jackson Scott",
    "kill_count": 24,
    "image": "https://randomuser.me/api/portraits/men/24.jpg"
  },
  {
    "id": 25,
    "name": "Scarlett Green",
    "kill_count": 13,
    "image": "https://randomuser.me/api/portraits/women/25.jpg"
  },
  {
    "id": 26,
    "name": "Sebastian Adams",
    "kill_count": 4,
    "image": "https://randomuser.me/api/portraits/men/26.jpg"
  },
  {
    "id": 27,
    "name": "Aria Nelson",
    "kill_count": 21,
    "image": "https://randomuser.me/api/portraits/women/27.jpg"
  },
  {
    "id": 28,
    "name": "Leo Carter",
    "kill_count": 26,
    "image": "https://randomuser.me/api/portraits/men/28.jpg"
  },
  {
    "id": 29,
    "name": "Chloe Perez",
    "kill_count": 2,
    "image": "https://randomuser.me/api/portraits/women/29.jpg"
  },
  {
    "id": 30,
    "name": "Matthew Thompson",
    "kill_count": 5,
    "image": "https://randomuser.me/api/portraits/men/30.jpg"
  }
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