import React, { useState, useEffect } from 'react';
import { matches } from '../data/matches';
import {
  getAllQualifiedTeams,
  saveKnockoutTeamAssignment,
  getKnockoutTeamAssignment,
  deleteKnockoutTeamAssignment
} from '../utils/knockoutTeams';

const KnockoutManager = ({ onClose }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [assignments, setAssignments] = useState({});
  const [loading, setLoading] = useState(true);

  // Get only knockout stage matches
  const knockoutMatches = matches.filter(
    m => !m.stage.startsWith('Group')
  );

  const qualifiedTeams = getAllQualifiedTeams();

  // Load all assignments on mount
  useEffect(() => {
    const loadAssignments = async () => {
      const assignmentsMap = {};
      for (const match of knockoutMatches) {
        const assignment = await getKnockoutTeamAssignment(match.id);
        if (assignment) {
          assignmentsMap[match.id] = assignment;
        }
      }
      setAssignments(assignmentsMap);
      setLoading(false);
    };
    loadAssignments();
  }, []);

  const handleMatchSelect = async (match) => {
    setSelectedMatch(match);

    // Load existing assignment if any
    const existing = await getKnockoutTeamAssignment(match.id);
    if (existing) {
      setTeam1(existing.team1);
      setTeam2(existing.team2);
    } else {
      setTeam1(null);
      setTeam2(null);
    }
  };

  const handleSaveAssignment = async () => {
    if (!selectedMatch) {
      alert('Please select a match first!');
      return;
    }

    if (!team1 || !team2) {
      alert('Please select both teams!');
      return;
    }

    if (team1.code === team2.code) {
      alert('Teams cannot play against themselves!');
      return;
    }

    try {
      await saveKnockoutTeamAssignment(selectedMatch.id, team1, team2);
      alert('Teams assigned successfully!');

      // Update local state
      setAssignments(prev => ({
        ...prev,
        [selectedMatch.id]: { team1, team2 }
      }));

      // Clear selection
      setSelectedMatch(null);
      setTeam1(null);
      setTeam2(null);
    } catch (error) {
      alert('Error saving assignment. Please try again.');
      console.error(error);
    }
  };

  const handleDeleteAssignment = async (matchId) => {
    if (window.confirm('Are you sure you want to delete this team assignment?')) {
      try {
        await deleteKnockoutTeamAssignment(matchId);

        // Update local state
        setAssignments(prev => {
          const newAssignments = { ...prev };
          delete newAssignments[matchId];
          return newAssignments;
        });

        if (selectedMatch && selectedMatch.id === matchId) {
          setSelectedMatch(null);
          setTeam1(null);
          setTeam2(null);
        }
      } catch (error) {
        alert('Error deleting assignment. Please try again.');
        console.error(error);
      }
    }
  };

  const hasAssignment = (matchId) => {
    return assignments[matchId] !== undefined;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Group knockout matches by stage
  const groupedMatches = knockoutMatches.reduce((acc, match) => {
    if (!acc[match.stage]) {
      acc[match.stage] = [];
    }
    acc[match.stage].push(match);
    return acc;
  }, {});

  return (
    <div className="knockout-manager-overlay">
      <div className="knockout-manager-modal">
        <div className="knockout-manager-header">
          <h2>⚽ Manage Knockout Stage Teams</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <p className="knockout-manager-subtitle">
          Assign the actual teams that qualified to each knockout match
        </p>

        <div className="knockout-manager-content">
          {/* Left side - Match List */}
          <div className="knockout-match-list">
            <h3>Knockout Matches</h3>
            <div className="knockout-matches-scroll">
              {Object.entries(groupedMatches).map(([stage, stageMatches]) => (
                <div key={stage} className="knockout-stage-group">
                  <h4 className="knockout-stage-title">{stage}</h4>
                  {stageMatches.map((match) => {
                    const assignment = assignments[match.id];
                    return (
                      <div
                        key={match.id}
                        className={`knockout-match-item ${
                          selectedMatch?.id === match.id ? 'selected' : ''
                        } ${hasAssignment(match.id) ? 'has-assignment' : ''}`}
                        onClick={() => handleMatchSelect(match)}
                      >
                        <div className="knockout-match-date">{formatDate(match.date)}</div>
                        <div className="knockout-match-teams">
                          {assignment ? (
                            <>
                              {assignment.team1.flag} {assignment.team1.code} vs{' '}
                              {assignment.team2.flag} {assignment.team2.code}
                            </>
                          ) : (
                            <>
                              {match.team1.flag} {match.team1.name} vs{' '}
                              {match.team2.flag} {match.team2.name}
                            </>
                          )}
                        </div>
                        {hasAssignment(match.id) && (
                          <>
                            <span className="assignment-badge">✓ Teams Assigned</span>
                            <button
                              className="delete-assignment-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAssignment(match.id);
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Team Assignment Form */}
          <div className="knockout-assignment-form">
            {selectedMatch ? (
              <>
                <h3>Assign Teams</h3>
                <div className="selected-knockout-match">
                  <div className="knockout-match-info">
                    <span className="stage-badge">{selectedMatch.stage}</span>
                    <span>{formatDate(selectedMatch.date)} - {selectedMatch.time}</span>
                  </div>
                  <div className="original-matchup">
                    <strong>Original Matchup:</strong><br />
                    {selectedMatch.team1.name} vs {selectedMatch.team2.name}
                  </div>
                </div>

                <div className="team-selection-section">
                  <div className="team-selector">
                    <label>Team 1 (Home):</label>
                    <select
                      value={team1?.code || ''}
                      onChange={(e) => {
                        const selected = qualifiedTeams.find(t => t.code === e.target.value);
                        setTeam1(selected);
                      }}
                      className="team-select"
                    >
                      <option value="">-- Select Team --</option>
                      {qualifiedTeams.map((team) => (
                        <option key={team.code} value={team.code}>
                          {team.flag} {team.name} ({team.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="vs-divider">VS</div>

                  <div className="team-selector">
                    <label>Team 2 (Away):</label>
                    <select
                      value={team2?.code || ''}
                      onChange={(e) => {
                        const selected = qualifiedTeams.find(t => t.code === e.target.value);
                        setTeam2(selected);
                      }}
                      className="team-select"
                    >
                      <option value="">-- Select Team --</option>
                      {qualifiedTeams.map((team) => (
                        <option key={team.code} value={team.code}>
                          {team.flag} {team.name} ({team.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {team1 && team2 && (
                  <div className="preview-matchup">
                    <strong>Preview:</strong>
                    <div className="preview-teams">
                      <span>{team1.flag} {team1.name}</span>
                      <span className="vs">vs</span>
                      <span>{team2.flag} {team2.name}</span>
                    </div>
                  </div>
                )}

                <button onClick={handleSaveAssignment} className="save-assignment-btn">
                  Save Team Assignment
                </button>
              </>
            ) : (
              <div className="no-match-selected">
                <p>👈 Select a knockout match from the list to assign teams</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnockoutManager;
