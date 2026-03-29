import React, { useState, useMemo } from 'react';
import rosterData from '../data/players.json';
import statsHeaders from '../data/stats.json';
import { getAllPlayerStats } from '../data/dataLoader';
import { aggregateStats } from '../utils/statsEngine';

const Stats = () => {
  const [statFilter, setStatFilter] = useState('Points'); 
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const allGameRows = useMemo(() => getAllPlayerStats(), []);

  const dynamicColumns = useMemo(() => {
    const otherStats = statsHeaders.filter(h => h !== statFilter);
    return [statFilter, ...otherStats];
  }, [statFilter]);

  const processedPlayers = useMemo(() => {
    return (rosterData.players || []).map(player => {
      const fullName = `${player.first_name} ${player.last_name}`.trim();
      const playerGames = allGameRows.filter(row => row['Player Name']?.trim() === fullName);
      const calculatedStats = aggregateStats(playerGames);
      return { ...player, fullName, stats: calculatedStats || {}, gp: playerGames.length };
    });
  }, [allGameRows]);

  const sortedPlayers = useMemo(() => {
    let items = [...processedPlayers];
    if (searchTerm) {
      items = items.filter(p => p.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    items.sort((a, b) => {
      const sortMap = { "2PT": "2FGM", "3PT": "3FGM", "FG": "FGM", "FT": "FTM", "REB": "REB" };
      const key = sortMap[statFilter] || statFilter;
      const clean = (v) => parseFloat(String(v || 0).replace('%', ''));
      const aVal = clean(a.stats[key]);
      const bVal = clean(b.stats[key]);
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return items;
  }, [processedPlayers, statFilter, sortDirection, searchTerm]);

  // --- IMPROVED RENDER HELPERS ---

  const renderShootingCell = (player, makeKey, attKey, pctKey) => (
    <div style={combinedCellStack}>
      <span style={primaryStatText}>{player.stats[makeKey] || 0}/{player.stats[attKey] || 0}</span>
      <span style={badgeStyle}>{player.stats[pctKey] || '0%'}</span>
    </div>
  );

  const renderRebCell = (player) => (
    <div style={combinedCellStack}>
      {/* Total is the star of the show */}
      <span style={primaryStatText}>{player.stats["REB"] || 0}</span>
      {/* Sub-label is clearly labeled and smaller */}
      <span style={subLabelStyle}>
        <span style={{ color: '#888' }}>O:</span>{player.stats["Off Reb"] || 0} 
        <span style={{ color: '#888', marginLeft: '4px' }}>D:</span>{player.stats["Def Reb"] || 0}
      </span>
    </div>
  );

  const renderCellContent = (player, header) => {
    switch(header) {
      case "2PT": return renderShootingCell(player, "2FGM", "2FGA", "2FG%");
      case "3PT": return renderShootingCell(player, "3FGM", "3FGA", "3FG%");
      case "FG":  return renderShootingCell(player, "FGM", "FGA", "FG%");
      case "FT":  return renderShootingCell(player, "FTM", "FTA", "FT%");
      case "REB": return renderRebCell(player);
      default:    return <span style={primaryStatText}>{player.stats[header] || 0}</span>;
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={headerControlArea}>
        <h2 style={{ margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>LEAGUE LEADERS</h2>
        <input 
          placeholder="Search players..."
          style={searchInputStyle}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={tableContainer}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
  <thead>
    <tr>
      <th style={stickyHeaderStyle}>PLAYER</th>
      {/* GP Header has been removed from here */}
      {dynamicColumns.map(header => (
        <th 
          key={header} 
          onClick={() => handleSortRequest(header)}
          style={{ 
            ...staticHeaderStyle, 
            backgroundColor: statFilter === header ? '#007bff' : '#111',
            color: '#fff'
          }}
        >
          {header} {statFilter === header ? (sortDirection === 'desc' ? ' ▼' : ' ▲') : ''}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {sortedPlayers.map((player) => (
      <tr key={player.id} style={rowStyle}>
        <td style={stickyNameStyle}>
          <div style={{ fontWeight: 'bold' }}>{player.fullName}</div>
          <div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase' }}>{player.team}</div>
        </td>
        {/* GP Data cell has been removed from here */}
        {dynamicColumns.map(header => (
          <td 
            key={header} 
            style={{ 
              ...baseDataCell, 
              backgroundColor: statFilter === header ? '#eef6ff' : 'transparent',
              borderLeft: statFilter === header ? '1px solid #cce5ff' : 'none',
              borderRight: statFilter === header ? '1px solid #cce5ff' : 'none'
            }}
          >
            {renderCellContent(player, header)}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
      </div>
    </div>
  );
};

// --- STYLING OBJECTS ---

const headerControlArea = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };

const searchInputStyle = { padding: '10px 15px', width: '300px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' };

const tableContainer = { overflowX: 'auto', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eee' };

const staticHeaderStyle = { padding: '16px 12px', fontSize: '11px', fontWeight: 'bold', textAlign: 'center', cursor: 'pointer', borderBottom: '2px solid #333' };

const stickyHeaderStyle = { ...staticHeaderStyle, position: 'sticky', left: 0, zIndex: 10, textAlign: 'left', backgroundColor: '#111', color: '#fff' };

const baseDataCell = { padding: '12px 10px', textAlign: 'center', borderBottom: '1px solid #f2f2f2' };

const stickyNameStyle = { ...baseDataCell, position: 'sticky', left: 0, zIndex: 5, backgroundColor: '#fff', textAlign: 'left', borderRight: '2px solid #eee' };

const combinedCellStack = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' };

const primaryStatText = { fontSize: '14px', fontWeight: '700', color: '#222' };

const subLabelStyle = { fontSize: '10px', fontWeight: 'bold', color: '#444' };

const badgeStyle = { fontSize: '10px', backgroundColor: '#eef6ff', color: '#007bff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' };

const rowStyle = { transition: 'background-color 0.2s' };

export default Stats;