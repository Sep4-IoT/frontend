import React, { useEffect, useState } from "react";
import "chart.js/auto";
import LoadingSpinner from "./LoadingSpinner";
import chartLabels from "../data/chartLabels";
import charts from "../data/chartData";
import Pagination from "./Pagination";
import HistoryTable from "./HistoryTable";
import HistoryChart from "./HistoryChart";
import axios from "axios";

const itemsPerPage = 5;

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentChart, setCurrentChart] = useState(0);

  const fetchHistoryData = async () => {
    try {
      const response = await axios.get(
        "https://javierperalta.dk/SEP4/greenhouses/1/history"
      );
      console.log(response.data)
      const data = await response.data;
      if (response.status !== 200) {
        throw new Error("Failed to fetch greenhouse data");
      }  
      setHistoryData(data);
    } catch (error) {
      console.error("No greenhouse history data found:", error);
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
  const currentData = historyData.slice().reverse().slice(startIndex, endIndex);

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

export default History;
