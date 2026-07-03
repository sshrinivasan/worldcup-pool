import React, { useState, useRef, useEffect } from 'react';

const SearchableSelect = ({ teams, value, onChange, placeholder = '-- Select Team --' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Filter by team name or code, matching from the start first
  const q = query.trim().toLowerCase();
  const filtered = q
    ? teams
        .filter(t =>
          t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q)
        )
        .sort((a, b) => {
          const aStarts =
            a.name.toLowerCase().startsWith(q) || a.code.toLowerCase().startsWith(q);
          const bStarts =
            b.name.toLowerCase().startsWith(q) || b.code.toLowerCase().startsWith(q);
          if (aStarts === bStarts) return 0;
          return aStarts ? -1 : 1;
        })
    : teams;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  const openDropdown = () => {
    setOpen(true);
    setQuery('');
  };

  const selectTeam = (team) => {
    onChange(team);
    setOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      openDropdown();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight(h => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight(h => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[highlight]) selectTeam(filtered[highlight]);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  };

  const displayValue = open
    ? query
    : value
    ? `${value.flag} ${value.name} (${value.code})`
    : '';

  return (
    <div className="searchable-select" ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        className="team-select searchable-select-input"
        value={displayValue}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!open) setOpen(true);
        }}
        onFocus={openDropdown}
        onClick={openDropdown}
        onKeyDown={handleKeyDown}
      />
      {open && (
        <ul className="searchable-select-options">
          {filtered.length === 0 ? (
            <li className="searchable-select-empty">No teams match "{query}"</li>
          ) : (
            filtered.map((team, i) => (
              <li
                key={team.code}
                className={`searchable-select-option ${
                  i === highlight ? 'highlighted' : ''
                } ${value?.code === team.code ? 'selected' : ''}`}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectTeam(team);
                }}
              >
                {team.flag} {team.name} ({team.code})
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;
