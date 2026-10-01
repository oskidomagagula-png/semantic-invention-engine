// Semantic word mining engine
// Extracts and deconstructs concepts from natural language input

const MORPHEME_PATTERNS = {
  photo: 'light',
  bio: 'life',
  hydro: 'water',
  aero: 'air',
  lysis: 'splitting',
  synthesis: 'joining',
  kinetic: 'motion',
  thermal: 'heat',
  crypto: 'hidden',
  quantum: 'discrete units',
};

const SEMANTIC_POOLS = {
  nouns: [
    'chitin', 'graphene', 'plasma', 'biomass', 'memory',
    'lattice', 'sensor', 'drone', 'root', 'light',
    'quantum', 'polymer', 'algorithm', 'genome', 'crystal',
    'enzyme', 'fossil', 'alloy', 'fiber', 'nucleus',
  ],
  verbs: [
    'absorb', 'optimize', 'compress', 'transmit', 'stabilize',
    'track', 'adapt', 'synthesize', 'filter', 'evolve',
    'amplify', 'degrade', 'regenerate', 'detect', 'modulate',
    'mitigate', 'cascade', 'resonate', 'stratify', 'diffuse',
  ],
  domains: [
    'aerospace', 'biotech', 'agritech', 'software', 'materials',
    'robotics', 'healthcare', 'energy', 'climate', 'finance',
    'quantum', 'neural', 'marine', 'terrestrial', 'orbital',
    'cellular', 'synthetic', 'embedded', 'distributed', 'hybrid',
  ],
  constraints: [
    'low-energy', 'scalable', 'autonomous', 'real-time', 'resilient',
    'modular', 'bio-compatible', 'non-invasive', 'distributed', 'adaptive',
  ],
};

export class SemanticMiner {
  constructor() {
    this.tokenCache = new Map();
  }

  // Extract functional morphemes from text
  extractMorphemes(text) {
    const tokens = text.toLowerCase().match(/[a-z]+/g) || [];
    const morphemes = [];

    tokens.forEach((token) => {
      Object.entries(MORPHEME_PATTERNS).forEach(([prefix, meaning]) => {
        if (token.includes(prefix)) {
          morphemes.push({ prefix, meaning, source: token });
        }
      });
    });

    return morphemes;
  }

  // Tokenize and classify input text
  extract(text) {
    const tokens = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter((t) => t.length > 2);

    const nouns = tokens.filter((t) => SEMANTIC_POOLS.nouns.includes(t));
    const verbs = tokens.filter((t) => SEMANTIC_POOLS.verbs.includes(t));
    const domains = tokens.filter((t) => SEMANTIC_POOLS.domains.includes(t));
    const constraints = tokens.filter((t) => SEMANTIC_POOLS.constraints.includes(t));

    const morphemes = this.extractMorphemes(text);

    return {
      rawTokens: tokens,
      nouns: nouns.length > 0 ? nouns : [this.pickRandom(SEMANTIC_POOLS.nouns)],
      verbs: verbs.length > 0 ? verbs : [this.pickRandom(SEMANTIC_POOLS.verbs)],
      domains: domains.length > 0 ? domains : [this.pickRandom(SEMANTIC_POOLS.domains)],
      constraints: constraints.length > 0 ? constraints : ['scalable'],
      morphemes,
      tokenCount: tokens.length,
    };
  }

  // Generate inventive scenarios from extracted concepts
  generateScenarios(extraction, count = 3) {
    const scenarios = [];

    for (let i = 0; i < count; i++) {
      const noun = this.pickRandom(extraction.nouns);
      const verb = this.pickRandom(extraction.verbs);
      const domain = this.pickRandom(extraction.domains);
      const constraint = this.pickRandom(extraction.constraints);

      const scenarioText = `How can ${noun}-based systems ${verb} performance in ${domain} environments while maintaining ${constraint} characteristics?`;

      scenarios.push({
        id: `scenario-${Date.now()}-${i}`,
        text: scenarioText,
        concepts: [noun, verb, domain],
        domain,
        constraint,
        semanticDistance: this.calculateSemanticDistance([noun, domain]),
      });
    }

    return scenarios;
  }

  // Simple semantic distance calculation
  // In a real system, this would use vector embeddings
  calculateSemanticDistance(concepts) {
    const scores = {
      aerospace: 95,
      biotech: 90,
      quantum: 88,
      marine: 85,
      terrestrial: 78,
      healthcare: 82,
      robotics: 80,
    };

    return scores[concepts[1]] || Math.floor(Math.random() * 30) + 70;
  }

  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
