import React, { useState } from 'react';

function EditKillCountPopup({ player, onSave, onClose }) {
  const [killCount, setKillCount] = useState(player.kill_count);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(player.id, killCount);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Edit Kill Count for {player.name}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="kill-count">Kill Count:</label>
          <input
            type="number"
            id="kill-count"
            value={killCount}
            onChange={(e) => setKillCount(Number(e.target.value))}
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

export default EditKillCountPopup;