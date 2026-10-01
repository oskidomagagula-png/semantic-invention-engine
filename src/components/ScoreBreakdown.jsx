function ScoreBreakdown({ scores, overallScore }) {
  if (!scores) return null;

  const breakdownItems = [
    { label: 'Semantic Distance', value: scores.semanticDistance, color: 'cyan' },
    { label: 'Feasibility', value: scores.feasibility, color: 'violet' },
    { label: 'Novelty', value: scores.novelty, color: 'emerald' },
    { label: 'TRIZ Alignment', value: scores.trizAlignment, color: 'amber' },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Score breakdown</h3>
        <div className="rounded-lg bg-cyan-500/20 px-3 py-1">
          <span className="text-xl font-bold text-cyan-300">{overallScore}</span>
          <span className="ml-1 text-xs text-cyan-400">/100</span>
        </div>
      </div>

      <div className="space-y-3">
        {breakdownItems.map((item, idx) => (
          <div key={idx}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{item.label}</span>
              <span className={`text-sm font-bold text-${item.color}-400`}>{Math.round(item.value)}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full w-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 transition-all`}
                style={{ width: `${Math.min(item.value, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/50 p-2 text-xs text-slate-300">
        <p className="font-medium">Composite Score</p>
        <p className="mt-1 text-slate-400">
          Weighted average of all factors. Higher scores indicate stronger innovation potential.
        </p>
      </div>
    </div>
  );
}

export default ScoreBreakdown;
