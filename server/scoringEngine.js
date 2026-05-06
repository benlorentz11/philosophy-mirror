const scenarios = require('./scenarios.json');

// ─── Labels ────────────────────────────────────────────────────────────────

const PHILOSOPHY_LABELS = {
  utilitarian:    'Utilitarian',
  kantian:        'Kantian',
  virtue:         'Virtue Ethicist',
  existentialist: 'Existentialist',
  stoic:          'Stoic',
};

// ─── Archetypes (narrative identity tied to course readings) ────────────────

const ARCHETYPES = {
  utilitarian: {
    name: 'The Compassionate Calculator',
    courseHero: "Bacon's scientist of Salomon's House",
    coreQuestion: 'What produces the most good for the most people?',
    shadow:
      "The risk: when consequences become the only currency, individuals can be sacrificed for the collective — as Bacon's researchers discovered when they decided which knowledge to withhold and which populations to use.",
  },
  kantian: {
    name: 'The Legislator of Conscience',
    courseHero: 'Socrates before the jury in the Apology',
    coreQuestion: 'What is owed — regardless of what it costs me?',
    shadow:
      "The risk: rigid principle can become indifferent to real human suffering. Socrates chose death over compromise — principled, yes, but it left his students without their teacher and Athens without its most persistent question-asker.",
  },
  virtue: {
    name: 'The Cultivated Soul',
    courseHero: "Plato's philosopher who returns to the cave",
    coreQuestion: 'What kind of person am I becoming through these choices?',
    shadow:
      "The risk: character-focus can shade into self-absorption — the philosopher who climbs into the sunlight and quietly prefers it there, rather than descending back to guide the others.",
  },
  existentialist: {
    name: 'The Authentic Rebel',
    courseHero: 'Truman sailing toward the wall',
    coreQuestion: 'Am I actually living the life I have chosen?',
    shadow:
      "The risk: radical self-determination can become isolation. Truman escaped the dome — but had no map, and those who cared for him, however scripted their care, were left behind.",
  },
  stoic: {
    name: 'The Steadfast Sage',
    courseHero: 'Socrates in his final hours in the Phaedo',
    coreQuestion: 'What is genuinely within my control — and what must I release?',
    shadow:
      "The risk: wise acceptance can shade into passivity. Forster's machine-dwellers practiced a kind of stoic contentment — and when the machine finally stopped, they had forgotten how to live without it.",
  },
};

// ─── Full Profiles (description, quote, course themes) ────────────────────

const PHILOSOPHY_PROFILES = {
  utilitarian: {
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

// ─── Axes ──────────────────────────────────────────────────────────────────

function calculateAxes(rawTotals) {
  const { utilitarian: u, kantian: k, virtue: v, existentialist: e, stoic: s } = rawTotals;

  // Normalize a raw difference to -100…+100, saturating at ±40
  const norm = (diff) => Math.max(-100, Math.min(100, Math.round((diff / 40) * 100)));

  return [
    {
      id: 'pc',
      leftLabel: 'Consequence',
      rightLabel: 'Principle',
      leftPhilosopher: 'Mill',
      rightPhilosopher: 'Kant / Socrates',
      leftDescription: 'You judge actions by the outcomes they produce.',
      rightDescription: 'You judge actions by their inherent rightness, independent of outcome.',
      value: norm(k - u),
    },
    {
      id: 'aa',
      leftLabel: 'Acceptance',
      rightLabel: 'Authenticity',
      leftPhilosopher: 'Marcus Aurelius',
      rightPhilosopher: 'Sartre / Truman',
      leftDescription: 'You master your response to an imperfect world rather than fight it.',
      rightDescription: 'You refuse to inhabit a reality you did not choose for yourself.',
      value: norm(e - s),
    },
    {
      id: 'ci',
      leftLabel: 'Impact',
      rightLabel: 'Character',
      leftPhilosopher: 'Bentham',
      rightPhilosopher: 'Aristotle',
      leftDescription: 'Morality is measured by what an action produces in the world.',
      rightDescription: 'Morality is measured by who you become through your choices.',
      value: norm(v - u),
    },
    {
      id: 'su',
      leftLabel: 'Universal Law',
      rightLabel: 'Self-Determination',
      leftPhilosopher: 'Kant',
      rightPhilosopher: 'Sartre',
      leftDescription: 'Your principles must be ones any person could consistently hold.',
      rightDescription: 'You define your own essence — no external code speaks for you.',
      value: norm(e - k),
    },
  ];
}

// ─── Consistency ───────────────────────────────────────────────────────────

function calculateConsistency(percentages) {
  const max = Math.max(...Object.values(percentages));
  // max=20 (perfectly even) → 0; max=100 (all weight on one) → 100
  return Math.max(0, Math.min(100, Math.round(((max - 20) / 80) * 100)));
}

function getConsistencyProfile(score) {
  if (score >= 60) {
    return {
      label: 'Highly Consistent',
      description:
        'Your reasoning forms a tight, coherent pattern. You returned to the same moral foundation across very different scenarios — a sign of deeply held conviction.',
    };
  }
  if (score >= 35) {
    return {
      label: 'Predominantly Consistent',
      description:
        'A clear tendency runs through your choices, with occasional divergence. You have a dominant orientation, but you are responsive to context — your principles bend without breaking.',
    };
  }
  if (score >= 15) {
    return {
      label: 'Philosophically Pluralistic',
      description:
        'You draw from multiple traditions rather than committing to one. This may reflect a genuinely eclectic moral outlook — or the honest recognition that different situations call for different frameworks.',
    };
  }
  return {
    label: 'Philosophically Conflicted',
    description:
      'Your choices reveal genuine tension between competing values. You may be working through a real conflict — or you refused to let any single framework dominate. Plato would say you are still ascending from the cave.',
  };
}

// ─── Tensions ──────────────────────────────────────────────────────────────

function findTensions(answers, rawTotals) {
  const sortedDims = Object.entries(rawTotals).sort((a, b) => b[1] - a[1]);
  const dominant = sortedDims[0][0];
  const weakest = sortedDims[sortedDims.length - 1][0];
  const tensions = [];

  for (const { scenarioId, choiceId } of answers) {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) continue;
    const choice = scenario.choices.find((c) => c.id === choiceId);
    if (!choice) continue;

    const dominantScore = choice.scores[dominant];
    const weakestScore = choice.scores[weakest];

    // Choice actively penalized the dominant tendency and rewarded the weakest
    if (dominantScore <= -2 && weakestScore >= 2) {
      tensions.push({
        scenarioTitle: scenario.title,
        scenarioSource: scenario.source,
        note: `Here you moved away from ${PHILOSOPHY_LABELS[dominant]} reasoning and toward ${PHILOSOPHY_LABELS[weakest]} — your least characteristic mode.`,
      });
    } else if (dominantScore <= -2) {
      tensions.push({
        scenarioTitle: scenario.title,
        scenarioSource: scenario.source,
        note: `This was your most divergent choice — it actively pulled against your characteristic pattern of reasoning.`,
      });
    }
  }

  return tensions.slice(0, 2);
}

// ─── Main profile calculation ───────────────────────────────────────────────

function calculateProfile(answers) {
  const rawTotals = { utilitarian: 0, kantian: 0, virtue: 0, existentialist: 0, stoic: 0 };

  for (const { scenarioId, choiceId } of answers) {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) continue;
    const choice = scenario.choices.find((c) => c.id === choiceId);
    if (!choice) continue;
    for (const [dim, val] of Object.entries(choice.scores)) {
      if (rawTotals[dim] !== undefined) rawTotals[dim] += val;
    }
  }

  // Shift so minimum is 0, then convert to percentages
  const min = Math.min(...Object.values(rawTotals));
  const shifted = {};
  for (const [k, v] of Object.entries(rawTotals)) shifted[k] = v - min;

  const sum = Object.values(shifted).reduce((a, b) => a + b, 0);
  const percentages = {};
  for (const [k, v] of Object.entries(shifted)) {
    percentages[k] = sum > 0 ? Math.round((v / sum) * 100) : 20;
  }

  const dominant = Object.entries(percentages).sort((a, b) => b[1] - a[1])[0][0];
  const consistencyScore = calculateConsistency(percentages);

  return {
    percentages,
    dominant,
    dominantLabel: PHILOSOPHY_LABELS[dominant],
    profile: PHILOSOPHY_PROFILES[dominant],
    archetype: ARCHETYPES[dominant],
    axes: calculateAxes(rawTotals),
    consistency: {
      score: consistencyScore,
      ...getConsistencyProfile(consistencyScore),
    },
    tensions: findTensions(answers, rawTotals),
  };
}

module.exports = { calculateProfile, PHILOSOPHY_LABELS, PHILOSOPHY_PROFILES };
