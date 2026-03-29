// src/data/dataLoader.js

// Vite glob to import all JSON files in the boxscores folder
const rawFiles = import.meta.glob('./boxscores/*.json', { eager: true });

export const getAllPlayerStats = () => {
  let allRows = [];

  Object.values(rawFiles).forEach((fileModule) => {
    // Check if the JSON was imported with a default key or directly
    const gameData = fileModule.default || fileModule;
    
    if (gameData && gameData.stats) {
      allRows = [...allRows, ...gameData.stats];
    }
  });

  return allRows;
};