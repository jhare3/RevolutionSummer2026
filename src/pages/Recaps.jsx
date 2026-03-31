import React, { useState, useMemo, useEffect } from 'react';
import { Badge, Button, Spinner, Row, Col } from 'react-bootstrap';
import Papa from 'papaparse';
import BoxscoreModal from '../components/BoxscoreModal';
import { slugifyMatchup, parseScoreFromCSV } from '../utils/boxscoreEngine';

// Use ** to recursively find files in any weekly subfolder
const csvFiles = import.meta.glob('../data/boxscores/**/*.csv', { query: '?raw', import: 'default' });
const jsonFiles = import.meta.glob('../data/boxscores/**/*.json', { eager: true });
const recapFiles = import.meta.glob('../data/recaps/*.json', { eager: true });

const Recaps = () => {
  const [loading, setLoading] = useState(true);
  const [gameDataMap, setGameDataMap] = useState({});
  const [showBoxscore, setShowBoxscore] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const combinedMap = {};

      // 1. Process JSON Boxscores from all weekly folders
      for (const path in jsonFiles) {
        const data = jsonFiles[path].default || jsonFiles[path];
        // Ensure we only process files with game data
        if (data.game) {
          const key = slugifyMatchup(data.game);
          combinedMap[key] = { ...data };
        }
      }

      // 2. Merge CSV Metadata (Scores) from all weekly folders
      for (const path in csvFiles) {
        const rawContent = await csvFiles[path]();
        const results = Papa.parse(rawContent, { skipEmptyLines: true });
        const rows = results.data;
        
        const matchupLine = rows.find(r => r[0]?.includes('vs.'))?.[0] || "";
        const key = slugifyMatchup(matchupLine);
        
        if (combinedMap[key]) {
          combinedMap[key].scores = parseScoreFromCSV(rows);
        }
      }

      setGameDataMap(combinedMap);
      setLoading(false);
    };
    loadData();
  }, []);

  const allRecaps = useMemo(() => {
    return Object.values(recapFiles)
      .map(file => file.default || file)
      .sort((a, b) => b.week - a.week);
  }, []);

  const handleOpenBoxscore = (matchup) => {
    const key = slugifyMatchup(matchup);
    if (gameDataMap[key]) {
      setSelectedGame(gameDataMap[key]);
      setShowBoxscore(true);
    }
  };

  if (loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="danger" />
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="display-4 fw-black italic mb-5" style={{ letterSpacing: '-2px' }}>GAME RECAPS</h1>

      {allRecaps.map((recap, idx) => (
        <div key={idx} className="card mb-5 border-0 shadow-sm" style={{ borderLeft: '8px solid #ff4d4d' }}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between mb-3">
              <Badge bg="danger">WEEK {recap.week}</Badge>
              <span className="text-muted small fw-bold">{recap.date}</span>
            </div>
            <h2 className="fw-black mb-3">{recap.title}</h2>
            <p className="text-secondary mb-4">{recap.content}</p>
            
            <Row className="g-3">
              {recap.matchups?.map((m, mIdx) => (
                <Col key={mIdx} xs={12} md={6} lg={4}>
                  <Button 
                    variant="outline-dark" 
                    className="w-100 fw-black py-2 shadow-sm boxscore-btn"
                    onClick={() => handleOpenBoxscore(m)}
                  >
                    {m} <span className="text-danger ms-1">BOXSCORE</span>
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ))}

      <BoxscoreModal 
        show={showBoxscore} 
        onHide={() => setShowBoxscore(false)} 
        gameData={selectedGame} 
      />
    </div>
  );
};

export default Recaps;