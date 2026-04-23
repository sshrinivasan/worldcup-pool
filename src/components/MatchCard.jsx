import React, { useState, useEffect } from 'react';
import { savePrediction, getPrediction } from '../utils/storage';
import { getMatchTeams } from '../utils/knockoutTeams';
import { isstageLocked } from '../utils/lockManager';

const MatchCard = ({ match, currentUser }) => {
  const [result, setResult] = useState('');
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');
  const [saved, setSaved] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [team1, setTeam1] = useState(match.team1);
  const [team2, setTeam2] = useState(match.team2);
  const [loading, setLoading] = useState(false);

  // Get the actual teams (either assigned for knockout or original)
  useEffect(() => {
    const loadTeams = async () => {
      const teams = await getMatchTeams(match);
      setTeam1(teams.team1);
      setTeam2(teams.team2);
    };
    loadTeams();
  }, [match]);

  // Check if this stage is locked
  useEffect(() => {
    const checkLocked = async () => {
      const locked = await isstageLocked(match.stage);
      setIsLocked(locked);
    };
    checkLocked();
  }, [match.stage]);

  // Load existing prediction when component mounts or user changes
  useEffect(() => {
    const loadPrediction = async () => {
      if (currentUser) {
        const existing = await getPrediction(match.id, currentUser);
        if (existing) {
          setResult(existing.result);
          setTeam1Score(existing.score.team1);
          setTeam2Score(existing.score.team2);
          setSaved(true);
        } else {
          // Reset form if no prediction exists
          setResult('');
          setTeam1Score('');
          setTeam2Score('');
          setSaved(false);
        }
      }
    };
    loadPrediction();
  }, [match.id, currentUser]);

  const isGroupStage = () => {
    return match.stage.startsWith('Group');
  };

  // Reset saved state when user makes any change
  const handleInputChange = (setter) => (value) => {
    setter(value);
    setSaved(false);
  };

  const handleSave = async () => {
    if (isLocked) {
      alert('This stage is locked. Predictions cannot be changed.');
      return;
    }

    if (!currentUser) {
      alert('Please select your name first!');
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

    const score1 = parseInt(team1Score);
    const score2 = parseInt(team2Score);

    // Validate scores are non-negative
    if (score1 < 0 || score2 < 0) {
      alert('Scores cannot be negative!');
      return;
    }

    // Validation for group stage matches (draws allowed)
    if (isGroupStage()) {
      if (result === 'draw' && score1 !== score2) {
        alert('You selected a Draw, but the scores are not equal. Please make the scores the same or change your result prediction.');
        return;
      }

      if (result === 'home' && score1 <= score2) {
        alert(`You selected ${team1.code} to win, but their score (${score1}) is not higher than ${team2.code}'s score (${score2}). Please adjust the scores or change your result prediction.`);
        return;
      }

      if (result === 'away' && score2 <= score1) {
        alert(`You selected ${team2.code} to win, but their score (${score2}) is not higher than ${team1.code}'s score (${score1}). Please adjust the scores or change your result prediction.`);
        return;
      }
    } else {
      // Validation for knockout stage matches (no draws allowed in regular time for simplicity)
      // Note: In reality, knockout matches can be draws in regular time and go to extra time/penalties
      // but for this pool, we'll enforce a winner must be selected
      if (result === 'home' && score1 <= score2) {
        alert(`You selected ${team1.code} to win, but their score (${score1}) is not higher than ${team2.code}'s score (${score2}). Please adjust the scores or change your result prediction.`);
        return;
      }

      if (result === 'away' && score2 <= score1) {
        alert(`You selected ${team2.code} to win, but their score (${score2}) is not higher than ${team1.code}'s score (${score1}). Please adjust the scores or change your result prediction.`);
        return;
      }
    }

    const prediction = {
      result,
      score: {
        team1: score1,
        team2: score2
      }
    };

    setLoading(true);
    try {
      await savePrediction(match.id, currentUser, prediction);
      setSaved(true);
    } catch (error) {
      alert('Error saving prediction. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`match-card ${isLocked ? 'locked' : ''}`}>
      <div className="match-header">
        <span className="match-stage">{match.stage}</span>
        <span className="match-date">{formatDate(match.date)} - {match.time}</span>
        {isLocked && <span className="lock-badge">🔒 Locked</span>}
      </div>

      <div className="match-teams">
        <div className="team">
          <span className="team-flag">{team1.flag}</span>
          <span className="team-name">{team1.name}</span>
        </div>
        <div className="vs">VS</div>
        <div className="team">
          <span className="team-flag">{team2.flag}</span>
          <span className="team-name">{team2.name}</span>
        </div>
      </div>

      <div className="match-venue">{match.venue}</div>

      <div className="prediction-form">
        <div className="prediction-section">
          <label className="prediction-label">Match Result:</label>
          <div className="result-options">
            <label className={`result-option ${result === 'home' ? 'selected' : ''}`}>
              <input
                type="radio"
                name={`result-${match.id}`}
                value="home"
                checked={result === 'home'}
                onChange={(e) => handleInputChange(setResult)(e.target.value)}
                disabled={isLocked}
              />
              <span>{team1.code} Win</span>
            </label>
            <label className={`result-option ${result === 'draw' ? 'selected' : ''}`}>
              <input
                type="radio"
                name={`result-${match.id}`}
                value="draw"
                checked={result === 'draw'}
                onChange={(e) => handleInputChange(setResult)(e.target.value)}
                disabled={isLocked}
              />
              <span>Draw</span>
            </label>
            <label className={`result-option ${result === 'away' ? 'selected' : ''}`}>
              <input
                type="radio"
                name={`result-${match.id}`}
                value="away"
                checked={result === 'away'}
                onChange={(e) => handleInputChange(setResult)(e.target.value)}
                disabled={isLocked}
              />
              <span>{team2.code} Win</span>
            </label>
          </div>
        </div>

        <div className="prediction-section">
          <label className="prediction-label">Predicted Score:</label>
          <div className="score-inputs">
            <div className="score-input-group">
              <label>{team1.code}</label>
              <input
                type="number"
                min="0"
                max="20"
                value={team1Score}
                onChange={(e) => handleInputChange(setTeam1Score)(e.target.value)}
                placeholder="0"
                disabled={isLocked}
              />
            </div>
            <span className="score-separator">-</span>
            <div className="score-input-group">
              <label>{team2.code}</label>
              <input
                type="number"
                min="0"
                max="20"
                value={team2Score}
                onChange={(e) => handleInputChange(setTeam2Score)(e.target.value)}
                placeholder="0"
                disabled={isLocked}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`save-button ${saved ? 'saved' : ''}`}
          disabled={!currentUser || isLocked || loading}
        >
          {loading ? 'Saving...' : isLocked ? '🔒 Locked' : saved ? '✓ Saved!' : 'Save Prediction'}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
