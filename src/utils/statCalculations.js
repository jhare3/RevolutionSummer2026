// src/utils/statCalculations.js

export const calculateSeasonStats = (playerGames) => {
  let gamesPlayed = 0; // Initialize at 0 instead of playerGames.length

  const totals = {
    points: 0, assists: 0, rebounds: 0, steals: 0, blocks: 0,
    deflections: 0, fouls: 0, charges: 0, airballs: 0,
    fgm: 0, fga: 0, threePM: 0, threePA: 0, ftm: 0, fta: 0
  };

  playerGames.forEach(game => {
    // 1. GATEKEEPER: Check if they actually participated
    // A player "played" if they recorded minutes OR at least one counting stat
    const hasStats = 
      Number(game.FGA || 0) > 0 || 
      Number(game.FTA || 0) > 0 || 
      Number(game.Assists || 0) > 0 || 
      Number(game.REB || 0) > 0 ||
      Number(game.Steals || 0) > 0 ||
      Number(game.Blocks || 0) > 0 ||
      (game.MIN && game.MIN !== "0" && game.MIN !== "DNP"); // If your JSON has a MIN field

    if (hasStats) {
      gamesPlayed += 1;
      
      // 2. ONLY add stats if they actually played
      totals.points += Number(game.Points || 0);
      totals.assists += Number(game.Assists || 0);
      totals.rebounds += Number(game.REB || 0);
      totals.steals += Number(game.Steals || 0);
      totals.blocks += Number(game.Blocks || 0);
      totals.deflections += Number(game.Deflections || 0);
      totals.fouls += Number(game.Fouls || 0);
      totals.charges += Number(game["Charge Taken"] || 0);
      totals.airballs += Number(game.Airball || 0);
      totals.fgm += Number(game.FGM || 0);
      totals.fga += Number(game.FGA || 0);
      totals.threePM += Number(game["3FGM"] || 0);
      totals.threePA += Number(game["3FGA"] || 0);
      totals.ftm += Number(game.FTM || 0);
      totals.fta += Number(game.FTA || 0);
    }
  });

  const ppg = gamesPlayed > 0 ? (totals.points / gamesPlayed).toFixed(1) : "0.0";
  const apg = gamesPlayed > 0 ? (totals.assists / gamesPlayed).toFixed(1) : "0.0";
  const rpg = gamesPlayed > 0 ? (totals.rebounds / gamesPlayed).toFixed(1) : "0.0";

  return {
    ...totals,
    "PPG": ppg,
    "APG": apg,
    "RPG": rpg,
    "Games Played": gamesPlayed,
    "FG%": totals.fga > 0 ? Math.round((totals.fgm / totals.fga) * 100) + "%" : "0%",
    "3FG%": totals.threePA > 0 ? Math.round((totals.threePM / totals.threePA) * 100) + "%" : "0%",
    "FT%": totals.fta > 0 ? Math.round((totals.ftm / totals.fta) * 100) + "%" : "0%"
  };
};