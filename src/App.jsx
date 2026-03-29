import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Rosters from './pages/Rosters';
import Schedule from './pages/Schedule';

// Temporary Shell Components for pages we haven't built yet
// This prevents the "Component is not defined" errors
const Directory = () => <div><h1>Player Directory</h1><p>Coming Soon...</p></div>;
const Standings = () => <div><h1>Standings</h1><p>Coming Soon...</p></div>;
const Stats = () => <div><h1>Player Stats</h1><p>Coming Soon...</p></div>;
const Recaps = () => <div><h1>Recaps</h1><p>Coming Soon...</p></div>;
const BoxScores = () => <div><h1>Box Scores</h1><p>Coming Soon...</p></div>;

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navigation />
        <main className="main-content">
          <Routes>
            {/* The Home page is the default landing page */}
            <Route path="/" element={<Home />} />
            
            {/* Active Pages with real data */}
            <Route path="/rosters" element={<Rosters />} />
            <Route path="/schedule" element={<Schedule />} />
            
            {/* Placeholder Routes */}
            <Route path="/directory" element={<Directory />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/recaps" element={<Recaps />} />
            <Route path="/boxscores" element={<BoxScores />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;