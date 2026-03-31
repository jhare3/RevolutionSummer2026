/**
 * Utility to standardize keys for matching between different data sources.
 */
export const slugifyMatchup = (str) => {
  if (!str) return "";
  return str.toUpperCase().replace(/[\s.]+/g, '');
};

/**
 * Extracts team scores and period data from the parsed CSV rows.
 */
export const parseScoreFromCSV = (csvRows) => {
  // Locate the score table (typically begins after the "Regular Season" marker)
  const scoreStartIndex = csvRows.findIndex(r => r[1] === '1' && r[2] === '2');
  if (scoreStartIndex === -1) return null;

  const team1Row = csvRows[scoreStartIndex + 1];
  const team2Row = csvRows[scoreStartIndex + 2];

  if (!team1Row || !team2Row) return null;

  return {
    team1: { name: team1Row[0], half1: team1Row[1], half2: team1Row[2], final: team1Row[3] },
    team2: { name: team2Row[0], half1: team2Row[1], half2: team2Row[2], final: team2Row[3] }
  };
};