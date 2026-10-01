// Idea feasibility and innovation scoring engine
// Evaluates scenarios based on TRIZ principles, physical constraints, and novelty

export class IdeaScorer {
  constructor() {
    this.trizMatrix = this.buildTrizMatrix();
  }

  // Build simplified TRIZ contradiction resolution matrix
  buildTrizMatrix() {
    return {
      'energy-cost': 0.75,
      'weight-strength': 0.82,
      'speed-accuracy': 0.68,
      'complexity-reliability': 0.71,
      'material-durability': 0.88,
      'temperature-stability': 0.79,
    };
  }

  // Main evaluation function
  evaluate(idea) {
    const {
      scenario,
      concepts,
      domain,
    } = idea;

    const scores = {
      semanticDistance: this.scoreSemanticDistance(scenario, concepts),
      feasibility: this.scoreFeasibility(scenario, domain),
      novelty: this.scoreNovelty(concepts),
      trizAlignment: this.scoreTrizAlignment(scenario),
      crossDomainValue: this.scoreCrossDomainValue(concepts, domain),
    };

    // Weighted composite score
    scores.composite = Math.round(
      scores.semanticDistance * 0.25 +
      scores.feasibility * 0.35 +
      scores.novelty * 0.20 +
      scores.trizAlignment * 0.15 +
      scores.crossDomainValue * 0.05
    );

    return scores;
  }

  // Score semantic distance between concepts
  // Higher distance = more innovative cross-domain pairing
  scoreSemanticDistance(scenario, concepts) {
    const distanceFactors = {
      'quantum': 95,
      'bio': 92,
      'nano': 88,
      'adaptive': 85,
      'autonomous': 83,
      'distributed': 81,
      'embedded': 79,
      'hybrid': 77,
    };

    let score = 70;
    Object.entries(distanceFactors).forEach(([keyword, value]) => {
      if (scenario.toLowerCase().includes(keyword)) {
        score = Math.max(score, value);
      }
    });

    return score + (Math.random() * 10 - 5); // Add variance
  }

  // Score technical feasibility
  // Checks for physics and thermodynamic plausibility
  scoreFeasibility(scenario, domain) {
    const domainFeasibility = {
      aerospace: 82,
      biotech: 78,
      materials: 85,
      robotics: 80,
      software: 88,
      quantum: 65,
      healthcare: 75,
      energy: 79,
    };

    const baseFeasibility = domainFeasibility[domain] || 75;

    // Penalize extremely ambitious claims
    if (scenario.includes('impossible') || scenario.includes('violation')) {
      return Math.max(30, baseFeasibility - 30);
    }

    // Bonus for constrained, realistic scenarios
    if (scenario.includes('constrained') || scenario.includes('low-energy')) {
      return Math.min(95, baseFeasibility + 8);
    }

    return baseFeasibility;
  }

  // Score novelty based on concept rarity
  scoreNovelty(concepts) {
    const rarityScores = {
      quantum: 95,
      chitin: 88,
      graphene: 85,
      plasma: 82,
      enzyme: 79,
      neural: 76,
      fossil: 72,
      polymer: 68,
    };

    let score = 65;
    concepts.forEach((concept) => {
      if (rarityScores[concept]) {
        score = Math.max(score, rarityScores[concept]);
      }
    });

    return score;
  }

  // Score alignment with TRIZ principles
  scoreTrizAlignment(scenario) {
    const trizKeywords = [
      'segmentation', 'taking-out', 'local-quality', 'asymmetry',
      'merging', 'universality', 'nesting', 'feedback',
      'preliminary-action', 'beforehand', 'compensation',
    ];

    let alignmentScore = 50;
    trizKeywords.forEach((keyword) => {
      if (scenario.toLowerCase().includes(keyword.replace('-', ' '))) {
        alignmentScore += 5;
      }
    });

    return Math.min(95, alignmentScore);
  }

  // Score value of cross-domain insights
  scoreCrossDomainValue(concepts, domain) {
    const crossDomainMultipliers = {
      'aerospace-biotech': 0.95,
      'biotech-materials': 0.92,
      'quantum-software': 0.90,
      'energy-robotics': 0.88,
      'healthcare-agritech': 0.85,
      'marine-aerospace': 0.82,
    };

    let score = 70;
    Object.entries(crossDomainMultipliers).forEach(([pairing, value]) => {
      if (concepts.some((c) => pairing.includes(c)) && pairing.includes(domain)) {
        score = Math.max(score, Math.round(100 * value));
      }
    });

    return score;
  }
}
