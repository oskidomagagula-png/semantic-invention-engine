import { useState } from 'react';

function ChatInput({ query, onQueryChange, onGenerate, loading }) {
  const [localQuery, setLocalQuery] = useState(query);

  const handleChange = (e) => {
    setLocalQuery(e.target.value);
    onQueryChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim() && !loading) {
      onGenerate();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-slate-200">Brainstorm workspace</h2>
        <button
          type="submit"
          disabled={loading || !localQuery.trim()}
          className="rounded-xl bg-cyan-500 px-5 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate ideas'}
        </button>
      </div>

      <div className="rounded-[18px] border border-slate-700 bg-slate-950/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_24px_rgba(0,0,0,0.3)] transition-all focus-within:border-cyan-400 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.4)]">
        <textarea
          value={localQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
          rows={4}
          className="w-full resize-none border-0 bg-transparent p-3 text-base text-slate-100 outline-none placeholder:text-slate-400 disabled:opacity-50"
          placeholder="Describe a challenge, concept, or technology blend... (Ctrl+Enter to generate)"
        />
      </div>

      <div className="text-xs text-slate-500">Tip: Use technical terms like 'chitin', 'quantum', 'adaptive', 'aerospace' for better results</div>
    </form>
  );
}

export default ChatInput;
