
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let moods = []; // Temporary in-memory storage for moods

// Get all moods
app.get('/api/moods', (req, res) => {
    res.json(moods);
});

// Add a new mood
app.post('/api/moods', (req, res) => {
    const { mood, date, notes } = req.body;
    if (mood && date) {
        moods.push({ mood, date, notes });
        res.status(201).json({ message: 'Mood added successfully' });
    } else {
        res.status(400).json({ error: 'Mood and date are required' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
