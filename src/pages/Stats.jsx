import React, { useState, useMemo } from 'react';
import rosterData from '../data/players.json';
import statsHeaders from '../data/stats.json';
import { getAllPlayerStats } from '../data/dataLoader';
import { aggregateStats } from '../utils/statsEngine';

const Stats = () => {
  // --- STATE ---
  const [statFilter, setStatFilter] = useState('Points'); 
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Load raw data from all JSON boxscores
  const allGameRows = useMemo(() => getAllPlayerStats(), []);

  // 2. FEATURE: DYNAMIC COLUMN REORDERING (from PlayerStats.js)
  // Moves the currently sorted column to the front of the list
  const dynamicColumns = useMemo(() => {
    const otherStats = statsHeaders.filter(h => h !== statFilter);
    return [statFilter, ...otherStats];
  }, [statFilter]);

  // 3. AGGREGATE DATA
  const processedPlayers = useMemo(() => {
    return (rosterData.players || []).map(player => {
      const fullName = `${player.first_name} ${player.last_name}`.trim();
      const playerGames = allGameRows.filter(row => 
        row['Player Name']?.trim().toUpperCase() === fullName.toUpperCase()
      );
      
      const calculatedStats = aggregateStats(playerGames);

      return {
        ...player,
        fullName,
        stats: calculatedStats || {},
        gp: playerGames.length
      };
    });
  }, [allGameRows]);

  // 4. FEATURE: ADVANCED SORTING & FILTERING (from PlayerStats.js)
  const sortedPlayers = useMemo(() => {
    let items = [...processedPlayers];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(p => 
        p.fullName.toLowerCase().includes(term) || p.team.toLowerCase().includes(term)
      );
    }

    items.sort((a, b) => {
      let aVal, bVal;
      // Map combined UI columns to underlying numeric keys for sorting
      const sortMap = { "2PT": "2FGM", "3PT": "3FGM", "FG": "FGM", "FT": "FTM", "REB": "REB" };
      const activeKey = sortMap[statFilter] || statFilter;

      const clean = (v) => parseFloat(String(v || 0).replace('%', ''));
      aVal = clean(a.stats[activeKey]);
      bVal = clean(b.stats[activeKey]);

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return items;
  }, [processedPlayers, statFilter, sortDirection, searchTerm]);

  // --- HANDLERS ---
  const handleSortRequest = (key) => {
    if (statFilter === key) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setStatFilter(key);
      setSortDirection('desc');
    }
  };

  // --- RENDER HELPERS (Stacked Layout) ---
  const renderCellContent = (player, header) => {
    const s = player.stats;
    switch(header) {
      case "2PT": return renderStacked(s["2FGM"], s["2FGA"], s["2FG%"]);
      case "3PT": return renderStacked(s["3FGM"], s["3FGA"], s["3FG%"]);
      case "FG":  return renderStacked(s["FGM"], s["FGA"], s["FG%"]);
      case "FT":  return renderStacked(s["FTM"], s["FTA"], s["FT%"]);
      case "REB": return (
        <div style={cellStack}>
          <span style={primaryText}>{s["REB"] || 0}</span>
          <span style={subText}><span style={label}>O:</span>{s["Off Reb"] || 0} <span style={label}>D:</span>{s["Def Reb"] || 0}</span>
        </div>
      );
      default: return <span style={primaryText}>{s[header] || 0}</span>;
    }
  };

  const renderStacked = (m, a, p) => (
    <div style={cellStack}>
      <span style={primaryText}>{m || 0}/{a || 0}</span>
      <span style={pctBadge}>{p || '0%'}</span>
    </div>
  );

  return (
    <div style={pageContainer}>
      <div style={headerArea}>
        <h1 style={titleStyle}>LEAGUE LEADERS</h1>
        <input 
          placeholder="Search Players..." 
          style={searchBar}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={tableWrapper}>
        <table style={tableMain}>
          <thead>
            <tr style={theadRow}>
              <th style={stickyHeader}>PLAYER</th>
              {/* Note: GP is hidden from UI per your request but available in data */}
              {dynamicColumns.map(h => (
                <th 
                  key={h} 
                  onClick={() => handleSortRequest(h)}
                  style={{ ...thStyle, backgroundColor: statFilter === h ? '#ff4d4d' : '#111' }}
                >
                  {h} {statFilter === h ? (sortDirection === 'desc' ? '▼' : '▲') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map(p => (
              <tr key={p.fullName} style={rowStyle}>
                <td style={stickyNameCell}>
                  <div style={{ fontWeight: '900' }}>{p.fullName}</div>
                  <div style={{ fontSize: '10px', color: '#ff4d4d', textTransform: 'uppercase' }}>{p.team}</div>
                </td>
                {dynamicColumns.map(h => (
                  <td key={h} style={{ ...tdStyle, backgroundColor: statFilter === h ? '#fff5f5' : 'transparent' }}>
                    {renderCellContent(p, h)}
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

// --- STYLES ---
const pageContainer = { padding: '40px 20px', backgroundColor: '#fff' };
const headerArea = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' };
const titleStyle = { fontWeight: '900', letterSpacing: '-2px', fontSize: '2.5rem' };
const searchBar = { padding: '12px', width: '300px', borderRadius: '8px', border: '2px solid #111', fontWeight: 'bold' };
const tableWrapper = { overflowX: 'auto', border: '2px solid #111', borderRadius: '4px' };
const tableMain = { width: '100%', borderCollapse: 'collapse', fontSize: '14px' };
const theadRow = { backgroundColor: '#111', color: '#fff' };
const thStyle = { padding: '15px 10px', textAlign: 'center', cursor: 'pointer', fontSize: '11px', fontWeight: '900', borderRight: '1px solid #333' };
const stickyHeader = { ...thStyle, position: 'sticky', left: 0, zIndex: 10, backgroundColor: '#111', textAlign: 'left', paddingLeft: '20px' };
const tdStyle = { padding: '12px 10px', textAlign: 'center', borderRight: '1px solid #eee', borderBottom: '1px solid #eee' };
const stickyNameCell = { ...tdStyle, position: 'sticky', left: 0, zIndex: 5, backgroundColor: '#fff', textAlign: 'left', paddingLeft: '20px', borderRight: '3px solid #111' };
const cellStack = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' };
const primaryText = { fontWeight: '800', color: '#111' };
const subText = { fontSize: '10px', fontWeight: 'bold' };
const label = { color: '#888', marginRight: '2px' };
const pctBadge = { fontSize: '10px', backgroundColor: '#111', color: '#fff', padding: '1px 5px', borderRadius: '3px', fontWeight: '900' };
const rowStyle = { transition: 'background 0.2s' };

export default Stats;