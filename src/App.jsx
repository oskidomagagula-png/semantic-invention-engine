import { useState, useCallback } from 'react';
import { generateIdeas, mineQuery, scoreIdea, checkPatents } from '../services/api';
import ChatInput from './ChatInput';
import IdeaCard from './IdeaCard';
import ScoreBreakdown from './ScoreBreakdown';
import PatentAnalysis from './PatentAnalysis';

function App() {
  const [query, setQuery] = useState('semantic mining for low-energy adaptive materials');
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ mined: 0, generated: 0, avgScore: 0 });

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateIdeas(query, 5);

      if (result.success && result.ideas) {
        const processedIdeas = result.ideas.map((idea) => ({
          ...idea,
          timestamp: new Date().toISOString(),
        }));

        setIdeas(processedIdeas);
        setSelectedIdea(processedIdeas[0] || null);

        const avgScore = Math.round(
          processedIdeas.reduce((sum, idea) => sum + (idea.overallScore || 0), 0) /
            processedIdeas.length,
        );

        setStats({
          mined: result.ideas.length,
          generated: result.totalGenerated,
          avgScore,
        });
      } else {
        setError('Failed to generate ideas. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while generating ideas.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleSelectIdea = useCallback((idea) => {
    setSelectedIdea(idea);
  }, []);

  const handleQueryChange = useCallback((newQuery) => {
    setQuery(newQuery);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Semantic invention engine</p>
            <h1 className="mt-2 text-4xl font-bold">Inventive scenario generation</h1>
          </div>
          <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-200">
            Live API Connected
          </div>
        </header>

        {/* Main grid */}
        <main className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left column: Chat input + generation */}
          <section className="space-y-6">
            {/* Chat input area */}
            <ChatInput
              query={query}
              onQueryChange={handleQueryChange}
              onGenerate={handleGenerate}
              loading={loading}
            />

            {/* Stats bar */}
            {ideas.length > 0 && (
              <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:grid-cols-3">
                <div className="rounded-lg border border-slate-700 bg-slate-950/50 p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Concepts mined</div>
                  <div className="mt-2 text-2xl font-bold text-cyan-400">{stats.mined}</div>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-950/50 p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Ideas generated</div>
                  <div className="mt-2 text-2xl font-bold text-violet-400">{stats.generated}</div>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-950/50 p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Avg score</div>
                  <div className="mt-2 text-2xl font-bold text-emerald-400">{stats.avgScore}</div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {/* Ideas list */}
            {ideas.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-200">Generated ideas</h2>
                {ideas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    isSelected={selectedIdea?.id === idea.id}
                    onSelect={handleSelectIdea}
                  />
                ))}
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-8 text-center">
                <div className="inline-block">
                  <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400"></div>
                </div>
                <p className="text-sm text-cyan-200">Generating ideas...</p>
              </div>
            )}
          </section>

          {/* Right column: Detailed analysis */}
          <aside className="space-y-6">
            {selectedIdea ? (
              <>
                {/* Score breakdown */}
                <ScoreBreakdown scores={selectedIdea.scores} overallScore={selectedIdea.overallScore} />

                {/* Patent analysis */}
                <PatentAnalysis patents={selectedIdea.patents} />

                {/* Idea metadata */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Scenario</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-200">{selectedIdea.scenario}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {selectedIdea.concepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Domain and insights */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm uppercase tracking-[0.2em] text-slate-400">Domain</span>
                    <span className="rounded-lg bg-violet-500/20 px-2 py-1 text-xs font-medium text-violet-300">
                      {selectedIdea.domain}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>✓ Cross-domain synthesis potential</p>
                    <p>✓ TRIZ-aligned principles</p>
                    <p>✓ Feasibility-assessed</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
                <p className="text-sm text-slate-400">Select an idea to view detailed analysis</p>
              </div>
            )}
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
