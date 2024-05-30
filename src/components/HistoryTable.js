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
              <td>{entry.Temperature + " " + units.temperature}</td>
              <td>{entry.LightIntensity + " " + units.lightIntensity}</td>
              <td>{entry.Co2Levels + " " + units.co2Levels}</td>
              <td>{entry.Humidity + " " + units.humidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
