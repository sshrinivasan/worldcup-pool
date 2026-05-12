import React, { useState, useEffect, useRef } from 'react';
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
  const breakdownRef = useRef(null);

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
      setTimeout(() => breakdownRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
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

  const STAGE_ORDER = [
    'Final', 'Third Place', 'Semifinal', 'Quarterfinal',
    'Round of 16', 'Round of 32',
    'Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F',
    'Group G', 'Group H', 'Group I', 'Group J', 'Group K', 'Group L',
  ];

  // Group breakdown by stage, sorted latest-to-earliest
  const groupBreakdownByStage = () => {
    const grouped = {};
    breakdown.forEach((item) => {
      const match = getMatchInfo(item.matchId);
      if (match) {
        if (!grouped[match.stage]) grouped[match.stage] = [];
        grouped[match.stage].push({ ...item, match });
      }
    });
    return Object.fromEntries(
      Object.entries(grouped).sort(
        ([a], [b]) => STAGE_ORDER.indexOf(a) - STAGE_ORDER.indexOf(b)
      )
    );
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
            <strong>Scoring:</strong> Group stage: 1pt outcome + 0.5pt exact score.
            Knockout rounds: 2/3/4/5/6pt outcome + 1/1.5/2/2.5/3pt exact score (score + pens must both match for bonus).
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
          <div className="score-breakdown" ref={breakdownRef}>
            <div className="predictions-header">
              <h3>📋 Score Breakdown for {selectedUser}</h3>
              <div className="predictions-legend">
                <div className="legend-item">
                  <div className="legend-color green"></div>
                  <span>Correct Score & Outcome</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color orange"></div>
                  <span>Correct Outcome Only</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color red"></div>
                  <span>Incorrect Prediction</span>
                </div>
              </div>
            </div>
            {Object.entries(groupBreakdownByStage()).map(([stage, stageItems]) => (
              <div key={stage} className="breakdown-stage-section">
                <h4 className="breakdown-stage-header">{stage}</h4>
                <div className="breakdown-compact-grid">
                  {stageItems.map((item) => {
                    const { match } = item;
                    const colorClass = item.correctScore ? 'prediction-correct-score' :
                                       item.correctOutcome ? 'prediction-correct-outcome' :
                                       'prediction-incorrect';
                    const fmt = (s1, s2, et) => `${s1}${et && s1 > s2 ? '*' : ''}–${s2}${et && s2 > s1 ? '*' : ''}`;
                    return (
                      <div key={item.matchId} className={`breakdown-compact-card ${colorClass}`}>
                        <div className="breakdown-compact-teams">
                          {match.team1.flag} {match.team1.code} vs {match.team2.flag} {match.team2.code}
                        </div>
                        <div className="breakdown-compact-scores">
                          <div>Predicted: {fmt(item.prediction.score.team1, item.prediction.score.team2, item.prediction.extraTime)}</div>
                          <div>Actual: {fmt(item.actualResult.score.team1, item.actualResult.score.team2, item.actualResult.extraTime)}</div>
                          <div className="breakdown-compact-pts">{item.points}pt{item.points !== 1 ? 's' : ''}</div>
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
