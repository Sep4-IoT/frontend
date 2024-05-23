import React from "react";
import chartLabels from "../data/chartLabels";
import units from "../data/units";

const HistoryTable = ({ currentData }) => {
  return (
    <div className="history-table">
      <h1>History data</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>{chartLabels.Temperature} 🌡️</th>
            <th>{chartLabels.LightIntensity} 💡</th>
            <th>{chartLabels.Co2Levels} 🏭</th>
            <th>{chartLabels.Humidity} 💧</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((entry) => (
            <tr key={entry.date}>
              <td>{new Date(entry.date).toLocaleString()}</td>
              <td>{entry.Temperature + " " + units.Temperature}</td>
              <td>{entry.LightIntensity + " " + units.LightIntensity}</td>
              <td>{entry.Co2Levels + " " + units.Co2Levels}</td>
              <td>{entry.Humidity + " " + units.Humidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
