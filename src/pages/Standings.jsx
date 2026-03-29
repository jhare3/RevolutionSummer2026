import React, { useMemo } from 'react';
import { Container, Table } from 'react-bootstrap';
import teamsData from '../data/teams.json';
// import boxscoresData from '../data/boxscores.json';

const Standings = () => {
  const boxscoresData = []; // Placeholder

  const standings = useMemo(() => {
    // Flatten the teams from conferences into one list
    const allTeams = [...teamsData.EASTERN, ...teamsData.WESTERN];
    
    const stats = allTeams.reduce((acc, team) => {
      acc[team] = {
        teamName: team,
        wins: 0, losses: 0, gp: 0,
        pts: 0, reb: 0, ast: 0,
        pa: 0 // Points Against
      };
      return acc;
    }, {});

    // Logic to process boxscoresData goes here (same as before)

    return Object.values(stats).map(s => ({
      ...s,
      winPct: s.gp > 0 ? (s.wins / s.gp).toFixed(3) : ".000",
      avgScore: s.gp > 0 ? (s.pts / s.gp).toFixed(1) : "0.0",
      diff: s.pts - s.pa
    })).sort((a, b) => b.winPct - a.winPct || b.diff - a.diff);
  }, [boxscoresData]);

  return (
    <Container className="mt-5 pt-4">
      <h1 className="text-center mb-4 fw-bold">LEAGUE STANDINGS</h1>
      <Table responsive hover variant="dark" className="text-center shadow">
        <thead>
          <tr style={{ borderBottom: '3px solid #ed1c24' }}>
            <th className="text-start">TEAM</th>
            <th>W</th><th>L</th><th>%</th><th>GP</th><th>PPG</th><th>+/-</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row, idx) => (
            <tr key={idx}>
              <td className="text-start fw-bold" style={{ color: '#ed1c24' }}>{row.teamName}</td>
              <td>{row.wins}</td>
              <td>{row.losses}</td>
              <td>{row.winPct}</td>
              <td>{row.gp}</td>
              <td>{row.avgScore}</td>
              <td style={{ color: row.diff > 0 ? '#00ff00' : row.diff < 0 ? '#ff4444' : 'white' }}>
                {row.diff > 0 ? `+${row.diff}` : row.diff}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Standings;