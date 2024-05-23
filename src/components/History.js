import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GetHistory() {
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();

  const fetchHistoryData = async () => {
    try {
      const response = await fetch(
        "https://api.npoint.io/520c013b42056f362bb7"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.error("Error fetching history data:", error);
      navigate("/error");
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  return (
    <div>
      <h2>History</h2>
      {historyData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature</th>
              <th>Light Intensity</th>
              <th>CO2 Levels</th>
              <th>Humidity</th>
              <th>Is Window Open</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((entry) => (
              <tr key={entry.date}>
                <td>{new Date(entry.date).toLocaleString()}</td>
                <td>{entry.Temperature}°C</td>
                <td>{entry.LightIntensity} lux</td>
                <td>{entry.Co2Levels} ppm</td>
                <td>{entry.Humidity}%</td>
                <td>{entry.IsWindowOpen ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetHistory;
