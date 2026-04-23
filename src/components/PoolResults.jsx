import React, { useState, useEffect } from 'react';
import { getLeaderboard, getUserScoreBreakdown } from '../utils/scoring';
import { matches } from '../data/matches';
import { getAllActualResults } from '../utils/actualResults';
import { getAllKnockoutTeamAssignments } from '../utils/knockoutTeams';

const PoolResults = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load leaderboard on mount and when results change
  useEffect(() => {
    const loadLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboard(data);
      setLoading(false);
    };

    loadLeaderboard();

    // Refresh every 5 seconds to pick up new results
    const interval = setInterval(() => {
      loadLeaderboard();
      setRefreshKey(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleUserClick = async (username) => {
    if (selectedUser === username) {
      setSelectedUser(null);
      setBreakdown([]);
    } else {
      setSelectedUser(username);
      const userBreakdown = await getUserScoreBreakdown(username);
      setBreakdown(userBreakdown);
    }
  };

  useEffect(() => {
    getAllKnockoutTeamAssignments().then(setKnockoutAssignments);
  }, []);

  const getMatchInfo = (matchId) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return null;
    const assignment = knockoutAssignments[matchId];
    if (!assignment) return match;
    return { ...match, team1: assignment.team1, team2: assignment.team2 };
  };

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Group breakdown by stage
  const groupBreakdownByStage = () => {
    const grouped = {};
    breakdown.forEach((item) => {
      const match = getMatchInfo(item.matchId);
      if (match) {
        if (!grouped[match.stage]) {
          grouped[match.stage] = [];
        }
        grouped[match.stage].push({ ...item, match });
      }
    });
    return grouped;
  };

  const [knockoutAssignments, setKnockoutAssignments] = useState({});
  const [totalMatchesWithResults, setTotalMatchesWithResults] = useState(0);

  useEffect(() => {
    const loadResultsCount = async () => {
      const results = await getAllActualResults();
      setTotalMatchesWithResults(Object.keys(results).length);
    };
    loadResultsCount();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="pool-results">
        <div className="results-header">
          <h2>🏆 Pool Results & Leaderboard</h2>
        </div>
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading results...</div>
      </div>
    );
  }

  return (
    <div className="pool-results">
      <div className="results-header">
        <h2>🏆 Pool Results & Leaderboard</h2>
        <div className="results-stats">
          <span className="stat-badge">📊 {totalMatchesWithResults} matches scored</span>
          <span className="stat-badge">👥 {leaderboard.length} players</span>
        </div>
      </div>

      <div className="leaderboard-container">
        <div className="leaderboard-info">
          <p>Click on any player to see their detailed score breakdown</p>
          <p className="scoring-note">
            <strong>Scoring:</strong> Placeholder logic active (1pt for correct outcome + 1pt for exact score).
            You'll provide the exact scoring rules later.
          </p>
        </div>

        <div className="leaderboard-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Total Points</th>
                <th># Correct Outcomes</th>
                <th># Correct Scores</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    No results yet. Admin needs to enter match results!
                  </td>
                </tr>
              ) : (
                leaderboard.map((player, index) => (
                  <tr
                    key={player.username}
                    className={`leaderboard-row ${selectedUser === player.username ? 'selected' : ''} ${index < 3 ? 'top-three' : ''}`}
                    onClick={() => handleUserClick(player.username)}
                  >
                    <td className="rank-cell">
                      <span className="rank-display">{getRankEmoji(index)}</span>
                    </td>
                    <td className="player-cell">
                      <strong>{player.username}</strong>
                    </td>
                    <td className="points-cell">
                      <span className="points-display">{player.totalPoints}</span>
                    </td>
                    <td>{player.correctOutcomes || 0}</td>
                    <td>{player.correctScores || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Detailed Breakdown */}
        {selectedUser && breakdown.length > 0 && (
          <div className="score-breakdown">
            <h3>📋 Score Breakdown for {selectedUser}</h3>
            {Object.entries(groupBreakdownByStage()).map(([stage, stageItems]) => (
              <div key={stage} className="breakdown-stage-section">
                <h4 className="breakdown-stage-header">{stage}</h4>
                <div className="breakdown-matches-grid">
                  {stageItems.map((item) => {
                    const { match } = item;
                    const cardClass = item.correctScore ? 'correct-score' :
                                     item.correctOutcome ? 'correct-outcome' :
                                     'incorrect';

                    return (
                      <div key={item.matchId} className={`breakdown-card ${cardClass}`}>
                        <div className="breakdown-card-header">
                          <span className="breakdown-card-date">{formatDate(match.date)} - {match.time}</span>
                          <span className={`breakdown-points-badge ${item.points === 0 ? 'zero-points' : item.points === 1 ? 'one-point' : 'two-points'}`}>
                            {item.points} pts
                          </span>
                        </div>

                        <div className="breakdown-card-teams">
                          <div className="team">
                            <span className="team-flag">{match.team1.flag}</span>
                            <span className="team-name">{match.team1.name}</span>
                          </div>
                          <div className="vs">VS</div>
                          <div className="team">
                            <span className="team-flag">{match.team2.flag}</span>
                            <span className="team-name">{match.team2.name}</span>
                          </div>
                        </div>

                        <div className="breakdown-card-venue">{match.venue}</div>

                        <div className="breakdown-card-results">
                          <div className="breakdown-result-row">
                            <span className="result-label">Predicted:</span>
                            <span className="result-score">
                              {item.prediction.score.team1} - {item.prediction.score.team2}
                            </span>
                            <span className="result-outcome">
                              {item.prediction.result === 'home' ? `${match.team1.code} Win` :
                               item.prediction.result === 'draw' ? 'Draw' :
                               `${match.team2.code} Win`}
                            </span>
                          </div>
                          <div className="breakdown-result-row">
                            <span className="result-label">Actual:</span>
                            <span className="result-score">
                              {item.actualResult.score.team1} - {item.actualResult.score.team2}
                            </span>
                            <span className="result-outcome">
                              {item.actualResult.result === 'home' ? `${match.team1.code} Win` :
                               item.actualResult.result === 'draw' ? 'Draw' :
                               `${match.team2.code} Win`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolResults;
