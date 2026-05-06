const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { calculateProfile } = require('./scoringEngine');
const scenarios = require('./scenarios.json');

const app = express();

app.use(cors());
app.use(express.json());

// Serve built React app whenever client/dist exists (production builds)
const distDir = path.join(__dirname, '../client/dist');
const hasClient = fs.existsSync(distDir);
if (hasClient) {
  app.use(express.static(distDir));
}

// API — scenarios (scores stripped so clients cannot reverse-engineer results)
app.get('/api/scenarios', (req, res) => {
  const sanitized = scenarios.map((s) => ({
    id: s.id,
    title: s.title,
    source: s.source,
    question: s.question,
    choices: s.choices.map((c) => ({
      id: c.id,
      text: c.text,
      feedback: c.feedback,
      themes: c.themes || [],
    })),
  }));
  res.json(sanitized);
});

// API — scoring
app.post('/api/score', (req, res) => {
  const { answers } = req.body;
  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'answers must be a non-empty array' });
  }
  const result = calculateProfile(answers);
  res.json(result);
});

// Catch-all: return the React shell for any non-API route (client-side routing)
if (hasClient) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n  Philosophy Mirror`);
  console.log(`  Listening on port ${PORT}`);
  console.log(`  Frontend: ${hasClient ? 'served from client/dist' : 'not built'}\n`);
});
