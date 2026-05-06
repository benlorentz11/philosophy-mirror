const express = require('express');
const cors = require('cors');
const path = require('path');
const { calculateProfile } = require('./scoringEngine');
const scenarios = require('./scenarios.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve built React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// Return scenarios without internal scores so clients cannot cheat
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
    })),
  }));
  res.json(sanitized);
});

// Accept an array of { scenarioId, choiceId } and return the philosophy profile
app.post('/api/score', (req, res) => {
  const { answers } = req.body;
  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'answers must be a non-empty array' });
  }
  const result = calculateProfile(answers);
  res.json(result);
});

// Catch-all sends the React app for any non-API route in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`\n  Philosophy Mirror`);
    console.log(`  Server: http://localhost:${port}`);
    console.log(`  Mode:   ${process.env.NODE_ENV || 'development'}\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`  Port ${port} is in use, trying ${port + 1}...`);
      server.close();
      startServer(port + 1);
    } else {
      console.error('  Server error:', err.message);
      process.exit(1);
    }
  });
}

startServer(Number(process.env.PORT || 3001));
