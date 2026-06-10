import React, { useState, useEffect } from 'react';
import { matches, friends } from '../data/matches';
import { getAllPredictions } from '../utils/storage';
import { getAllActualResults } from '../utils/actualResults';
import { getAllKnockoutTeamAssignments } from '../utils/knockoutTeams';
import { getVisibleStages } from '../utils/visibilityManager';

const AllPredictions = () => {
  const [allPredictions, setAllPredictions] = useState({});
  const [actualResults, setActualResults] = useState({});
  const [knockoutAssignments, setKnockoutAssignments] = useState({});
  const [visibleStages, setVisibleStages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [predictions, results, assignments, visible] = await Promise.all([
        getAllPredictions(),
        getAllActualResults(),
        getAllKnockoutTeamAssignments(),
        getVisibleStages(),
      ]);
      setAllPredictions(predictions);
      setActualResults(results);
      setKnockoutAssignments(assignments);
      setVisibleStages(visible);
      setLoading(false);
    };
    loadData();
  }, []);

  const resolveMatch = (match) => {
    const assignment = knockoutAssignments[match.id];
    if (!assignment) return match;
    return { ...match, team1: assignment.team1, team2: assignment.team2 };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getPredictionForUserAndMatch = (matchId, user) => {
    const key = `${user}-${matchId}`;
    return allPredictions[key];
  };

  const getColorClass = (prediction, matchId) => {
    if (!prediction) return '';

    const actual = actualResults[matchId];
    if (!actual) return ''; // No result yet

    const correctScore =
      prediction.score.team1 === actual.score.team1 &&
      prediction.score.team2 === actual.score.team2;

    const correctOutcome = prediction.result === actual.result;

    if (correctScore) return 'prediction-correct-score'; // Green
    if (correctOutcome) return 'prediction-correct-outcome'; // Orange
    return 'prediction-incorrect'; // Red
  };

  // Group matches by stage
  const groupedMatches = matches.reduce((acc, match) => {
    const stage = match.stage;
    if (!acc[stage]) {
      acc[stage] = [];
    }
    acc[stage].push(match);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="all-predictions">
        <div className="predictions-header">
          <h2>All Predictions</h2>
        </div>
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading predictions...</div>
      </div>
    );
  }

  return (
    <div className="all-predictions">
      <div className="predictions-header">
        <h2>All Predictions</h2>
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

      {Object.entries(groupedMatches).map(([stage, stageMatches]) => {
        const matchesWithPredictions = stageMatches.filter(match =>
          friends.some(friend => getPredictionForUserAndMatch(match.id, friend))
        );

        if (matchesWithPredictions.length === 0) return null;

        const isVisible = visibleStages.includes(stage);

        return (
          <div key={stage} className="predictions-stage-section">
            <h3 className="predictions-stage-title">{stage}</h3>

            {!isVisible ? (
              <div className="predictions-hidden-message">
                🔒 Predictions for this stage will be revealed once everyone has submitted
              </div>
            ) : (
              <div className="predictions-table-wrapper">
                <table className="predictions-table">
                  <thead>
                    <tr>
                      <th className="match-column">Match</th>
                      {friends.map(friend => (
                        <th key={friend} className="player-column">{friend}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matchesWithPredictions.map((match) => {
                      const resolved = resolveMatch(match);
                      return (
                      <tr key={match.id}>
                        <td className="match-cell">
                          <div className="match-info-compact">
                            <span className="match-date-compact">{formatDate(match.date)}</span>
                            <span className="match-teams-compact">
                              {resolved.team1.flag} {resolved.team1.code} vs {resolved.team2.flag} {resolved.team2.code}
                            </span>
                          </div>
                        </td>
                        {friends.map((friend) => {
                          const prediction = getPredictionForUserAndMatch(match.id, friend);
                          const colorClass = getColorClass(prediction, match.id);

                          return (
                            <td key={friend} className="prediction-cell-compact">
                              {prediction ? (
                                <div className={`prediction-tile ${colorClass}`}>
                                  {(() => {
                                    const s1 = prediction.score.team1;
                                    const s2 = prediction.score.team2;
                                    const et = prediction.extraTime;
                                    return `${s1}${et && s1 > s2 ? '*' : ''}–${s2}${et && s2 > s1 ? '*' : ''}`;
                                  })()}
                                </div>
                              ) : (
                                <div className="prediction-tile empty">-</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}

      {Object.keys(allPredictions).length === 0 && (
        <div className="no-predictions">
          <p>No predictions have been made yet.</p>
          <p>Switch to "Make Predictions" tab to start!</p>
        </div>
      )}
    </div>
  );
};

export default AllPredictions;
