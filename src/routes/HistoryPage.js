import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const charts = [
  {
    label: "Temperature",
    color: "rgba(255, 99, 132, 1)",
    field: "Temperature",
  },
  {
    label: "Light Intensity",
    color: "rgba(255, 248, 79, 1)",
    field: "LightIntensity",
  },
  {
    label: "CO2 Levels",
    color: "rgba(118, 118, 118, 1)",
    field: "Co2Levels",
  },
  {
    label: "Humidity",
    color: "rgba(80, 183, 255, 1)",
    field: "Humidity",
  },
];

const itemsPerPage = 5;

function GetHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentChart, setCurrentChart] = useState(0); // New state variable for current chart
  const navigate = useNavigate();

  const fetchHistoryData = async () => {
    try {
      const response = await fetch(
        "https://api.npoint.io/644e3e9611e9d4c1728d"
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

  const formatChartData = (field) => {
    const labels = currentData.map((entry) =>
      new Date(entry.date).toLocaleString()
    );
    const data = currentData.map((entry) => entry[field]);
    return {
      labels,
      datasets: [
        {
          label: charts[currentChart].label,
          data,
          borderColor: charts[currentChart].color,
          backgroundColor: charts[currentChart].color.replace("1)", "0.2)"),
          fill: false,
        },
      ],
    };
  };

  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = historyData.slice(startIndex, endIndex);

  return (
    <div className="wrapper">
      {historyData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="history-wrapper">
          <div className="history-chart">
            <div className="pagination">
              {charts.map((chart, index) => (
                <button
                  className="button"
                  key={index}
                  onClick={() => setCurrentChart(index)} // Set currentChart on button click
                  disabled={currentChart === index} // Disable button if currentChart matches index
                >
                  {chart.label}
                </button>
              ))}
            </div>
            <Line data={formatChartData(charts[currentChart].field)} />
          </div>

          <div className="history-table">
            <h1>History data</h1>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Temperature 🌡️</th>
                  <th>Light Intensity 💡</th>
                  <th>CO2 Levels 🏭</th>
                  <th>Humidity 💧</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((entry) => (
                  <tr key={entry.date}>
                    <td>{new Date(entry.date).toLocaleString()}</td>
                    <td>{entry.Temperature}°C</td>
                    <td>{entry.LightIntensity} lux</td>
                    <td>{entry.Co2Levels} ppm</td>
                    <td>{entry.Humidity}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <span>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages - 1))
                }
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetHistory;
