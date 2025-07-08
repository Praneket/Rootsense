// src/components/SensorChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function SensorChart({ title, dataPoints, color }) {
  const chartData = {
    labels: dataPoints.map((point) => point.time),
    datasets: [
      {
        label: title,
        data: dataPoints.map((point) => point.value),
        borderColor: color || "green",
        backgroundColor: color || "green",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
      },
      y: {
        ticks: { color: "white" },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-2">{title} Trend</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}
