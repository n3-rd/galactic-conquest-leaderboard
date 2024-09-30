import React, { useState } from 'react';

function EditPointsPopup({ player, onSave, onClose }) {
  const [points, setPoints] = useState(player.pts);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(player.id, points);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Edit Points for {player.name}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="points">Points:</label>
          <input
            type="number"
            id="points"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            min="0"
          />
          <div className="popup-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPointsPopup;