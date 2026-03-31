import React, { useState, useMemo, useEffect } from 'react';
import { Modal, Table, Badge, Button, Spinner } from 'react-bootstrap';
import Papa from 'papaparse';

// Dynamically discover all CSV files in the folder
const csvFiles = import.meta.glob('../data/boxscores/csv/*.csv', { query: '?raw', import: 'default' });
const recapFiles = import.meta.glob('../data/recaps/*.json', { eager: true });

const Recaps = () => {
  const [showBoxscore, setShowBoxscore] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [parsedBoxscores, setParsedBoxscores] = useState({});
  const [loading, setLoading] = useState(true);

  // 1. Load and Parse all CSVs on component mount
  useEffect(() => {
    const loadAllCSVs = async () => {
      const boxscoreMap = {};
      
      for (const path in csvFiles) {
        const rawContent = await csvFiles[path]();
        const results = Papa.parse(rawContent, { skipEmptyLines: true });
        const rows = results.data;

        // Extract Team Names from the header (usually Row 1 or 2)
        const matchupLine = rows.find(r => r[0]?.includes('vs.'))?.[0] || "";
        const teams = matchupLine.split('vs.').map(t => t.trim().toUpperCase());

        // Helper to extract player stats between headers and "Totals"
        const extractStats = (teamName, startIndex) => {
          const stats = [];
          for (let i = startIndex + 1; i < rows.length; i++) {
            const row = rows[i];
            if (row[0] === 'Totals' || !row[0]) break;
            stats.push({
              name: row[0],
              points: row[14],
              fg: `${row[8]}/${row[9]}`,
              fgPct: row[10],
              threePt: `${row[4]}/${row[5]}`,
              threePtPct: row[6],
              ft: `${row[11]}/${row[12]}`,
              ftPct: row[13],
              reb: parseInt(row[16] || 0) + parseInt(row[17] || 0),
              ast: row[15],
              stl: row[21],
              blk: row[19],
              team: teamName
            });
          }
          return stats;
        };

        const visitorIndex = rows.findIndex(r => r[0]?.includes('VISITORS:'));
        const homeIndex = rows.findIndex(r => r[0]?.includes('HOME:'));

        if (teams.length === 2) {
          const gameKey = teams.join(' VS ');
          boxscoreMap[gameKey] = [
            ...extractStats(teams[0], visitorIndex + 1),
            ...extractStats(teams[1], homeIndex + 1)
          ];
        }
      }
      setParsedBoxscores(boxscoreMap);
      setLoading(false);
    };

    loadAllCSVs();
  }, []);

  const allRecaps = useMemo(() => {
    return Object.values(recapFiles)
      .map(file => file.default || file)
      .sort((a, b) => b.week - a.week);
  }, []);

  const handleOpenBoxscore = (matchup) => {
    const cleanMatchup = matchup.toUpperCase().replace(' VS ', ' VS ');
    setSelectedGame({
      matchup,
      stats: parsedBoxscores[cleanMatchup] || []
    });
    setShowBoxscore(true);
  };

  const renderStacked = (val, pct) => (
    <div className="d-flex flex-column align-items-center">
      <span className="fw-bold" style={{ fontSize: '12px' }}>{val}</span>
      <Badge bg="dark" style={{ fontSize: '9px' }}>{pct}</Badge>
    </div>
  );

  if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="danger" /></div>;

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
            <div className="d-flex flex-wrap gap-2">
              {recap.matchups?.map((m, mIdx) => (
                <Button key={mIdx} variant="dark" size="sm" className="fw-bold" onClick={() => handleOpenBoxscore(m)}>
                  {m} BOXSCORE
                </Button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Modal show={showBoxscore} onHide={() => setShowBoxscore(false)} size="xl" centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title className="fw-black italic">{selectedGame?.matchup}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="table-light">
              <tr style={{ fontSize: '11px' }}>
                <th className="ps-4">PLAYER</th>
                <th className="text-center">PTS</th>
                <th className="text-center">FG</th>
                <th className="text-center">3PT</th>
                <th className="text-center">FT</th>
                <th className="text-center">REB</th>
                <th className="text-center">AST</th>
                <th className="text-center">STL</th>
              </tr>
            </thead>
            <tbody>
              {selectedGame?.stats.map((p, i) => (
                <tr key={i}>
                  <td className="ps-4 py-2">
                    <div className="fw-bold">{p.name}</div>
                    <div className="text-danger small fw-bold" style={{ fontSize: '9px' }}>{p.team}</div>
                  </td>
                  <td className="text-center fw-black h5">{p.points}</td>
                  <td className="text-center">{renderStacked(p.fg, p.fgPct)}</td>
                  <td className="text-center">{renderStacked(p.threePt, p.threePtPct)}</td>
                  <td className="text-center">{renderStacked(p.ft, p.ftPct)}</td>
                  <td className="text-center fw-bold">{p.reb}</td>
                  <td className="text-center">{p.ast}</td>
                  <td className="text-center">{p.stl}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Recaps;