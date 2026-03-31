import playersData from '../data/players.json';

/**
 * Maps a player name to their team using the players.json source.
 */
export const getPlayerTeam = (playerName) => {
  const player = playersData.players.find(
    p => `${p.first_name} ${p.last_name}`.toLowerCase() === playerName.toLowerCase()
  );
  return player ? player.team : 'Unknown';
};

/**
 * Groups raw stats array into an object keyed by Team Name.
 * Filters out header rows often found in raw CSV/JSON imports.
 */
export const groupStatsByTeam = (stats) => {
  return stats.reduce((acc, stat) => {
    // Skip header rows if they exist in the JSON data
    if (stat["Player Name"] === "Player Name" || !stat["Player Name"]) return acc;
    
    const team = getPlayerTeam(stat["Player Name"]);
    if (!acc[team]) acc[team] = [];
    acc[team].push(stat);
    return acc;
  }, {});
};