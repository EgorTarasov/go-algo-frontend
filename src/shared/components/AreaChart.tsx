import React from "react";
import { Line } from "react-chartjs-2";

export interface DataPoint {
    value: number;
    label: string;
}

export interface AreaChartProps {
    dataPoints: DataPoint[];
    color: string;
}
export function createDataPoints(startValue: number, size: number): DataPoint[] {
    const dataPoints: DataPoint[] = [];

    for (let i = 0; i < size; i++) {
        // Генерация случайного значения на основе startValue и текущего индекса
        const value = startValue + Math.random() * 10 - 5; // Рандомизация в пределах +/- 5 от startValue
        const label = `Label ${i + 1}`;

        dataPoints.push({ label, value });
    }

    return dataPoints;
}

const AreaChart: React.FC<AreaChartProps> = ({ dataPoints, color }) => {
    const data = {
        labels: dataPoints.map((dp) => dp.label),
        datasets: [
            {
                data: dataPoints.map((dp) => dp.value),
                fill: true,
                backgroundColor: color,
                borderColor: color,
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default AreaChart;
