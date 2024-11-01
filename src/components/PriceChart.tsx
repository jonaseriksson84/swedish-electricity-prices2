import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';
import PriceHeader from './PriceHeader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PriceData {
  SEK_per_kWh: number;
  time_start: string;
  time_end: string;
}

export default function PriceChart() {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState('SE3');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const response = await fetch(
          `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${day}_${selectedZone}.json`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch price data');
        }

        const data = await response.json();
        setPriceData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, [selectedZone]);

  if (isLoading) return <div>Loading price data...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentHour = new Date().getHours();
  const currentPrice = priceData[currentHour]?.SEK_per_kWh ?? null;
  const highestPrice = Math.max(...priceData.map((d) => d.SEK_per_kWh));
  const lowestPrice = Math.min(...priceData.map((d) => d.SEK_per_kWh));

  const chartData = {
    labels: priceData.map((d) => format(new Date(d.time_start), 'HH:mm')),
    datasets: [
      {
        label: 'Electricity Price (SEK/kWh)',
        data: priceData.map((d) => d.SEK_per_kWh),
        backgroundColor: priceData.map((_, index) =>
          index === currentHour
            ? 'rgba(75, 192, 192, 0.8)'
            : 'rgba(75, 192, 192, 0.4)'
        ),
        borderColor: priceData.map((_, index) =>
          index === currentHour
            ? 'rgb(75, 192, 192)'
            : 'rgba(75, 192, 192, 0.6)'
        ),
        borderWidth: priceData.map((_, index) =>
          index === currentHour ? 2 : 1
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw.toFixed(2);
            return `${value} SEK/kWh`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'SEK/kWh',
        },
        ticks: {
          callback: (value: number) => value.toFixed(2),
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  return (
    <div className="price-container">
      <PriceHeader
        currentPrice={currentPrice}
        highestPrice={highestPrice}
        lowestPrice={lowestPrice}
        selectedZone={selectedZone}
        onZoneChange={setSelectedZone}
      />
      <div
        className="chart-container"
        style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}
      >
        <Bar data={chartData} options={options} />
      </div>
      <style>{`
        @media (max-width: 768px) {
          .price-container {
            display: flex;
            flex-direction: column-reverse;
          }
        }
        `}</style>
    </div>
  );
}
