import { useMemo, useState } from 'react';

const seedIdeas = [
  {
    id: 1,
    title: 'Bioactive lattice shells',
    domain: 'Materials Science',
    score: 92,
    conceptPair: ['chitin', 'absorb', 'aerospace'],
    trigger: 'How can chitin-based crystalline matrices absorb micro-meteorite kinetic energy in low-Earth orbit vessels?',
    rationale: 'Combines biological structural strength with energy dissipation pathways for aerospace protection.',
    status: 'High-innovation potential',
  },
  {
    id: 2,
    title: 'Autonomous micro-planting swarm',
    domain: 'AgriTech',
    score: 88,
    conceptPair: ['root', 'optimize', 'drone'],
    trigger: 'How could root-pattern optimization algorithms guide autonomous drones to seed and monitor degraded terrain?',
    rationale: 'Links biological growth heuristics with autonomous field optimization and robotic actuation.',
    status: 'Promising field crossover',
  },
  {
    id: 3,
    title: 'Adaptive telemetry memory',
    domain: 'Systems Design',
    score: 81,
    conceptPair: ['memory', 'compress', 'sensor'],
    trigger: 'How can memory compression techniques improve edge sensor data retention in real-time urban networks?',
    rationale: 'Reframes information compression as an adaptive systems problem for edge intelligence.',
    status: 'Mission-relevant',
  },
];

const lexicalPools = {
  nouns: ['chitin', 'graphene', 'plasma', 'biomass', 'memory', 'lattice', 'sensor', 'drone', 'root', 'light'],
  verbs: ['absorb', 'optimize', 'compress', 'transmit', 'stabilize', 'track', 'adapt', 'synthesize', 'filter', 'evolve'],
  domains: ['aerospace', 'biotech', 'agritech', 'software', 'materials', 'robotics', 'healthcare', 'energy', 'climate', 'finance'],
};

const buildScenarios = (text) => {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const nouns = tokens.filter((token) => lexicalPools.nouns.includes(token));
  const verbs = tokens.filter((token) => lexicalPools.verbs.includes(token));
  const domains = tokens.filter((token) => lexicalPools.domains.includes(token));

  const selectedNoun = nouns[0] || lexicalPools.nouns[0];
  const selectedVerb = verbs[0] || lexicalPools.verbs[1];
  const selectedDomain = domains[0] || lexicalPools.domains[2];

  const score = Math.min(97, Math.max(65, 72 + (nouns.length + verbs.length + domains.length) * 5));

  const scenario = `How can ${selectedNoun}-based systems ${selectedVerb} performance in ${selectedDomain} environments under constrained operating conditions?`;

  return {
    seed: { noun: selectedNoun, verb: selectedVerb, domain: selectedDomain },
    scenario,
    score: Math.round(score),
  };
};

function App() {
  const [query, setQuery] = useState('semantic mining for low-energy adaptive materials');
  const [concepts, setConcepts] = useState(seedIdeas);

  const generated = useMemo(() => buildScenarios(query), [query]);

  const handleGenerate = () => {
    const nextScenario = buildScenarios(query);
    const newIdea = {
      id: Date.now(),
      title: nextScenario.seed.noun + ' + ' + nextScenario.seed.verb,
      domain: nextScenario.seed.domain,
      score: nextScenario.score,
      conceptPair: [nextScenario.seed.noun, nextScenario.seed.verb, nextScenario.seed.domain],
      trigger: nextScenario.scenario,
      rationale: 'AI-generated synthesis of semantic relationship pathways and engineering constraints.',
      status: nextScenario.score > 85 ? 'High probability of invention' : 'Feasibility in review',
    };

    setConcepts((prev) => [newIdea, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Semantic invention engine</p>
            <h1 className="mt-2 text-3xl font-semibold">Inventive scenario generation</h1>
          </div>
          <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
            Prototype v0.1
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/50 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-slate-200">Brainstorm workspace</h2>
              <button
                onClick={handleGenerate}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
              >
                Generate idea
              </button>
            </div>

            <div className="rounded-[18px] border border-slate-700 bg-slate-950/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_24px_rgba(0,0,0,0.3)] focus-within:border-cyan-400 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.4)]">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={4}
                className="w-full resize-none border-0 bg-transparent p-3 text-base text-slate-100 outline-none placeholder:text-slate-400"
                placeholder="Describe a challenge, concept, or technology blend..."
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Semantic core</div>
                <div className="mt-3 text-lg font-medium text-cyan-300">{generated.seed.noun}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Action verb</div>
                <div className="mt-3 text-lg font-medium text-violet-300">{generated.seed.verb}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Target field</div>
                <div className="mt-3 text-lg font-medium text-emerald-300">{generated.seed.domain}</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.24em] text-cyan-200">Generated scenario</span>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-100">
                  {generated.score}/100
                </span>
              </div>
              <p className="mt-3 text-lg text-slate-100">{generated.scenario}</p>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-lg font-medium text-slate-200">Innovation heuristics</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">Semantic distance scoring across concept clusters</li>
                <li className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">Cross-domain patent and literature gap analysis</li>
                <li className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">TRIZ-inspired contradiction reduction</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-lg font-medium text-slate-200">Idea queue</h3>
              <div className="mt-4 space-y-3">
                {concepts.map((idea) => (
                  <div key={idea.id} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-100">{idea.title}</span>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                        {idea.score}
                      </span>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{idea.domain}</p>
                    <p className="mt-2 text-sm text-slate-300">{idea.trigger}</p>
                    <p className="mt-2 text-xs text-slate-400">{idea.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
