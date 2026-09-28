import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Moon, Sun, Heart } from 'lucide-react';
import Home from './pages/Home';
import KitchenPortal from './pages/KitchenPortal';
import NGOPortal from './pages/NGOPortal';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart color="var(--accent-color)" size={28} />
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>AnnaSetu</span>
          </Link>
        </div>
        
        <div className="nav-links" style={{ display: 'none' }}>
          {/* Responsive nav links on desktop */}
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: '24px' }}>
          <a href="/#problem" className="nav-link">Problem</a>
          <a href="/#how-it-works" className="nav-link">How It Works</a>
          <a href="/#impact" className="nav-link">Impact</a>
          <Link to="/kitchen" className="nav-link">Kitchen Portal</Link>
          <Link to="/ngo" className="nav-link">NGO Portal</Link>
        </div>

        <div>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>

      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kitchen" element={<KitchenPortal />} />
          <Route path="/ngo" element={<NGOPortal />} />
        </Routes>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        fontWeight: 600,
        letterSpacing: '0.5px',
        borderTop: '1px solid var(--border-color)'
      }}>
        Made by STARKS
      </footer>
    </Router>
  );
}

export default App;
