function IdeaCard({ idea, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(idea)}
      className={`w-full rounded-2xl border p-4 text-left transition-all ${
        isSelected
          ? 'border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-100">{idea.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{idea.domain}</p>
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-300">
          {idea.overallScore}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-300">{idea.scenario}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {idea.concepts.slice(0, 2).map((concept, idx) => (
          <span
            key={idx}
            className="rounded-full bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300"
          >
            {concept}
          </span>
        ))}
      </div>
    </button>
  );
}

export default IdeaCard;
