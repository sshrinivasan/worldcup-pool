import React, { useState, useEffect } from 'react';

const LockManager = ({ onClose, displayStages, isDisplayStageLocked, onToggleLock, onLockAll, onUnlockAll }) => {
  const [lockedStages, setLockedStages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLockStates = async () => {
      const states = {};
      for (const stage of displayStages) {
        const isLocked = await isDisplayStageLocked(stage);
        states[stage] = isLocked;
      }
      setLockedStages(states);
      setLoading(false);
    };
    loadLockStates();
  }, [displayStages, isDisplayStageLocked]);

  const handleToggle = async (stage) => {
    await onToggleLock(stage);
    // Reload lock states
    const isLocked = await isDisplayStageLocked(stage);
    setLockedStages(prev => ({ ...prev, [stage]: isLocked }));
  };

  const handleLockAll = async () => {
    await onLockAll();
    // Reload all lock states
    const states = {};
    for (const stage of displayStages) {
      const isLocked = await isDisplayStageLocked(stage);
      states[stage] = isLocked;
    }
    setLockedStages(states);
  };

  const handleUnlockAll = async () => {
    await onUnlockAll();
    // Reload all lock states
    const states = {};
    for (const stage of displayStages) {
      const isLocked = await isDisplayStageLocked(stage);
      states[stage] = isLocked;
    }
    setLockedStages(states);
  };

  if (loading) {
    return (
      <div className="knockout-manager-overlay">
        <div className="knockout-manager-modal">
          <div className="knockout-manager-header">
            <h2>🔒 Lock/Unlock Predictions</h2>
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
          <h2>🔒 Lock/Unlock Predictions</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <p className="knockout-manager-subtitle">
          Lock stages to prevent users from changing their predictions after deadlines
        </p>

        <div className="lock-manager-content">
          <div className="lock-manager-actions">
            <button onClick={handleLockAll} className="lock-all-btn">
              🔒 Lock All Stages
            </button>
            <button onClick={handleUnlockAll} className="unlock-all-btn">
              🔓 Unlock All Stages
            </button>
          </div>

          <div className="lock-stages-list">
            {displayStages.map((stage) => {
              const isLocked = lockedStages[stage] === true;
              return (
                <div key={stage} className={`lock-stage-item ${isLocked ? 'locked' : 'unlocked'}`}>
                  <div className="lock-stage-info">
                    <span className="lock-stage-icon">{isLocked ? '🔒' : '🔓'}</span>
                    <span className="lock-stage-name">{stage}</span>
                    <span className={`lock-status-badge ${isLocked ? 'locked' : 'unlocked'}`}>
                      {isLocked ? 'Locked' : 'Unlocked'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggle(stage)}
                    className={`toggle-lock-btn ${isLocked ? 'unlock' : 'lock'}`}
                  >
                    {isLocked ? 'Unlock' : 'Lock'}
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

export default LockManager;
