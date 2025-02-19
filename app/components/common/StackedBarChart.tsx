"use client"
import React from 'react';
import { useTheme } from '@mui/joy/styles';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export default function StackedBarChart() {
    const theme = useTheme(); // The runtime theme.
    const data = {
        labels,
        datasets: [
            {
                label: 'View(s)',
                data: labels.map(() => 500),
                backgroundColor: `${theme.palette.primary.solidBg})`,
            },
            {
                label: 'Like(s)',
                data: labels.map(() => 600),
                backgroundColor: `${theme.palette.success.solidBg}`,
            },
        ],
    };

    const options = {
        plugins: {},
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
    };
  return <Bar options={options} data={data} />;
}
