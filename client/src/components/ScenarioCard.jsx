import { useState, useEffect } from 'react';

function TypewriterText({ text, speed = 10, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const done = displayed.length === text.length;

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text]);

  const skip = () => {
    setDisplayed(text);
    onDone?.();
  };

  return (
    <span onClick={skip} className={done ? '' : 'cursor-pointer'} title={done ? '' : 'Click to reveal'}>
      {displayed}
      {!done && <span className="opacity-50 ml-px animate-pulse">|</span>}
    </span>
  );
}

export default function ScenarioCard({ scenario, onChoice }) {
  const [choicesReady, setChoicesReady] = useState(false);

  useEffect(() => {
    setChoicesReady(false);
  }, [scenario.id]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-9">

        {/* Source attribution */}
        <div className="space-y-1 animate-fade-in">
          <p className="text-gray-600 text-xs uppercase tracking-[0.25em]">
            {scenario.source}
          </p>
          <p className="text-amber-600/80 text-sm font-serif italic">
            {scenario.title}
          </p>
        </div>

        {/* Narrative question */}
        <div className="border-l-2 border-amber-800/30 pl-6">
          <p className="text-gray-100 text-xl md:text-2xl leading-relaxed font-serif">
            <TypewriterText
              text={scenario.question}
              speed={10}
              onDone={() => setChoicesReady(true)}
            />
          </p>
        </div>

        {/* Decorative rule */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-800" />
          <div className="w-1 h-1 rounded-full bg-amber-800/50" />
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        {/* Choices — appear once typing completes */}
        <div
          className="space-y-3 transition-opacity duration-700"
          style={{ opacity: choicesReady ? 1 : 0, pointerEvents: choicesReady ? 'auto' : 'none' }}
        >
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-4">
            What do you do?
          </p>
          {scenario.choices.map((choice, i) => (
            <button
              key={choice.id}
              onClick={() => onChoice(scenario.id, choice.id)}
              className="w-full text-left bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 hover:border-amber-800/60 rounded-2xl p-5 text-gray-200 transition-all duration-200 group"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="block text-amber-700 text-xs uppercase tracking-widest font-semibold mb-2 group-hover:text-amber-500 transition-colors">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-base leading-relaxed">{choice.text}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
