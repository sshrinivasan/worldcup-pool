import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import UserSelector from './components/UserSelector';
import MatchList from './components/MatchList';
import AllPredictions from './components/AllPredictions';
import PoolResults from './components/PoolResults';
import AdminPanel from './components/AdminPanel';
import { matches } from './data/matches';

function App() {
  const [showHomePage, setShowHomePage] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [activeTab, setActiveTab] = useState('predictions');

  if (showHomePage) {
    return <HomePage onEnter={() => setShowHomePage(false)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="title-with-rules">
            <h1 className="app-title">⚽ Ted Lasso's 2026 World Cup Pool</h1>
            <button className="rules-link" onClick={() => setShowHomePage(true)}>
              📖 View Rules
            </button>
          </div>
          <UserSelector
            selectedUser={currentUser}
            onUserChange={setCurrentUser}
          />
        </div>

        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'predictions' ? 'active' : ''}`}
            onClick={() => setActiveTab('predictions')}
          >
            Make Predictions
          </button>
          <button
            className={`nav-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            View All Predictions
          </button>
          <button
            className={`nav-tab ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            Pool Results
          </button>
          <button
            className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Panel
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'predictions' && (
          <MatchList matches={matches} currentUser={currentUser} />
        )}
        {activeTab === 'all' && <AllPredictions />}
        {activeTab === 'results' && <PoolResults />}
        {activeTab === 'admin' && <AdminPanel />}
      </main>

      <footer className="app-footer">
        <p>Ted Lasso's World Cup 2026 Pool - Believe in your predictions! 🍃</p>
      </footer>
    </div>
  );
}

export default App;
