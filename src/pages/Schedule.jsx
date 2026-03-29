import React from 'react';
import scheduleData from '../data/schedule.json';

const Schedule = () => {
  return (
    <div className="schedule-page">
      <h1>Spring 2026 Schedule</h1>
      <div className="weeks-container">
        {scheduleData.map((week) => (
          <div key={week.week} className="week-section">
            <div className="week-header">
              <h2>Week {week.week}</h2>
              <span className="week-date">{week.date}</span>
            </div>
            <p className="week-location">📍 {week.location}</p>
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Matchup</th>
                </tr>
              </thead>
              <tbody>
                {week.games.map((game, idx) => (
                  <tr key={idx}>
                    <td className="time-col">{game.time}</td>
                    <td className="matchup-col">{game.matchup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {week.bye && (
              <div className="bye-info">
                <strong>BYE:</strong> {week.bye}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;