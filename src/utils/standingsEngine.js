// src/utils/standingsEngine.js

export const calculateStandings = (gameFiles, rosterData) => {
  const teams = {};

  // 1. Initialize teams from Roster
  const eastern = rosterData.conferences.EASTERN || [];
  const western = rosterData.conferences.WESTERN || [];
  
  const setup = (name, conf) => {
    teams[name.toUpperCase()] = {
      name: name,
      W: 0, L: 0, PF: 0, PA: 0,
      conference: conf
    };
  };

  eastern.forEach(t => setup(t, 'EASTERN'));
  western.forEach(t => setup(t, 'WESTERN'));

  // 2. Process Files
  Object.values(gameFiles).forEach((file) => {
    const gameData = file.default || file;
    if (!gameData.stats) return;

    const gameScores = {}; 

    gameData.stats.forEach(row => {
      const teamName = (row.team || row.Team || "").toUpperCase().trim();
      // Filter out meta rows
      if (!teamName || teamName.includes("TOTAL") || teamName.includes("EVENT")) return;
      
      if (!gameScores[teamName]) gameScores[teamName] = 0;
      gameScores[teamName] += (parseInt(row.Points) || 0);
    });

    const competing = Object.keys(gameScores);
    if (competing.length === 2) {
      const [tA, tB] = competing;
      const sA = gameScores[tA];
      const sB = gameScores[tB];

      if (teams[tA] && teams[tB]) {
        teams[tA].PF += sA; teams[tA].PA += sB;
        teams[tB].PF += sB; teams[tB].PA += sA;

        if (sA > sB) { teams[tA].W += 1; teams[tB].L += 1; }
        else if (sB > sA) { teams[tB].W += 1; teams[tA].L += 1; }
      }
    }
  });

  return Object.values(teams);
};