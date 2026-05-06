// ─── Color palette per philosophy ───────────────────────────────────────────

const COLORS = {
  utilitarian:    { bg: 'bg-blue-950/40',    border: 'border-blue-800/50',    bar: 'bg-blue-500',    label: 'text-blue-400',    dot: 'bg-blue-500',    accent: 'border-blue-700/40'    },
  kantian:        { bg: 'bg-purple-950/40',  border: 'border-purple-800/50',  bar: 'bg-purple-500',  label: 'text-purple-400',  dot: 'bg-purple-500',  accent: 'border-purple-700/40'  },
  virtue:         { bg: 'bg-emerald-950/40', border: 'border-emerald-800/50', bar: 'bg-emerald-500', label: 'text-emerald-400', dot: 'bg-emerald-500', accent: 'border-emerald-700/40' },
  existentialist: { bg: 'bg-orange-950/40',  border: 'border-orange-800/50',  bar: 'bg-orange-500',  label: 'text-orange-400',  dot: 'bg-orange-500',  accent: 'border-orange-700/40'  },
  stoic:          { bg: 'bg-slate-800/40',   border: 'border-slate-700/50',   bar: 'bg-slate-400',   label: 'text-slate-300',   dot: 'bg-slate-400',   accent: 'border-slate-600/40'   },
};

// ─── Full profiles (mirrored from server; safe to duplicate here) ────────────

const PROFILES = {
  utilitarian: {
    label: 'Utilitarian',
    tagline: 'The Greater Good Thinker',
    description:
      'You weigh outcomes above all else. Like Bentham and Mill, you believe the right action produces the greatest happiness for the greatest number. Your moral compass points toward impact, not intention.',
    philosopher: 'John Stuart Mill',
    quote:
      '"Actions are right in proportion as they tend to promote happiness; wrong as they tend to produce the reverse of happiness."',
    courseThemes:
      "Across the Truman Show, The Machine Stops, and Bacon's New Atlantis, you consistently asked: which choice produces the most good for the most people? When principles and consequences clashed, you followed the consequences.",
    reflections: [
      'Your choices consistently prioritized outcomes — you measured the value of an action by its effects on others, not by the principle behind it.',
      'A utilitarian thread runs through your thinking: when faced with competing moral claims, you weighed costs and benefits rather than invoking absolute duties.',
      'Though other instincts also shaped your path, you showed a pragmatic streak — the question "who does this actually help?" was never far from your mind.',
    ],
  },
  kantian: {
    label: 'Kantian',
    tagline: 'The Principled Idealist',
    description:
      'You live by principles. Like Kant, you believe in universal moral laws that must hold regardless of consequence. Duty calls you to act rightly even when it is costly — because the right act is right in itself, not for what it produces.',
    philosopher: 'Immanuel Kant',
    quote:
      '"Act only according to that maxim by which you can at the same time will that it should become a universal law."',
    courseThemes:
      "From Socrates refusing to stop philosophizing to Crito's escape plan, your journey kept returning to the question: what is owed? In the Black Mirror rating system, in Bacon's laboratory — you tended to honor obligation over calculation.",
    reflections: [
      'Your choices repeatedly honored duty over outcome — you treated certain obligations as binding regardless of the consequences of keeping them.',
      'A Kantian sense of principle surfaced throughout your journey: when rules conflicted with results, you tended to side with the rule.',
      'Even where pragmatism beckoned, you maintained awareness that some actions are wrong in themselves — not just in their effects.',
    ],
  },
  virtue: {
    label: 'Virtue Ethicist',
    tagline: 'The Character Builder',
    description:
      'You ask not "what should I do?" but "who should I be?" Like Aristotle, you believe virtue lies in character, and a life well-lived flows from cultivated excellence, practical wisdom, and the habits of a good person.',
    philosopher: 'Aristotle',
    quote: '"We are what we repeatedly do. Excellence, then, is not an act but a habit."',
    courseThemes:
      "Plato's philosopher who climbs from the cave and returns to help others, Simone Weil's rooted community member, the person who removes the mask they were given — these are the figures your choices most resembled.",
    reflections: [
      'Your choices revealed a persistent question about character: not what the rule requires, but what a good person would do in this situation.',
      'A virtue ethics sensibility shaped your path — courage, honesty, and integrity appeared as values worth honoring for their own sake, not just for their outcomes.',
      'While other frameworks provided scaffolding, you showed sensitivity to the question of moral formation: what do these choices make of me?',
    ],
  },
  existentialist: {
    label: 'Existentialist',
    tagline: 'The Authentic Rebel',
    description:
      'You embrace radical freedom. Like Sartre and Camus, you believe existence precedes essence — you define yourself entirely through your choices. Authenticity is the highest value, and no external code can relieve you of that burden.',
    philosopher: 'Jean-Paul Sartre',
    quote:
      '"Man is condemned to be free; because once thrown into the world, he is responsible for everything he does."',
    courseThemes:
      "Truman sailing through the wall. The prisoner climbing from the cave. The person removing the mask of gender performance. Your choices aligned with those who refuse to live inside a reality designed by someone else.",
    reflections: [
      'You consistently chose authenticity — the honest, self-defined path — even when it was costlier and lonelier than the managed alternative.',
      'An existentialist thread runs through your journey: you treated external codes and comfortable illusions with suspicion, preferring the truth of your own choosing.',
      'Though not always the dominant note, a refusal to accept performed or constructed identity surfaced at key moments in your path.',
    ],
  },
  stoic: {
    label: 'Stoic',
    tagline: 'The Resilient Sage',
    description:
      'You seek wisdom through acceptance. Like Marcus Aurelius and Epictetus, you know that some things lie outside your control, and lasting peace comes not from changing the world but from mastering your inner response to it.',
    philosopher: 'Marcus Aurelius',
    quote: '"You have power over your mind, not outside events. Realize this, and you will find strength."',
    courseThemes:
      "Socrates accepting his death rather than fleeing. Russell acknowledging the limits of what can be known. Simone Weil enduring uprootedness. These figures echo a Stoic discipline your choices often reflected.",
    reflections: [
      'Your choices showed equanimity — a willingness to accept difficult realities rather than resist what cannot be changed. You distinguished what is yours from what is not.',
      'A Stoic sense of proportion shaped your path: you often accepted constraint or obligation without resentment, focusing on what you could actually control.',
      'The Stoic thread was present but not dominant — you brought it forward in moments of tension between what is and what should be.',
    ],
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-gray-800" />
      {label && (
        <span className="text-gray-600 text-xs uppercase tracking-widest whitespace-nowrap px-1">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-gray-800" />
    </div>
  );
}

function AxisMeter({ axis }) {
  // value: -100 (full left) … +100 (full right)
  // position on track: 0% … 100%
  const pos = (axis.value + 100) / 2;
  const strong = Math.abs(axis.value) > 20;
  const desc = axis.value > 20
    ? axis.rightDescription
    : axis.value < -20
    ? axis.leftDescription
    : 'Balanced — you drew from both orientations in different scenarios.';

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-end gap-2">
        <div className="text-left min-w-0">
          <p className="text-gray-300 text-sm font-medium truncate">{axis.leftLabel}</p>
          <p className="text-gray-600 text-xs">{axis.leftPhilosopher}</p>
        </div>
        <div className="text-right min-w-0">
          <p className="text-gray-300 text-sm font-medium truncate">{axis.rightLabel}</p>
          <p className="text-gray-600 text-xs">{axis.rightPhilosopher}</p>
        </div>
      </div>

      {/* Track */}
      <div className="relative h-1 bg-gray-800 rounded-full">
        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 w-px h-3 bg-gray-700 -translate-x-px -translate-y-1/2" />
        {/* Fill toward dot from center */}
        <div
          className="absolute top-0 h-full bg-amber-700/40 rounded-full"
          style={{
            left:  pos < 50 ? `${pos}%`  : '50%',
            right: pos > 50 ? `${100 - pos}%` : '50%',
          }}
        />
        {/* Dot */}
        <div
          className="absolute top-1/2 w-3 h-3 rounded-full bg-amber-500 border-2 border-amber-300/80 shadow shadow-amber-900/60"
          style={{ left: `${pos}%`, transform: 'translateX(-50%) translateY(-50%)' }}
        />
      </div>

      <p className={`text-xs leading-relaxed ${strong ? 'text-gray-400' : 'text-gray-600'}`}>
        {desc}
      </p>
    </div>
  );
}

function PrimaryCard({ philosophyKey, percentage, archetype, profile, colors }) {
  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-8 space-y-6 animate-fade-up`}>
      {/* Archetype name */}
      <div className="space-y-1">
        <p className={`text-xs uppercase tracking-widest font-semibold ${colors.label}`}>
          Your philosophical archetype
        </p>
        <h2 className="text-3xl font-serif text-gray-100 leading-tight">{archetype.name}</h2>
        <p className={`text-sm ${colors.label}`}>
          Course parallel: <span className="italic">{archetype.courseHero}</span>
        </p>
      </div>

      <div className="w-10 h-px bg-gray-700" />

      {/* Core question */}
      <div className="space-y-1">
        <p className="text-gray-500 text-xs uppercase tracking-widest">Your defining question</p>
        <p className={`text-base font-serif italic ${colors.label}`}>"{archetype.coreQuestion}"</p>
      </div>

      {/* Description */}
      <p className="text-gray-300 leading-relaxed text-sm">{profile.description}</p>

      {/* Course connection */}
      <div className="bg-black/20 rounded-xl p-5 border border-gray-800/50 space-y-1.5">
        <p className={`text-xs uppercase tracking-widest ${colors.label}`}>In your journey</p>
        <p className="text-gray-400 text-sm leading-relaxed">{profile.courseThemes}</p>
      </div>

      {/* Shadow side */}
      <div className={`rounded-xl border ${colors.accent} px-5 py-4 space-y-1.5`}>
        <p className="text-gray-500 text-xs uppercase tracking-widest">The shadow side</p>
        <p className="text-gray-500 text-sm leading-relaxed italic">{archetype.shadow}</p>
      </div>

      {/* Quote */}
      <div className="space-y-1">
        <p className={`text-xs uppercase tracking-widest ${colors.label}`}>{profile.philosopher}</p>
        <p className="text-gray-500 text-sm italic leading-relaxed">{profile.quote}</p>
      </div>
    </div>
  );
}

function SecondaryCard({ rank, philosophyKey, percentage, profile, colors }) {
  const rankLabel = rank === 1 ? 'Secondary influence' : 'Tertiary influence';
  const reflection = profile.reflections[Math.min(rank, 2)];

  return (
    <div
      className={`rounded-xl border ${colors.border} ${colors.bg} p-6 space-y-3 animate-fade-up`}
      style={{ animationDelay: `${rank * 120}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <p className={`text-xs uppercase tracking-widest font-semibold ${colors.label}`}>{rankLabel}</p>
          <h3 className="text-xl font-serif text-gray-100">{profile.label}</h3>
          <p className={`text-xs ${colors.label}`}>{profile.tagline}</p>
        </div>
        <span className={`text-sm font-medium tabular-nums shrink-0 ${colors.label}`}>{percentage}%</span>
      </div>
      <div className="w-8 h-px bg-gray-700" />
      <p className="text-gray-400 text-sm leading-relaxed">{reflection}</p>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function ResultsPage({ userName, results, onRestart }) {
  const { percentages, dominant, archetype, axes, consistency, tensions } = results;
  const ranked = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
  const [firstKey, firstPct] = ranked[0];
  const top3 = ranked.slice(0, 3);
  const domColors = COLORS[dominant];
  const domProfile = PROFILES[dominant];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16">
      <div className="max-w-2xl w-full space-y-12">

        {/* Header */}
        <div className="text-center space-y-3 animate-fade-up">
          <p className="text-gray-600 text-xs uppercase tracking-[0.3em]">Philosophical Identity Report</p>
          <h1 className="text-4xl md:text-5xl font-serif text-amber-400">{userName}</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
            Thirteen dilemmas. One mirror. Here is what your choices reveal.
          </p>
        </div>

        <div className="w-16 h-px bg-amber-800/40 mx-auto animate-fade-in anim-delay-150" />

        {/* Primary archetype card */}
        <PrimaryCard
          philosophyKey={dominant}
          percentage={firstPct}
          archetype={archetype}
          profile={domProfile}
          colors={domColors}
        />

        {/* Secondary + Tertiary */}
        <div className="space-y-4">
          {top3.slice(1).map(([key, pct], i) => (
            <SecondaryCard
              key={key}
              rank={i + 1}
              philosophyKey={key}
              percentage={pct}
              profile={PROFILES[key]}
              colors={COLORS[key]}
            />
          ))}
        </div>

        {/* Dimensional axes */}
        <div className="space-y-6 animate-fade-up anim-delay-300">
          <SectionDivider label="Philosophical dimensions" />
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800/60 p-7 space-y-8">
            <p className="text-gray-500 text-xs leading-relaxed">
              Each axis shows where your choices landed between two opposing philosophical orientations.
              The dot marks your position; center means you balanced both.
            </p>
            {axes.map((axis) => (
              <AxisMeter key={axis.id} axis={axis} />
            ))}
          </div>
        </div>

        {/* Consistency + tensions */}
        <div className="space-y-6 animate-fade-up anim-delay-500">
          <SectionDivider label="Consistency analysis" />
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800/60 p-7 space-y-6">

            {/* Consistency score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-gray-300 text-sm font-medium">{consistency.label}</p>
                <span className="text-gray-600 text-xs tabular-nums">{consistency.score}/100</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-1">
                <div
                  className="bg-amber-600 h-1 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${consistency.score}%` }}
                />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{consistency.description}</p>
            </div>

            {/* Tensions — only shown if detected */}
            {tensions.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-gray-800">
                <p className="text-gray-500 text-xs uppercase tracking-widest">
                  Philosophical tensions detected
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  In the following scenarios, your choice pulled against your dominant pattern — a sign of genuine moral complexity rather than inconsistency.
                </p>
                <div className="space-y-3">
                  {tensions.map((t, i) => (
                    <div key={i} className="rounded-lg border border-gray-800 bg-gray-900/40 px-4 py-3 space-y-1">
                      <div className="flex items-baseline gap-2">
                        <p className="text-gray-300 text-sm font-medium">{t.scenarioTitle}</p>
                        <p className="text-gray-600 text-xs shrink-0">{t.scenarioSource}</p>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{t.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Complete spectrum */}
        <div className="space-y-5 animate-fade-up anim-delay-700">
          <SectionDivider label="Complete philosophical spectrum" />
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800/60 p-6 space-y-5">
            {ranked.map(([key, pct], i) => {
              const c = COLORS[key];
              const p = PROFILES[key];
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                      <span className={`text-sm font-medium ${c.label}`}>{p.label}</span>
                      <span className="text-gray-600 text-xs hidden sm:inline">{p.tagline}</span>
                    </div>
                    <span className="text-gray-500 tabular-nums text-xs">{pct}%</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-1.5">
                    <div
                      className={`${c.bar} h-1.5 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${pct}%`, transitionDelay: `${i * 80}ms` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-900 pt-8 space-y-5 text-center animate-fade-in anim-delay-700">
          <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
            Philosophy Mirror reflects patterns in moral reasoning — not a fixed identity.
            Plato would remind you: the examined life is the one that keeps questioning its own answers.
          </p>
          <button
            onClick={onRestart}
            className="text-amber-700 hover:text-amber-500 text-sm underline underline-offset-4 transition-colors"
          >
            Take the mirror again
          </button>
        </div>

      </div>
    </div>
  );
}
