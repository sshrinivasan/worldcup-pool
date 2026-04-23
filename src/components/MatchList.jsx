import React, { useState } from 'react';
import MatchCard from './MatchCard';

const MatchList = ({ matches, currentUser }) => {
  const [filterStage, setFilterStage] = useState('all');

  // Group matches by stage
  const groupedMatches = matches.reduce((acc, match) => {
    const stage = match.stage;
    if (!acc[stage]) {
      acc[stage] = [];
    }
    acc[stage].push(match);
    return acc;
  }, {});

  // Define stage order for consistent display
  const stageOrder = [
    'Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F',
    'Group G', 'Group H', 'Group I', 'Group J', 'Group K', 'Group L',
    'Round of 32',
    'Round of 16',
    'Quarterfinal',
    'Semifinal',
    'Third Place',
    'Final'
  ];

  // Get unique stages for filter - consolidate all groups into "Group Stage"
  const uniqueStages = new Set(matches.map(m => m.stage));
  const filterOptions = ['all'];

  // Check if there are any group stages
  const hasGroupStages = Array.from(uniqueStages).some(stage => stage.startsWith('Group'));
  if (hasGroupStages) {
    filterOptions.push('Group Stage');
  }

  // Add non-group stages
  uniqueStages.forEach(stage => {
    if (!stage.startsWith('Group')) {
      filterOptions.push(stage);
    }
  });

  // Sort stages based on defined order
  const sortedStages = Object.keys(groupedMatches).sort((a, b) => {
    const indexA = stageOrder.indexOf(a);
    const indexB = stageOrder.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Filter stages based on selection
  let displayedStages;
  if (filterStage === 'all') {
    displayedStages = sortedStages;
  } else if (filterStage === 'Group Stage') {
    displayedStages = sortedStages.filter(stage => stage.startsWith('Group'));
  } else {
    displayedStages = sortedStages.filter(stage => stage === filterStage);
  }

  return (
    <div className="match-list">
      {!currentUser && (
        <div className="warning-message">
          ⚠️ Please select your name from the dropdown above to make predictions
        </div>
      )}

      <div className="match-list-filter">
        <label>Filter by Stage:</label>
        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          className="stage-filter-select"
        >
          {filterOptions.map(stage => (
            <option key={stage} value={stage}>
              {stage === 'all' ? 'All Stages' : stage}
            </option>
          ))}
        </select>
      </div>

      {displayedStages.map((stage) => (
        <div key={stage} className="stage-group">
          <h2 className="stage-title">{stage}</h2>
          <div className="matches-grid">
            {groupedMatches[stage].map((match) => (
              <MatchCard key={match.id} match={match} currentUser={currentUser} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
