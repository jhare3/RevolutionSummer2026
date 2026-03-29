import Papa from 'papaparse';

export const parseBoxScore = (csvString) => {
  const lines = csvString.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Find markers
  const visitorIdx = lines.findIndex(l => l.includes('VISITORS:'));
  const homeIdx = lines.findIndex(l => l.includes('HOME:'));
  
  const extract = (start, end) => {
    const header = lines[start + 1];
    const data = lines.slice(start + 2, end).filter(l => !l.startsWith('Totals'));
    const parsed = Papa.parse([header, ...data].join('\n'), { header: true }).data;
    
    // Clean keys to match stats.json requirements
    return parsed.map(player => ({
      ...player,
      "Blocks": player.Block || player.Blocks,
      "Steals": player.Steal || player.Steals,
      "Turnovers": player["T-over"] || player.Turnovers,
      "Charge Taken": player["Chrg Tkn"] || player["Charge Taken"]
    }));
  };

  return {
    visitors: extract(visitorIdx, homeIdx),
    home: extract(homeIdx, lines.length)
  };
};