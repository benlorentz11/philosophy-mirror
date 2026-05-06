const scenarios = require('./scenarios.json');

const PHILOSOPHY_LABELS = {
  utilitarian: 'Utilitarian',
  kantian: 'Kantian',
  virtue: 'Virtue Ethicist',
  existentialist: 'Existentialist',
  stoic: 'Stoic',
};

const PHILOSOPHY_PROFILES = {
  utilitarian: {
    tagline: 'The Greater Good Thinker',
    description:
      'You weigh outcomes above all else. Like Bentham and Mill, you believe the right action produces the greatest happiness for the greatest number. Your moral compass points toward impact, not intention.',
    philosopher: 'John Stuart Mill',
    quote:
      '"The creed which accepts as the foundation of morals utility, or the greatest happiness principle, holds that actions are right in proportion as they tend to promote happiness."',
  },
  kantian: {
    tagline: 'The Principled Idealist',
    description:
      'You live by principles. Like Kant, you believe in universal moral laws that must hold regardless of consequence. Duty calls you to act rightly even when it is costly — because the right act is right in itself, not for what it produces.',
    philosopher: 'Immanuel Kant',
    quote:
      '"Act only according to that maxim by which you can at the same time will that it should become a universal law."',
  },
  virtue: {
    tagline: 'The Character Builder',
    description:
      'You ask not "what should I do?" but "who should I be?" Like Aristotle, you believe virtue lies in character, and a life well-lived flows from cultivated excellence, practical wisdom, and the habits of a good person.',
    philosopher: 'Aristotle',
    quote: '"We are what we repeatedly do. Excellence, then, is not an act but a habit."',
  },
  existentialist: {
    tagline: 'The Authentic Rebel',
    description:
      'You embrace radical freedom. Like Sartre and Camus, you believe existence precedes essence — you define yourself entirely through your choices. Authenticity is the highest value, and no external code can relieve you of that burden.',
    philosopher: 'Jean-Paul Sartre',
    quote:
      '"Man is condemned to be free; because once thrown into the world, he is responsible for everything he does."',
  },
  stoic: {
    tagline: 'The Resilient Sage',
    description:
      'You seek wisdom through acceptance. Like Marcus Aurelius and Epictetus, you know that some things lie outside your control, and lasting peace comes not from changing the world but from mastering your inner response to it.',
    philosopher: 'Marcus Aurelius',
    quote: '"You have power over your mind, not outside events. Realize this, and you will find strength."',
  },
};

function calculateProfile(answers) {
  const totals = { utilitarian: 0, kantian: 0, virtue: 0, existentialist: 0, stoic: 0 };

  for (const { scenarioId, choiceId } of answers) {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) continue;
    const choice = scenario.choices.find((c) => c.id === choiceId);
    if (!choice) continue;
    for (const [dim, val] of Object.entries(choice.scores)) {
      if (totals[dim] !== undefined) totals[dim] += val;
    }
  }

  // Shift all values so the minimum is 0
  const min = Math.min(...Object.values(totals));
  const shifted = {};
  for (const [k, v] of Object.entries(totals)) {
    shifted[k] = v - min;
  }

  const sum = Object.values(shifted).reduce((a, b) => a + b, 0);
  const percentages = {};
  for (const [k, v] of Object.entries(shifted)) {
    percentages[k] = sum > 0 ? Math.round((v / sum) * 100) : 20;
  }

  // Dominant philosophy is the highest-scoring dimension
  const dominant = Object.entries(percentages).sort((a, b) => b[1] - a[1])[0][0];

  return {
    percentages,
    dominant,
    dominantLabel: PHILOSOPHY_LABELS[dominant],
    profile: PHILOSOPHY_PROFILES[dominant],
  };
}

module.exports = { calculateProfile, PHILOSOPHY_LABELS, PHILOSOPHY_PROFILES };
