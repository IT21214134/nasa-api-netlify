import React from 'react';

function CameraDetailsModal({ isOpen, onClose, cameras }) {
  console.log("cameras:", cameras); // Debugging statement

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-css">
        <button className="close-btn" onClick={onClose} data-testid="close-button">
          <span class="material-symbols-outlined">close</span>
        </button>
        <h2 className="modal-title">Camera Details</h2>
        <ul className="camera-list">
          {cameras.map((camera) => (
            <li key={camera.name} className="camera-item">
              <strong className="camera-label">{camera.name}</strong> 
              <span className="camera-value">{camera.full_name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CameraDetailsModal;
