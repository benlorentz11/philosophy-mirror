# Philosophy Mirror

Eight philosophical dilemmas. No right answers. A reflection of how you think.

After answering all scenarios, the app calculates which of five ethical traditions — Utilitarian, Kantian, Virtue Ethicist, Existentialist, or Stoic — best matches your moral reasoning.

## Running Locally

### 1. Install dependencies

```bash
cd philosophy-mirror
npm run install:all
```

### 2. Start the backend

```bash
npm run dev:server
# Server runs on http://localhost:3001
```

### 3. Start the frontend (in a second terminal)

```bash
npm run dev:client
# App opens on http://localhost:5173
```

The Vite dev server proxies `/api` requests to the Express server automatically.

---

## Project Structure

```
philosophy-mirror/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx          # Root component and app state
│   │   ├── index.css        # Tailwind + Google Fonts
│   │   └── components/
│   │       ├── LandingPage.jsx
│   │       ├── ProgressBar.jsx
│   │       ├── ScenarioCard.jsx
│   │       ├── FeedbackPanel.jsx
│   │       └── ResultsPage.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── server/
│   ├── index.js             # Express server
│   ├── scenarios.json       # All 8 dilemmas with scores
│   ├── scoringEngine.js     # Calculates philosophy profile
│   └── package.json
├── package.json             # Root scripts + Heroku config
├── Procfile                 # Heroku process declaration
└── README.md
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/scenarios` | Returns all scenarios (scores hidden from client) |
| POST | `/api/score` | Accepts `{ answers: [{scenarioId, choiceId}] }`, returns philosophy profile |

---

## Deploying to Heroku

```bash
# From the project root
git init
git add .
git commit -m "Initial commit"

heroku create your-app-name
heroku config:set NODE_ENV=production
git push heroku main
```

Heroku runs `heroku-postbuild` automatically, which installs all dependencies and builds the React app. The Express server then serves the built static files alongside the API.

---

## Philosophy Profiles

| Profile | Thinkers |
|---------|---------|
| Utilitarian | Bentham, Mill |
| Kantian | Immanuel Kant |
| Virtue Ethicist | Aristotle |
| Existentialist | Sartre, Camus |
| Stoic | Marcus Aurelius, Epictetus |
