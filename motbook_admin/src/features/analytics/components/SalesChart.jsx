// src/features/analytics/components/SalesChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const theme = useTheme();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.divider,
        },
      },
      x: {
        grid: {
          color: theme.palette.divider,
        },
      },
    },
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales 2024',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: theme.palette.primary.main,
        tension: 0.4,
      },
      {
        label: 'Sales 2023',
        data: [8, 12, 3, 4, 5, 4],
        borderColor: theme.palette.secondary.main,
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default SalesChart;