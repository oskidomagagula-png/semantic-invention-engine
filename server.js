import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { SemanticMiner } from './src/engine/SemanticMiner.js';
import { IdeaScorer } from './src/engine/IdeaScorer.js';
import { PatentMatcher } from './src/engine/PatentMatcher.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const miner = new SemanticMiner();
const scorer = new IdeaScorer();
const patentMatcher = new PatentMatcher();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Semantic mining endpoint
app.post('/api/mine', async (req, res) => {
  try {
    const { query, limit = 5 } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query is required and must be a non-empty string' });
    }

    const miningResult = miner.extract(query);
    const scenarios = miner.generateScenarios(miningResult, limit);

    res.json({
      success: true,
      miningResult,
      scenarios,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Mining error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Scoring endpoint
app.post('/api/score', async (req, res) => {
  try {
    const { scenario, concepts, domain } = req.body;

    if (!scenario || !concepts || !domain) {
      return res.status(400).json({ error: 'scenario, concepts, and domain are required' });
    }

    const scores = scorer.evaluate({
      scenario,
      concepts,
      domain,
    });

    res.json({
      success: true,
      scores,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Scoring error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Patent matching endpoint (simulated)
app.post('/api/patent-match', async (req, res) => {
  try {
    const { scenario, concepts } = req.body;

    if (!scenario || !concepts) {
      return res.status(400).json({ error: 'scenario and concepts are required' });
    }

    const matches = patentMatcher.search(scenario, concepts);

    res.json({
      success: true,
      priorArtDensity: matches.density,
      existingPatents: matches.patents,
      noveltyScore: matches.noveltyScore,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Patent matching error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Batch idea generation and scoring
app.post('/api/generate-ideas', async (req, res) => {
  try {
    const { query, count = 3 } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query is required and must be a non-empty string' });
    }

    const miningResult = miner.extract(query);
    const scenarios = miner.generateScenarios(miningResult, count);

    const ideas = scenarios.map((scenario, idx) => {
      const scores = scorer.evaluate({
        scenario: scenario.text,
        concepts: scenario.concepts,
        domain: scenario.domain,
      });

      const patents = patentMatcher.search(scenario.text, scenario.concepts);

      return {
        id: Date.now() + idx,
        title: `${scenario.concepts[0]} + ${scenario.concepts[1]}`,
        scenario: scenario.text,
        concepts: scenario.concepts,
        domain: scenario.domain,
        scores,
        patents,
        overallScore: Math.round(
          (scores.semanticDistance * 0.3 +
            scores.feasibility * 0.4 +
            (100 - patents.density) * 0.3) /
            3,
        ),
      };
    });

    res.json({
      success: true,
      ideas,
      totalGenerated: ideas.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Idea generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Semantic Invention Engine API running on http://localhost:${PORT}`);
  console.log(`📊 POST /api/mine - Extract semantic concepts`);
  console.log(`🎯 POST /api/score - Evaluate idea feasibility`);
  console.log(`📜 POST /api/patent-match - Check prior art`);
  console.log(`💡 POST /api/generate-ideas - Full pipeline\n`);
});
