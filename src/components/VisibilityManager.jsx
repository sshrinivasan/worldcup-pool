import React, { useState, useEffect } from 'react';

const VisibilityManager = ({ onClose, displayStages, isDisplayStageVisible, onToggle, onShowAll, onHideAll }) => {
  const [stageStates, setStageStates] = useState({});
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    const states = {};
    for (const stage of displayStages) {
      states[stage] = await isDisplayStageVisible(stage);
    }
    setStageStates(states);
    setLoading(false);
  };

  useEffect(() => { reload(); }, []);

  const handleToggle = async (stage) => {
    await onToggle(stage);
    const visible = await isDisplayStageVisible(stage);
    setStageStates(prev => ({ ...prev, [stage]: visible }));
  };

  const handleShowAll = async () => { await onShowAll(); await reload(); };
  const handleHideAll = async () => { await onHideAll(); await reload(); };

  if (loading) {
    return (
      <div className="knockout-manager-overlay">
        <div className="knockout-manager-modal">
          <div className="knockout-manager-header">
            <h2>👁️ Reveal Predictions</h2>
            <button className="close-button" onClick={onClose}>✕</button>
          </div>
          <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="knockout-manager-overlay">
      <div className="knockout-manager-modal">
        <div className="knockout-manager-header">
          <h2>👁️ Reveal Predictions</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <p className="knockout-manager-subtitle">
          Reveal predictions once everyone has submitted — hidden stages show a locked message to users
        </p>

        <div className="lock-manager-content">
          <div className="lock-manager-actions">
            <button onClick={handleShowAll} className="unlock-all-btn">👁️ Reveal All Stages</button>
            <button onClick={handleHideAll} className="lock-all-btn">🙈 Hide All Stages</button>
          </div>

          <div className="lock-stages-list">
            {displayStages.map((stage) => {
              const visible = stageStates[stage] === true;
              return (
                <div key={stage} className={`lock-stage-item ${visible ? 'unlocked' : 'locked'}`}>
                  <div className="lock-stage-info">
                    <span className="lock-stage-icon">{visible ? '👁️' : '🙈'}</span>
                    <span className="lock-stage-name">{stage}</span>
                    <span className={`lock-status-badge ${visible ? 'unlocked' : 'locked'}`}>
                      {visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggle(stage)}
                    className={`toggle-lock-btn ${visible ? 'lock' : 'unlock'}`}
                  >
                    {visible ? 'Hide' : 'Reveal'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisibilityManager;
