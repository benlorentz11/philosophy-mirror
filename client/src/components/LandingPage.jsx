import { useState } from 'react';

export default function LandingPage({ onStart, scenarioCount }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onStart(name.trim());
  };

  const countLabel = scenarioCount > 0 ? `${scenarioCount} dilemmas` : 'a series of dilemmas';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-10">

        <div className="space-y-5 animate-fade-up">
          <p className="text-gray-600 text-xs uppercase tracking-[0.3em]">Philosophy Mirror</p>
          <h1 className="text-5xl md:text-6xl font-serif text-amber-400 leading-tight">
            Enter the readings.<br />Make the choices.
          </h1>
        </div>

        <div className="w-16 h-px bg-amber-800/60 mx-auto animate-fade-in anim-delay-300" />

        <div className="space-y-4 animate-fade-up anim-delay-300">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
            You are about to walk through {countLabel} drawn directly from the
            course readings — Plato, Simone Weil, bell hooks, E.M. Forster, and others.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
            Each scenario places you inside the conflict the philosopher was writing about.
            Your choices will be analyzed to reveal the philosophical tradition
            that most closely mirrors how you reason.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 animate-fade-up anim-delay-500">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name to begin"
            autoFocus
            className="w-full max-w-sm bg-gray-900/80 border border-gray-700 rounded-xl px-5 py-3.5 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-amber-700 text-center text-lg transition-colors font-serif"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="bg-amber-700 hover:bg-amber-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-amber-50 font-medium px-10 py-3.5 rounded-xl transition-colors duration-200 text-base tracking-wide"
          >
            Begin the journey
          </button>
        </form>

        <p className="text-gray-700 text-xs animate-fade-in anim-delay-700">
          No account required &nbsp;&middot;&nbsp; No data stored
        </p>
      </div>
    </div>
  );
}
