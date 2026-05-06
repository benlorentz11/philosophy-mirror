export default function FeedbackPanel({ choice, scenario, patternNote, onContinue, isLast, loading }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-7">

        {/* Source echo */}
        {scenario?.source && (
          <p className="text-gray-700 text-xs uppercase tracking-[0.25em] animate-fade-in">
            {scenario.source}
          </p>
        )}

        {/* Choice made */}
        <div className="space-y-3 animate-fade-up">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <p className="text-amber-700 text-xs uppercase tracking-widest font-semibold">
              Your choice
            </p>
          </div>
          <div className="border-l-2 border-amber-800/40 pl-5">
            <p className="text-gray-300 text-base font-serif italic leading-relaxed">
              "{choice.text}"
            </p>
          </div>
        </div>

        {/* Philosophical reflection */}
        <div className="bg-gray-900/70 rounded-2xl p-6 border border-gray-800/80 space-y-3 animate-fade-up anim-delay-150">
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-amber-700/60" />
            <p className="text-amber-700 text-xs uppercase tracking-widest font-semibold">
              Philosophical reflection
            </p>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">{choice.feedback}</p>
        </div>

        {/* Live pattern note — appears once a theme repeats across 2+ answers */}
        {patternNote && (
          <div className="rounded-xl border border-amber-900/30 bg-amber-950/20 px-6 py-4 space-y-1.5 animate-fade-up anim-delay-300">
            <p className="text-amber-600 text-xs uppercase tracking-widest font-semibold">
              Pattern forming
            </p>
            <p className="text-amber-200/70 text-sm leading-relaxed italic">
              {patternNote}
            </p>
          </div>
        )}

        {/* Continue */}
        <button
          onClick={onContinue}
          disabled={loading}
          className="w-full bg-amber-700 hover:bg-amber-600 disabled:bg-gray-800 disabled:text-gray-600 text-amber-50 font-medium py-3.5 rounded-xl transition-colors duration-200 text-base tracking-wide animate-fade-up anim-delay-300"
        >
          {loading
            ? 'Calculating your profile...'
            : isLast
            ? 'Reveal my philosophical profile →'
            : 'Continue the journey →'}
        </button>

      </div>
    </div>
  );
}
