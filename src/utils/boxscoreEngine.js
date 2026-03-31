/**
 * Standardizes matchup strings (e.g., "Black vs. Pink" -> "BLACKVSPINK") 
 * to ensure keys match across JSON, CSV, and Schedule data.
 */
export const slugifyMatchup = (str) => {
  if (!str) return "";
  return str.toUpperCase().replace(/[\s.]+/g, '');
};

/**
 * Extracts scores from the CSV structure.
 */
export const parseScoreFromCSV = (csvRows) => {
  // Finds the summary table (usually rows with "1", "2", "Total")
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