import React from 'react';

function LeaderboardControls({ sortBy, onSortChange, displayCount, onDisplayCountChange }) {
  return (
    <div className="leaderboard-controls">
      <div>
        <label htmlFor="sort-by">Sort by: </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="pts">Points</option>
        </select>
      </div>
      <div>
        <label htmlFor="display-count">Display: </label>
        <select
          id="display-count"
          value={displayCount}
          onChange={(e) => onDisplayCountChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}

export default LeaderboardControls;