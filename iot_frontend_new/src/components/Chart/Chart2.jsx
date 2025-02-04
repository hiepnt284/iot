import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart2({
  labels,
  windData,
}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Wind",
        data: windData,
        borderColor: "#bae7bc",
        backgroundColor: "#39ebdb",
        yAxisID: "y",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
      },
    },
    animation: {
      duration: 0, // Set duration to 0 to disable animation
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        min: 0,
        max: 79,
        title: {
          display: true,
          text: "Wind",
        },
      }
    },
  };
  return (
    <div
      className="rounded-xl shadow-xl h-full w-1/2 flex justify-center"
      style={{
        borderRadius: "12px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
}
