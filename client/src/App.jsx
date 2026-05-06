import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ScenarioCard from './components/ScenarioCard';
import FeedbackPanel from './components/FeedbackPanel';
import ResultsPage from './components/ResultsPage';
import ProgressBar from './components/ProgressBar';

// Descriptions keyed by the single most-chosen theme across answers so far.
const THEME_PATTERN_NOTES = {
  truth:
    'Across your choices so far, you have consistently reached for truth over comfort — even when the honest path was the harder one.',
  duty:
    'A thread of obligation runs through your choices. Again and again you have asked: what is owed here, not just what is easy?',
  freedom:
    'Freedom and self-determination keep appearing in your choices. You resist being told who to be or what to accept.',
  justice:
    'Justice has been your recurring concern. You return to fairness even when pure outcomes or pure principles might point elsewhere.',
  identity:
    'Who you are — not who you are expected to be — has shaped your choices. You take the question of self-definition seriously.',
  technology:
    'You are attuned to technology\'s moral weight. Across different scenarios, you have sensed what is lost when machines mediate experience.',
  'social belonging':
    'Community keeps calling you back. You have chosen connection and obligation to others over purely individual advantage.',
};

function computePatternNote(chosenThemes, answerCount) {
  if (answerCount < 2 || chosenThemes.length === 0) return null;

  const counts = {};
  for (const t of chosenThemes) counts[t] = (counts[t] || 0) + 1;

  const [topTheme, topCount] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (topCount < 2) return null;

  return THEME_PATTERN_NOTES[topTheme] ?? null;
}

export default function App() {
  const [phase, setPhase] = useState('landing');
  const [userName, setUserName] = useState('');
  const [scenarios, setScenarios] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [chosenThemes, setChosenThemes] = useState([]);
  const [lastChoice, setLastChoice] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/scenarios')
      .then((r) => r.json())
      .then(setScenarios)
      .catch(() => setError('Failed to load scenarios. Please refresh the page.'));
  }, []);

  const handleStart = (name) => {
    setUserName(name);
    setPhase('scenario');
  };

  const handleChoice = (scenarioId, choiceId) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    const choice = scenario.choices.find((c) => c.id === choiceId);
    setAnswers((prev) => [...prev, { scenarioId, choiceId }]);
    setChosenThemes((prev) => [...prev, ...(choice.themes || [])]);
    setLastChoice(choice);
    setPhase('feedback');
  };

  const handleContinue = async () => {
    const nextIndex = currentIndex + 1;
    const isLast = nextIndex >= scenarios.length;
    if (isLast) {
      setLoading(true);
      try {
        const response = await fetch('/api/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers }),
        });
        if (!response.ok) throw new Error('Scoring failed');
        const data = await response.json();
        setResults(data);
        setPhase('results');
      } catch {
        setError('Something went wrong calculating your profile. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentIndex(nextIndex);
      setPhase('scenario');
    }
  };

  const handleRestart = () => {
    setPhase('landing');
    setUserName('');
    setCurrentIndex(0);
    setAnswers([]);
    setChosenThemes([]);
    setLastChoice(null);
    setResults(null);
    setError(null);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-red-400">{error}</p>
          <button
            onClick={handleRestart}
            className="text-amber-500 underline underline-offset-4 text-sm hover:text-amber-400"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  const patternNote = computePatternNote(chosenThemes, answers.length);

  return (
    <div className="min-h-screen">
      {phase === 'landing' && (
        <LandingPage onStart={handleStart} scenarioCount={scenarios.length} />
      )}

      {(phase === 'scenario' || phase === 'feedback') && scenarios.length > 0 && (
        <div className="min-h-screen flex flex-col">
          <ProgressBar current={currentIndex + 1} total={scenarios.length} />
          <div key={`${phase}-${currentIndex}`} className="flex-1 flex flex-col animate-fade-up">
            {phase === 'scenario' && (
              <ScenarioCard
                scenario={scenarios[currentIndex]}
                onChoice={handleChoice}
              />
            )}
            {phase === 'feedback' && lastChoice && (
              <FeedbackPanel
                choice={lastChoice}
                scenario={scenarios[currentIndex]}
                patternNote={patternNote}
                onContinue={handleContinue}
                isLast={currentIndex + 1 >= scenarios.length}
                loading={loading}
              />
            )}
          </div>
        </div>
      )}

      {phase === 'results' && results && (
        <ResultsPage userName={userName} results={results} onRestart={handleRestart} />
      )}
    </div>
  );
}
