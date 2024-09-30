import cors from 'cors';
import path from 'path';
import express, { Request, Response } from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

interface Player {
  id: number;
  name: string;
  pts: number;
  image: string;
}

// Initial player data
const initialPlayers: Player[] = [
  {
    "id": 1,
    "name": "James Wilson",
    "pts": 25,
    "image": "https://ui-avatars.com/api/?name=James+Wilson&background=4169E1&color=fff"
  },
  {
    "id": 2,
    "name": "Charlotte Lee",
    "pts": 9,
    "image": "https://ui-avatars.com/api/?name=Charlotte+Lee&background=FF69B4&color=fff"
  },
  {
    "id": 3,
    "name": "David Miller",
    "pts": 18,
    "image": "https://ui-avatars.com/api/?name=David+Miller&background=4169E1&color=fff"
  },
  {
    "id": 4,
    "name": "Olivia Garcia",
    "pts": 12,
    "image": "https://ui-avatars.com/api/?name=Olivia+Garcia&background=FF69B4&color=fff"
  },
  {
    "id": 5,
    "name": "Alexander Walker",
    "pts": 28,
    "image": "https://ui-avatars.com/api/?name=Alexander+Walker&background=4169E1&color=fff"
  },
  {
    "id": 6,
    "name": "Sophia Brown",
    "pts": 30,
    "image": "https://ui-avatars.com/api/?name=Sophia+Brown&background=FF69B4&color=fff"
  },
  {
    "id": 7,
    "name": "Mia Rodriguez",
    "pts": 5,
    "image": "https://ui-avatars.com/api/?name=Mia+Rodriguez&background=FF69B4&color=fff"
  },
  {
    "id": 8,
    "name": "Amelia Hall",
    "pts": 6,
    "image": "https://ui-avatars.com/api/?name=Amelia+Hall&background=FF69B4&color=fff"
  },
  {
    "id": 9,
    "name": "Ava Wilson",
    "pts": 14,
    "image": "https://ui-avatars.com/api/?name=Ava+Wilson&background=FF69B4&color=fff"
  },
  {
    "id": 10,
    "name": "Ethan Anderson",
    "pts": 27,
    "image": "https://ui-avatars.com/api/?name=Ethan+Anderson&background=4169E1&color=fff"
  },
  {
    "id": 11,
    "name": "Aria Nelson",
    "pts": 21,
    "image": "https://ui-avatars.com/api/?name=Aria+Nelson&background=FF69B4&color=fff"
  },
  {
    "id": 12,
    "name": "Emily Davis",
    "pts": 15,
    "image": "https://ui-avatars.com/api/?name=Emily+Davis&background=FF69B4&color=fff"
  },
  {
    "id": 13,
    "name": "Alice Johnson",
    "pts": 10,
    "image": "https://ui-avatars.com/api/?name=Alice+Johnson&background=FF69B4&color=fff"
  },
  {
    "id": 14,
    "name": "Michael Smith",
    "pts": 20,
    "image": "https://ui-avatars.com/api/?name=Michael+Smith&background=4169E1&color=fff"
  },
  {
    "id": 15,
    "name": "Daniel Martinez",
    "pts": 22,
    "image": "https://ui-avatars.com/api/?name=Daniel+Martinez&background=4169E1&color=fff"
  },
  {
    "id": 16,
    "name": "Jackson Scott",
    "pts": 24,
    "image": "https://ui-avatars.com/api/?name=Jackson+Scott&background=4169E1&color=fff"
  },
  {
    "id": 17,
    "name": "Lucas Taylor",
    "pts": 16,
    "image": "https://ui-avatars.com/api/?name=Lucas+Taylor&background=4169E1&color=fff"
  },
  {
    "id": 18,
    "name": "Matthew Thompson",
    "pts": 5,
    "image": "https://ui-avatars.com/api/?name=Matthew+Thompson&background=4169E1&color=fff"
  },
  {
    "id": 19,
    "name": "Sebastian Adams",
    "pts": 4,
    "image": "https://ui-avatars.com/api/?name=Sebastian+Adams&background=4169E1&color=fff"
  },
  {
    "id": 20,
    "name": "Grace Thomas",
    "pts": 23,
    "image": "https://ui-avatars.com/api/?name=Grace+Thomas&background=FF69B4&color=fff"
  },
  {
    "id": 21,
    "name": "Zoe Allen",
    "pts": 3,
    "image": "https://ui-avatars.com/api/?name=Zoe+Allen&background=FF69B4&color=fff"
  },
  {
    "id": 22,
    "name": "Henry King",
    "pts": 29,
    "image": "https://ui-avatars.com/api/?name=Henry+King&background=4169E1&color=fff"
  },
  {
    "id": 23,
    "name": "Lily Wright",
    "pts": 7,
    "image": "https://ui-avatars.com/api/?name=Lily+Wright&background=FF69B4&color=fff"
  },
  {
    "id": 24,
    "name": "Benjamin Young",
    "pts": 19,
    "image": "https://ui-avatars.com/api/?name=Benjamin+Young&background=4169E1&color=fff"
  },
  {
    "id": 25,
    "name": "Scarlett Green",
    "pts": 13,
    "image": "https://ui-avatars.com/api/?name=Scarlett+Green&background=FF69B4&color=fff"
  },
  {
    "id": 26,
    "name": "Matthew Gonzalez",
    "pts": 11,
    "image": "https://ui-avatars.com/api/?name=Matthew+Gonzalez&background=4169E1&color=fff"
  },
  {
    "id": 27,
    "name": "Leo Carter",
    "pts": 26,
    "image": "https://ui-avatars.com/api/?name=Leo+Carter&background=4169E1&color=fff"
  },
  {
    "id": 28,
    "name": "Chloe Perez",
    "pts": 2,
    "image": "https://ui-avatars.com/api/?name=Chloe+Perez&background=FF69B4&color=fff"
  },
  {
    "id": 29,
    "name": "Isabella Lopez",
    "pts": 8,
    "image": "https://ui-avatars.com/api/?name=Isabella+Lopez&background=FF69B4&color=fff"
  },
  {
    "id": 30,
    "name": "Christopher Hernandez",
    "pts": 17,
    "image": "https://ui-avatars.com/api/?name=Christopher+Hernandez&background=4169E1&color=fff"
  }
]

// Function to reset players
function resetPlayers(): Player[] {
  return JSON.parse(JSON.stringify(initialPlayers));
}

// Initialize players
let players: Player[] = resetPlayers();

// GET /api/users - Fetch all player data
app.get('/api/users', (_req: Request, res: Response) => {
  res.json(players);
});

// POST /api/users - Update a player's stats
app.post('/api/users', (req: Request, res: Response) => {
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
app.post('/api/reset', (_req: Request, res: Response) => {
  players = resetPlayers();
  res.json({ message: "Player data reset successfully" });
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));