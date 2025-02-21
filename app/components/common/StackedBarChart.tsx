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
import { MONTHS } from '@/app/help/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StackedBarChart() {
    const theme = useTheme(); // The runtime theme.
    const data = {
        labels: MONTHS.en,
        datasets: [
            {
                label: 'View(s)',
                data: MONTHS.en.map(() => Math.floor(Math.random() * 1000)),
                backgroundColor: `${theme.palette.primary.solidBg})`,
            },
            {
                label: 'Like(s)',
                data: MONTHS.en.map(() => Math.floor(Math.random() * 1000)),
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
