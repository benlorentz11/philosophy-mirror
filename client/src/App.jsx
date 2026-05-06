import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ScenarioCard from './components/ScenarioCard';
import FeedbackPanel from './components/FeedbackPanel';
import ResultsPage from './components/ResultsPage';
import ProgressBar from './components/ProgressBar';

export default function App() {
  const [phase, setPhase] = useState('landing');
  const [userName, setUserName] = useState('');
  const [scenarios, setScenarios] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
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
    setLastChoice(choice);
    setPhase('feedback');
  };

  const handleContinue = async () => {
    const isLast = currentIndex + 1 >= scenarios.length;
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
      setCurrentIndex((i) => i + 1);
      setPhase('scenario');
    }
  };

  const handleRestart = () => {
    setPhase('landing');
    setUserName('');
    setCurrentIndex(0);
    setAnswers([]);
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
