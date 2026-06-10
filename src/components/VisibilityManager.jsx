import React, { useState, useEffect } from 'react';
import { friends, matches } from '../data/matches';
import { getAllPredictions } from '../utils/storage';

const getMatchIdsForDisplayStage = (displayStage) => {
  if (displayStage === 'Group Stages') {
    return matches.filter(m => m.stage.startsWith('Group')).map(m => m.id);
  }
  return matches.filter(m => m.stage === displayStage).map(m => m.id);
};

const VisibilityManager = ({ onClose, displayStages, isDisplayStageVisible, onToggle, onShowAll, onHideAll }) => {
  const [stageStates, setStageStates] = useState({});
  const [allPredictions, setAllPredictions] = useState(null);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    const states = {};
    for (const stage of displayStages) {
      states[stage] = await isDisplayStageVisible(stage);
    }
    setStageStates(states);
    setLoading(false);
  };

  useEffect(() => {
    reload();
    getAllPredictions().then(setAllPredictions);
  }, []);

  const handleToggle = async (stage) => {
    await onToggle(stage);
    const visible = await isDisplayStageVisible(stage);
    setStageStates(prev => ({ ...prev, [stage]: visible }));
  };

  const handleShowAll = async () => { await onShowAll(); await reload(); };
  const handleHideAll = async () => { await onHideAll(); await reload(); };

  const getCoverage = (displayStage) => {
    if (!allPredictions) return null;
    const matchIds = getMatchIdsForDisplayStage(displayStage);
    if (matchIds.length === 0) return null;

    const missing = [];
    for (const user of friends) {
      const count = matchIds.filter(id => allPredictions[`${user}-${id}`]).length;
      if (count < matchIds.length) {
        missing.push({ user, count, total: matchIds.length });
      }
    }
    return { total: matchIds.length, allComplete: missing.length === 0, missing };
  };

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
              const coverage = getCoverage(stage);
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
                  {coverage && (
                    <div className="coverage-summary">
                      {coverage.allComplete ? (
                        <span className="coverage-complete">✓ All {friends.length} players submitted</span>
                      ) : (
                        <span className="coverage-missing">
                          ⚠️ {coverage.missing.length} missing:{' '}
                          {coverage.missing.map(({ user, count, total }) =>
                            `${user} (${count}/${total})`
                          ).join(', ')}
                        </span>
                      )}
                    </div>
                  )}
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
