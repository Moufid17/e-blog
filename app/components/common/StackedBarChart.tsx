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

const months = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
};



export default function StackedBarChart() {
    const theme = useTheme(); // The runtime theme.
    const data = {
        labels: months.en,
        datasets: [
            {
                label: 'View(s)',
                data: months.en.map(() => 500),
                backgroundColor: `${theme.palette.primary.solidBg})`,
            },
            {
                label: 'Like(s)',
                data: months.en.map(() => 600),
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
