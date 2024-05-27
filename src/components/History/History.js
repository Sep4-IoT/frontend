import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "chart.js/auto";
import LoadingSpinner from "./LoadingSpinner";
import chartLabels from "../data/chartLabels";
import charts from "../data/chartData";
import Pagination from "./Pagination";
import HistoryTable from "./HistoryTable";
import HistoryChart from "./HistoryChart";

const itemsPerPage = 5;

function GetHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentChart, setCurrentChart] = useState(0);

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
          label: chartLabels[field],
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
        <LoadingSpinner />
      ) : (
        <div className="history-wrapper">
          <HistoryChart
            currentData={currentData}
            currentChart={currentChart}
            setCurrentChart={setCurrentChart}
            formatChartData={formatChartData}
          />

          <HistoryTable currentData={currentData} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default GetHistory;
