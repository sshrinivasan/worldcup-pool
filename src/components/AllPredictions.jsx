import React, { useState, useEffect } from 'react';
import { matches, friends } from '../data/matches';
import { getAllPredictions } from '../utils/storage';
import { getAllActualResults } from '../utils/actualResults';

const AllPredictions = () => {
  const [allPredictions, setAllPredictions] = useState({});
  const [actualResults, setActualResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const predictions = await getAllPredictions();
      const results = await getAllActualResults();
      setAllPredictions(predictions);
      setActualResults(results);
      setLoading(false);
    };
    loadData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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

        return (
          <div key={stage} className="predictions-stage-section">
            <h3 className="predictions-stage-title">{stage}</h3>

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
                  {matchesWithPredictions.map((match) => (
                    <tr key={match.id}>
                      <td className="match-cell">
                        <div className="match-info-compact">
                          <span className="match-date-compact">{formatDate(match.date)}</span>
                          <span className="match-teams-compact">
                            {match.team1.flag} {match.team1.code} vs {match.team2.flag} {match.team2.code}
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
                                {prediction.score.team1} - {prediction.score.team2}
                              </div>
                            ) : (
                              <div className="prediction-tile empty">-</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
