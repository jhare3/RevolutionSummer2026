import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Rosters from './pages/Rosters';
import Schedule from './pages/Schedule';
import './App.css';

const Directory = () => <div style={{ padding: '3rem 2rem' }}><h1>Player Directory</h1><p>Coming Soon...</p></div>;
const Standings = () => <div style={{ padding: '3rem 2rem' }}><h1>Standings</h1><p>Coming Soon...</p></div>;
const Stats = () => <div style={{ padding: '3rem 2rem' }}><h1>Player Stats</h1><p>Coming Soon...</p></div>;
const Recaps = () => <div style={{ padding: '3rem 2rem' }}><h1>Recaps</h1><p>Coming Soon...</p></div>;
const BoxScores = () => <div style={{ padding: '3rem 2rem' }}><h1>Box Scores</h1><p>Coming Soon...</p></div>;

function App() {
  return (
    <Router>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        backgroundColor: '#ffffff',
      }}>
        <Navigation />
        <main style={{ width: '100%', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rosters" element={<Rosters />} />
            <Route path="/schedule" element={<Schedule />} />
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
