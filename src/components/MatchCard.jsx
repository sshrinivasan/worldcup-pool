import React, { useState, useEffect } from 'react';
import { savePrediction, getPrediction } from '../utils/storage';
import { getMatchTeams } from '../utils/knockoutTeams';
import { isstageLocked } from '../utils/lockManager';

const MatchCard = ({ match, currentUser }) => {
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');
  const [extraTime, setExtraTime] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [team1, setTeam1] = useState(match.team1);
  const [team2, setTeam2] = useState(match.team2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTeams = async () => {
      const teams = await getMatchTeams(match);
      setTeam1(teams.team1);
      setTeam2(teams.team2);
    };
    loadTeams();
  }, [match]);

  useEffect(() => {
    const checkLocked = async () => {
      const locked = await isstageLocked(match.stage);
      setIsLocked(locked);
    };
    checkLocked();
  }, [match.stage]);

  useEffect(() => {
    const loadPrediction = async () => {
      if (currentUser) {
        const existing = await getPrediction(match.id, currentUser);
        if (existing) {
          setTeam1Score(existing.score.team1);
          setTeam2Score(existing.score.team2);
          setExtraTime(existing.extraTime ?? false);
          setSaved(true);
        } else {
          setTeam1Score('');
          setTeam2Score('');
          setExtraTime(false);
          setSaved(false);
        }
      }
    };
    loadPrediction();
  }, [match.id, currentUser]);

  const isGroupStage = () => match.stage.startsWith('Group');

  const handleScoreChange = (setter) => (value) => {
    setter(value);
    setSaved(false);
  };

  const handleExtraTimeChange = (checked) => {
    setExtraTime(checked);
    setSaved(false);
  };

  const deriveResult = (s1, s2) => {
    if (s1 > s2) return 'home';
    if (s2 > s1) return 'away';
    return 'draw';
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

    if (team1Score === '' || team2Score === '') {
      alert('Please enter scores for both teams!');
      return;
    }

    const s1 = parseInt(team1Score);
    const s2 = parseInt(team2Score);

    if (s1 < 0 || s2 < 0) {
      alert('Scores cannot be negative!');
      return;
    }

    if (!isGroupStage() && s1 === s2) {
      alert('Knockout matches must have a winner. Please enter different scores.');
      return;
    }

    const result = deriveResult(s1, s2);
    const prediction = {
      result,
      score: { team1: s1, team2: s2 },
      extraTime: isGroupStage() ? false : extraTime,
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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`match-row ${isLocked ? 'locked' : ''} ${saved ? 'row-saved' : ''}`}>
      <div className="row-meta">
        <span className="row-date">{formatDate(match.date)}</span>
        <span className="row-time">{match.time}</span>
        {isLocked && <span className="row-lock-badge">🔒</span>}
      </div>

      <div className="row-teams">
        <div className="team-row">
          <span className="team-row-flag">{team1.flag}</span>
          <span className="team-row-name">{team1.name}</span>
          <input
            type="number"
            min="0"
            max="20"
            value={team1Score}
            onChange={(e) => handleScoreChange(setTeam1Score)(e.target.value)}
            disabled={isLocked}
            className="score-inline"
            placeholder="–"
          />
        </div>
        <div className="team-row">
          <span className="team-row-flag">{team2.flag}</span>
          <span className="team-row-name">{team2.name}</span>
          <input
            type="number"
            min="0"
            max="20"
            value={team2Score}
            onChange={(e) => handleScoreChange(setTeam2Score)(e.target.value)}
            disabled={isLocked}
            className="score-inline"
            placeholder="–"
          />
        </div>
      </div>

      {!isGroupStage() && (
        <label className={`extra-time-label ${isLocked ? 'disabled' : ''}`}>
          <input
            type="checkbox"
            checked={extraTime}
            onChange={(e) => handleExtraTimeChange(e.target.checked)}
            disabled={isLocked}
            className="extra-time-checkbox"
          />
          <span>ET/Pens</span>
        </label>
      )}

      <button
        onClick={handleSave}
        className={`row-save-btn ${saved ? 'saved' : ''}`}
        disabled={!currentUser || isLocked || loading}
        title={isLocked ? 'Locked' : saved ? 'Saved' : 'Save prediction'}
      >
        {loading ? '...' : isLocked ? '🔒' : saved ? '✓' : 'Save'}
      </button>
    </div>
  );
};

export default MatchCard;
