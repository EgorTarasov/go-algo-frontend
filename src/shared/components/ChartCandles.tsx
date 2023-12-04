import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode, ISeriesApi, DeepPartial, IChartApi, LayoutOptions, ColorType } from 'lightweight-charts';
import { IChartData } from "../../models/IChartData";

interface ChartColors {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
}

interface ChartProps {
    data: IChartData[];
    colors?: ChartColors;
}

const Chart: React.FC<ChartProps> = ({ data, colors }) => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chartContainerRef.current) {
            const chart: IChartApi = createChart(chartContainerRef.current, {
                width: chartContainerRef.current!.clientWidth,
                height: 300,
                layout: {
                    background: {
                        type: ColorType.Solid,
                        color: colors?.backgroundColor || '#000000',
                    },
                    textColor: colors?.textColor || 'rgba(255, 255, 255, 0.9)',
                } as DeepPartial<LayoutOptions>,
                grid: {
                    vertLines: {
                        color: 'rgba(197, 203, 206, 0.5)',
                    },
                    horzLines: {
                        color: 'rgba(197, 203, 206, 0.5)',
                    },
                },
                crosshair: {
                    mode: CrosshairMode.Normal,
                },
                rightPriceScale: {
                    borderColor: 'rgba(197, 203, 206, 0.8)',
                },
                timeScale: {
                    borderColor: 'rgba(197, 203, 206, 0.8)',
                },
            });

            const candleSeries: ISeriesApi<'Candlestick'> = chart.addCandlestickSeries({
                upColor: 'rgba(255, 144, 0, 1)',
                downColor: '#000',
                borderDownColor: 'rgba(255, 144, 0, 1)',
                borderUpColor: 'rgba(255, 144, 0, 1)',
                wickDownColor: 'rgba(255, 144, 0, 1)',
                wickUpColor: 'rgba(255, 144, 0, 1)',
                priceFormat: {
                    type: 'custom',
                    formatter: (price: number) => {
                        const date = new Date(price * 1000);
                        const hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
                        const minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();
                        const seconds = date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds();
                        return `${hours}:${minutes}:${seconds}`;
                    },
                },
            });

            candleSeries.setData(data as any);



            //   chart.timeScale().applyOptions({
            //     timeVisible: true,
            //     secondsVisible: false,
            //     timeFormatter: (time : any) => {
            //         const date = new Date(time * 1000);
            //         const hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
            //         const minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();
            //         return `${hours}:${minutes}`;
            //     },
            // });

        }
    }, [ data, colors]);

    return <div ref={chartContainerRef} />;
};

export default Chart;
