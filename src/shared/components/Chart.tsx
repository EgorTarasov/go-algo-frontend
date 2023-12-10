import {
    createChart,
    ColorType,
    IChartApi,
    DeepPartial,
    LayoutOptions,
    ISeriesApi
} from "lightweight-charts";
import { useEffect, useRef, RefObject } from "react";
import moexApiInstance from "../../services/apiMoex";
import { serialiseCandles } from "../../utils/graph";

interface ChartColors {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
}

interface ChartProps {
    secid: string;
    myInterval: number;
    colors?: ChartColors;
}

const defaultColors = {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "black",
    areaTopColor: "#2962FF",
    areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

const configureChart = (chart: IChartApi, colors: ChartColors) => {
    const {
        backgroundColor,
        textColor,
    } = colors;

    const myPriceFormatter = Intl.NumberFormat("ru", {
        style: "currency",
        currency: "RUB",
    }).format;

    const myTimeFormatter = (time: number) => {
        return new Date(time).toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC"
        });
    };

    const myTickMarkFormatter = (time: number) => {
        return new Date(time).toLocaleString("ru", {
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC"
        });
    };

    chart.applyOptions({
        layout: {
            background: { type: ColorType.Solid, color: backgroundColor },
            textColor,
        } as DeepPartial<LayoutOptions>,
        overlayPriceScales: {
            scaleMargins: {
                top: 0.3,
                bottom: 0.25,
            },
            borderVisible: false,
        },
        localization: {
            locale: "ru",
            priceFormatter: myPriceFormatter,
            timeFormatter: myTimeFormatter,
        },
        timeScale: {
            tickMarkFormatter: myTickMarkFormatter,
            timeVisible: true,
            secondsVisible: false,
            ticksVisible: true,
            fixLeftEdge: true,
            fixRightEdge: true,
            barSpacing: 50,
            lockVisibleTimeRangeOnResize: true,
            borderColor: "#D1D4DC",
        },
    });
};

const handleResize = (chart: IChartApi, chartContainerRef: RefObject<HTMLDivElement>) => {
    if (chartContainerRef.current) {
        chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
        });
    }
};

export const ChartComponent: React.FC<ChartProps> = ({ secid, myInterval, colors = defaultColors }) => {

    const chartContainerRef: RefObject<HTMLDivElement> = useRef(null);
    const intervalRef = useRef<any>(null);

    let chart: IChartApi | null = null;
    let mainSeries: ISeriesApi<'Candlestick'> | null = null;

    useEffect(() => {
        const fetchAndUpdate = async () => {
            const candleData = (
                await moexApiInstance.getCandles({
                    engine: "stock",
                    markets: "shares",
                    boardgroups: 57,
                    ticker: secid,
                    interval: myInterval,
                    candles: 500,
                    timestamp: Date.now(),
                })
            ).candles[0];
            const newData = serialiseCandles(candleData.data);

            if (!chart) {
                chart = createChart(chartContainerRef.current!, {
                    width: chartContainerRef.current!.clientWidth,
                    height: 400,
                });
                configureChart(chart, colors);
                mainSeries = chart.addCandlestickSeries();
            }
            if (mainSeries) {
                mainSeries.setData(newData as any);
            }
            
        };

        fetchAndUpdate();
        if(myInterval === 1) intervalRef.current = setInterval(fetchAndUpdate, 5000);
        else intervalRef.current = setInterval(fetchAndUpdate, (myInterval * 60 * 1000) - 10000);

        window.addEventListener("resize", () => handleResize(chart!, chartContainerRef));
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (chart) {
                window.removeEventListener("resize", () => handleResize(chart!, chartContainerRef));
                chart.remove();
            }
        };
    }, [secid, myInterval, colors]);


    return <div ref={chartContainerRef} />;
};

export default ChartComponent;
