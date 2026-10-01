// Prior art and patent matching engine
// Simulates patent database search and prior art density calculation

export class PatentMatcher {
  constructor() {
    this.mockPatentDatabase = this.buildMockDatabase();
  }

  // Build mock patent database for simulation
  buildMockDatabase() {
    return [
      {
        id: 'US10987654',
        title: 'Chitinous composites for aerospace applications',
        concepts: ['chitin', 'composite', 'aerospace'],
        year: 2019,
        relevance: 0.92,
      },
      {
        id: 'US10654321',
        title: 'Adaptive polymer matrices',
        concepts: ['polymer', 'adaptive', 'materials'],
        year: 2020,
        relevance: 0.78,
      },
      {
        id: 'WO2021098765',
        title: 'Quantum-enhanced sensor networks',
        concepts: ['quantum', 'sensor', 'network'],
        year: 2021,
        relevance: 0.85,
      },
      {
        id: 'US11234567',
        title: 'Biomimetic drone swarms',
        concepts: ['biomimetic', 'drone', 'swarm'],
        year: 2022,
        relevance: 0.88,
      },
      {
        id: 'EP3456789',
        title: 'Self-healing materials for aerospace',
        concepts: ['self-healing', 'material', 'aerospace'],
        year: 2021,
        relevance: 0.81,
      },
    ];
  }

  // Search for related patents
  search(scenario, concepts) {
    const matches = [];
    const scenarioLower = scenario.toLowerCase();

    // Find patents with overlapping concepts
    this.mockPatentDatabase.forEach((patent) => {
      let relevanceScore = 0;

      concepts.forEach((concept) => {
        if (patent.concepts.some((pc) => pc.includes(concept) || concept.includes(pc))) {
          relevanceScore += 0.3;
        }
      });

      if (patent.title.toLowerCase().split(' ').some((word) => scenarioLower.includes(word))) {
        relevanceScore += 0.2;
      }

      if (relevanceScore > 0.3) {
        matches.push({
          ...patent,
          calculatedRelevance: Math.min(0.99, relevanceScore),
        });
      }
    });

    // Sort by relevance
    matches.sort((a, b) => b.calculatedRelevance - a.calculatedRelevance);

    const density = Math.min(100, Math.round((matches.length / this.mockPatentDatabase.length) * 100));
    const noveltyScore = Math.max(10, 100 - density - (matches.length * 8));

    return {
      patents: matches.slice(0, 5), // Top 5 matches
      density, // Prior art density as percentage
      noveltyScore, // Higher = more novel
      totalMatches: matches.length,
      recommendation: this.generateRecommendation(density, noveltyScore),
    };
  }

  // Generate patent analysis recommendation
  generateRecommendation(density, noveltyScore) {
    if (noveltyScore > 80) {
      return 'High novelty potential. Consider patenting.'; 
    } else if (noveltyScore > 60) {
      return 'Moderate novelty. Significant differentiation from prior art recommended.';
    } else if (noveltyScore > 40) {
      return 'Limited novelty. Focus on unique implementation or application.';
    } else {
      return 'Low novelty. Concept closely matches existing patents. Explore alternative angles.';
    }
  }
}
