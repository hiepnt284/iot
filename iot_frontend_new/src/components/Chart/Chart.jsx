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

export default function Chart({
  labels,
  temperatureData,
  humidityData,
  lightData,
}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: temperatureData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
        tension: 0.4,
      },
      {
        label: "Humidity",
        data: humidityData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
        tension: 0.4,
      },
      {
        label: "Light",
        data: lightData,
        borderColor: "#e6e918",
        backgroundColor: "#fafe05",
        yAxisID: "y1",
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
        max: 100,
        title: {
          display: true,
          text: "Temperature / Humidity",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        min: 0,
        max: 1000,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Light",
        },
      },
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
