import React from "react";
import Button from "./Button";
import { Line } from "react-chartjs-2";
import charts from "../data/chartData";

const HistoryChart = ({
  currentData,
  currentChart,
  setCurrentChart,
  formatChartData,
}) => {
  return (
    <div className="history-chart">
      <div className="pagination">
        {charts.map((chart, index) => (
          <Button
            key={index}
            onClick={() => setCurrentChart(index)}
            label={chart.label}
            disabled={currentChart === index}
          />
        ))}
      </div>
      <Line data={formatChartData(charts[currentChart].field)} />
    </div>
  );
};

export default HistoryChart;
