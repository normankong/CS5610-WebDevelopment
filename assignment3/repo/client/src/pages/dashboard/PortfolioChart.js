/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PortfolioChart({ portfolio }) {
  let labels = portfolio.historical.map((item) => moment(item.date).format("YYYY-MM-DD")).sort();
  let prices = portfolio.historical.map((item) => item.price);

  const chartData = {
    labels,
    datasets: [
      {
        data: prices,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Portfolio",
      },
    },
  };

  return <Line options={options} data={chartData} />;
}
