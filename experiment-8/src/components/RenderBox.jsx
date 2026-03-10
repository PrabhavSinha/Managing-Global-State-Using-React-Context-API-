import React from 'react';

/**
 * RenderBox — displays a component's render count + which contexts it uses.
 * Pure presentational — receives count and metadata via props.
 */
export default function RenderBox({ name, count, contexts = [], note }) {
  const heat = count <= 2 ? 'cool' : count <= 5 ? 'warm' : 'hot';
  return (
    <div className={`render-box ${heat}`}>
      <div className="rb-header">
        <span className="rb-name">{name}</span>
        <span className={`rb-count ${heat}`}>{count}</span>
      </div>
      <div className="rb-contexts">
        {contexts.map(c => (
          <span key={c} className="rb-ctx-tag">{c}</span>
        ))}
      </div>
      {note && <p className="rb-note">{note}</p>}
    </div>
  );
}
