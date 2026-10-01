function PatentAnalysis({ patents }) {
  if (!patents || !patents.patents) return null;

  const { patents: patentList, density, noveltyScore, recommendation } = patents;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Prior art analysis</h3>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            noveltyScore > 70
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : noveltyScore > 40
                ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
          {noveltyScore}/100
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Prior art density</span>
            <span className="text-sm font-bold text-slate-300">{density}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-amber-500"
              style={{ width: `${Math.min(density, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/50 p-3">
        <p className="text-xs font-medium text-slate-300">{recommendation}</p>
      </div>

      {patentList.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Related patents</p>
          {patentList.slice(0, 3).map((patent, idx) => (
            <div key={idx} className="rounded-lg border border-slate-700 bg-slate-950/30 p-2">
              <p className="text-xs font-medium text-slate-300">{patent.id}</p>
              <p className="text-xs text-slate-400">{patent.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatentAnalysis;
