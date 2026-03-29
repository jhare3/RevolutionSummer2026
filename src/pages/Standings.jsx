import React, { useMemo, useState } from 'react';
import rosterData from '../data/players.json';
import { calculateStandings } from '../utils/standingsEngine';

const gameFiles = import.meta.glob('../data/boxscores/*.json', { eager: true });

const Standings = () => {
  // 1. New state for interactive sorting
  const [sortConfig, setSortConfig] = useState({ key: 'W', direction: 'desc' });

  const standingsData = useMemo(() => {
    const rawStandings = calculateStandings(gameFiles, rosterData);
    
    let items = rawStandings.map(t => {
      const gp = t.W + t.L;
      return {
        ...t,
        PCT: gp > 0 ? (t.W / gp).toFixed(3) : ".000",
        DIFF: t.PF - t.PA
      };
    });

    // 2. Interactive Sort Logic
    items.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Handle PCT as a float for proper sorting
      if (sortConfig.key === 'PCT') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      
      // Secondary sort: always fall back to DIFF if the primary key is tied
      return b.DIFF - a.DIFF;
    });

    return items;
  }, [sortConfig]);

  // 3. Click Handler
  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const renderTable = (title, teams) => (
    <div className="mb-5">
      <h3 style={confHeaderStyle}>{title} CONFERENCE</h3>
      <div style={tableWrapper}>
        <table className="table table-hover mb-0" style={{ fontSize: '15px' }}>
          <thead style={{ backgroundColor: '#111', color: '#fff' }}>
            <tr>
              <th style={thStyleLeft}>TEAM</th>
              {/* Added onClick and dynamic arrows to headers */}
              {['W', 'L', 'PCT', 'PF', 'PA', 'DIFF'].map((col) => (
                <th 
                  key={col}
                  onClick={() => requestSort(col)} 
                  style={{ ...thStyle, cursor: 'pointer', color: sortConfig.key === col ? '#ff4d4d' : '#fff' }}
                >
                  {col} {sortConfig.key === col ? (sortConfig.direction === 'desc' ? '▼' : '▲') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teams.map((t, idx) => (
              <tr key={t.name} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#fcfcfc' }}>
                <td style={teamNameStyle}>{t.name}</td>
                <td style={tdStyle}>{t.W}</td>
                <td style={tdStyle}>{t.L}</td>
                <td style={pctStyle}>{t.PCT}</td>
                <td style={tdStyle}>{t.PF}</td>
                <td style={tdStyle}>{t.PA}</td>
                <td style={{ 
                  ...tdStyle, 
                  fontWeight: '900', 
                  color: t.DIFF > 0 ? '#28a745' : t.DIFF < 0 ? '#dc3545' : '#222' 
                }}>
                  {t.DIFF > 0 ? `+${t.DIFF}` : t.DIFF}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container py-5" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 className="text-center fw-black mb-5" style={{ letterSpacing: '-2px', fontSize: '3rem' }}>STANDINGS</h1>
      {renderTable('EASTERN', standingsData.filter(t => t.conference === 'EASTERN'))}
      {renderTable('WESTERN', standingsData.filter(t => t.conference === 'WESTERN'))}
    </div>
  );
};

// --- STYLES ---
const confHeaderStyle = { fontWeight: '900', color: '#ff4d4d', borderBottom: '4px solid #111', paddingBottom: '8px', marginBottom: '20px' };
const tableWrapper = { borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid #eee' };
const thStyle = { padding: '15px', textAlign: 'center', fontSize: '12px', fontWeight: '800' };
const thStyleLeft = { ...thStyle, textAlign: 'left', paddingLeft: '25px' };
const tdStyle = { padding: '15px', textAlign: 'center', verticalAlign: 'middle' };
const teamNameStyle = { ...tdStyle, textAlign: 'left', paddingLeft: '25px', fontWeight: '900' };
const pctStyle = { ...tdStyle, color: '#666' };

export default Standings;