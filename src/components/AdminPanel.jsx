import React, { useState, useEffect } from 'react';
import { matches } from '../data/matches';
import { saveActualResult, getActualResult, deleteActualResult } from '../utils/actualResults';
import {
  getLockedStages,
  lockAllStages,
  unlockAllStages,
  getDisplayStages,
  isDisplayStageLocked,
  toggleDisplayStageLock
} from '../utils/lockManager';
import { isAdminAuthenticated, authenticateAdmin, logoutAdmin } from '../utils/auth';
import { getAllKnockoutTeamAssignments } from '../utils/knockoutTeams';
import KnockoutManager from './KnockoutManager';
import LockManager from './LockManager';
import AdminLogin from './AdminLogin';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [result, setResult] = useState('');
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [showKnockoutManager, setShowKnockoutManager] = useState(false);
  const [showLockManager, setShowLockManager] = useState(false);
  const [refreshLocks, setRefreshLocks] = useState(0);
  const [knockoutAssignments, setKnockoutAssignments] = useState({});

  // Check authentication on mount
  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  // Load knockout assignments so the match list shows real teams instead of placeholders
  const loadKnockoutAssignments = async () => {
    const assignments = await getAllKnockoutTeamAssignments();
    setKnockoutAssignments(assignments);
  };

  useEffect(() => {
    loadKnockoutAssignments();
  }, []);

  // Merge knockout assignment over static match data (returns match with real teams if assigned)
  const resolveMatch = (match) => {
    const assignment = knockoutAssignments[match.id];
    if (!assignment) return match;
    return { ...match, team1: assignment.team1, team2: assignment.team2 };
  };

  // Get unique stages for filter
  const stages = ['all', ...new Set(matches.map(m => m.stage))];

  // Get display stages for lock manager
  const displayStages = getDisplayStages();

  // Filter matches
  const filteredMatches = filterStage === 'all'
    ? matches
    : matches.filter(m => m.stage === filterStage);

  // Sort matches by date
  const sortedMatches = [...filteredMatches].sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  );

  const handleMatchSelect = async (match) => {
    setSelectedMatch(resolveMatch(match));
    const existing = await getActualResult(match.id);
    if (existing) {
      setResult(existing.result);
      setTeam1Score(existing.score.team1);
      setTeam2Score(existing.score.team2);
    } else {
      setResult('');
      setTeam1Score('');
      setTeam2Score('');
    }
  };

  const handleSaveResult = async () => {
    if (!selectedMatch) {
      alert('Please select a match first!');
      return;
    }

    if (!result) {
      alert('Please select a match result!');
      return;
    }

    if (team1Score === '' || team2Score === '') {
      alert('Please enter scores for both teams!');
      return;
    }

    const actualResult = {
      result,
      score: {
        team1: parseInt(team1Score),
        team2: parseInt(team2Score)
      }
    };

    try {
      await saveActualResult(selectedMatch.id, actualResult);
      alert('Result saved successfully!');

      // Clear form
      setSelectedMatch(null);
      setResult('');
      setTeam1Score('');
      setTeam2Score('');
    } catch (error) {
      alert('Error saving result. Please try again.');
      console.error(error);
    }
  };

  const handleDeleteResult = async (matchId) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      try {
        await deleteActualResult(matchId);
        alert('Result deleted successfully!');

        // Update the match results state to reflect the deletion
        setMatchResults(prev => {
          const next = { ...prev };
          delete next[matchId];
          return next;
        });

        if (selectedMatch && selectedMatch.id === matchId) {
          setSelectedMatch(null);
          setResult('');
          setTeam1Score('');
          setTeam2Score('');
        }
      } catch (error) {
        alert('Error deleting result. Please try again.');
        console.error(error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const [matchResults, setMatchResults] = useState({});

  // Load all match results on mount
  useEffect(() => {
    const loadResults = async () => {
      const results = await Promise.all(
        matches.map(async (match) => {
          const result = await getActualResult(match.id);
          return { matchId: match.id, result };
        })
      );
      const resultsMap = {};
      results.forEach(r => {
        if (r.result) resultsMap[r.matchId] = r.result;
      });
      setMatchResults(resultsMap);
    };
    loadResults();
  }, [selectedMatch]);

  const hasResult = (matchId) => matchResults[matchId] != null;
  const getScore = (matchId) => matchResults[matchId]?.score;

  const handleToggleLock = async (displayStage) => {
    try {
      await toggleDisplayStageLock(displayStage);
      setRefreshLocks(prev => prev + 1); // Trigger re-render
    } catch (error) {
      alert('Error toggling lock. Please try again.');
      console.error(error);
    }
  };

  const handleLockAll = async () => {
    try {
      await lockAllStages();
      setRefreshLocks(prev => prev + 1);
    } catch (error) {
      alert('Error locking all stages. Please try again.');
      console.error(error);
    }
  };

  const handleUnlockAll = async () => {
    try {
      await unlockAllStages();
      setRefreshLocks(prev => prev + 1);
    } catch (error) {
      alert('Error unlocking all stages. Please try again.');
      console.error(error);
    }
  };

  const handleLogin = (password) => {
    const success = authenticateAdmin(password);
    if (success) {
      setIsAuthenticated(true);
    }
    return success;
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout from the admin panel?')) {
      logoutAdmin();
      setIsAuthenticated(false);
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <>
      {showKnockoutManager && (
        <KnockoutManager onClose={() => {
          setShowKnockoutManager(false);
          loadKnockoutAssignments();
        }} />
      )}

      {showLockManager && (
        <LockManager
          onClose={() => setShowLockManager(false)}
          displayStages={displayStages}
          isDisplayStageLocked={isDisplayStageLocked}
          onToggleLock={handleToggleLock}
          onLockAll={handleLockAll}
          onUnlockAll={handleUnlockAll}
        />
      )}

      <div className="admin-panel">
        <div className="admin-header">
          <div className="admin-header-top">
            <div>
              <h2>🔐 Admin Panel - Enter Match Results</h2>
              <p className="admin-subtitle">Enter the actual results for each match as they happen</p>
            </div>
            <div className="admin-header-buttons">
              <button
                className="knockout-manager-button"
                onClick={() => setShowKnockoutManager(true)}
              >
                ⚽ Manage Knockout Teams
              </button>
              <button
                className="lock-manager-button"
                onClick={() => setShowLockManager(true)}
              >
                🔒 Lock/Unlock Predictions
              </button>
              <button
                className="logout-button"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

      <div className="admin-content">
        {/* Left side - Match List */}
        <div className="admin-match-list">
          <div className="admin-filter">
            <label>Filter by Stage:</label>
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="filter-select"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage === 'all' ? 'All Matches' : stage}
                </option>
              ))}
            </select>
          </div>

          <div className="match-list-scroll">
            {sortedMatches.map((match) => {
              const resolved = resolveMatch(match);
              return (
              <div
                key={match.id}
                className={`admin-match-item ${selectedMatch?.id === match.id ? 'selected' : ''} ${hasResult(match.id) ? 'has-result' : ''}`}
                onClick={() => handleMatchSelect(match)}
              >
                <div className="match-item-header">
                  <span className="match-item-stage">{match.stage}</span>
                  <span className="match-item-date">{formatDate(match.date)}</span>
                  {hasResult(match.id) && (
                    <span className="result-badge">
                      ✓ {getScore(match.id).team1} – {getScore(match.id).team2}
                    </span>
                  )}
                </div>
                <div className="match-item-teams">
                  {resolved.team1.flag} {resolved.team1.code} vs {resolved.team2.flag} {resolved.team2.code}
                </div>
                {hasResult(match.id) && (
                  <button
                    className="delete-result-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteResult(match.id);
                    }}
                  >
                    Delete Result
                  </button>
                )}
              </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Result Entry Form */}
        <div className="admin-result-form">
          {selectedMatch ? (
            <>
              <h3>Enter Result for:</h3>
              <div className="selected-match-display">
                <div className="match-stage-date">
                  <span className="stage-badge">{selectedMatch.stage}</span>
                  <span>{formatDate(selectedMatch.date)} - {selectedMatch.time}</span>
                </div>
                <div className="match-teams-display">
                  <div className="team-display">
                    <span className="team-flag-large">{selectedMatch.team1.flag}</span>
                    <span className="team-name-large">{selectedMatch.team1.name}</span>
                  </div>
                  <div className="vs-large">VS</div>
                  <div className="team-display">
                    <span className="team-flag-large">{selectedMatch.team2.flag}</span>
                    <span className="team-name-large">{selectedMatch.team2.name}</span>
                  </div>
                </div>
                <div className="venue-display">{selectedMatch.venue}</div>
              </div>

              <div className="result-entry-section">
                <label className="entry-label">Match Result:</label>
                <div className="result-options-admin">
                  <label className={`result-option-admin ${result === 'home' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="result"
                      value="home"
                      checked={result === 'home'}
                      onChange={(e) => setResult(e.target.value)}
                    />
                    <span>{selectedMatch.team1.code} Win</span>
                  </label>
                  <label className={`result-option-admin ${result === 'draw' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="result"
                      value="draw"
                      checked={result === 'draw'}
                      onChange={(e) => setResult(e.target.value)}
                    />
                    <span>Draw</span>
                  </label>
                  <label className={`result-option-admin ${result === 'away' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="result"
                      value="away"
                      checked={result === 'away'}
                      onChange={(e) => setResult(e.target.value)}
                    />
                    <span>{selectedMatch.team2.code} Win</span>
                  </label>
                </div>
              </div>

              <div className="result-entry-section">
                <label className="entry-label">Final Score:</label>
                <div className="score-inputs-admin">
                  <div className="score-input-group-admin">
                    <label>{selectedMatch.team1.code}</label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={team1Score}
                      onChange={(e) => setTeam1Score(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <span className="score-separator-admin">-</span>
                  <div className="score-input-group-admin">
                    <label>{selectedMatch.team2.code}</label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={team2Score}
                      onChange={(e) => setTeam2Score(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <button onClick={handleSaveResult} className="save-result-btn">
                Save Match Result
              </button>
            </>
          ) : (
            <div className="no-match-selected">
              <p>👈 Select a match from the list to enter its result</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminPanel;
