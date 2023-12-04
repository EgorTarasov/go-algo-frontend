import {
    createChart,
    ColorType,
    IChartApi,
    DeepPartial,
    LayoutOptions,
} from "lightweight-charts";
import { useEffect, useRef, RefObject } from "react";
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

const defaultColors = {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "black",
    areaTopColor: "#2962FF",
    areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

const configureChart = (chart: IChartApi, colors: ChartColors, data: IChartData[]) => {
    const {
        backgroundColor,
        lineColor,
        textColor,
        areaTopColor,
        areaBottomColor,
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

    const mainSeries = chart.addCandlestickSeries();
    mainSeries.setData(data as any);
};

const handleResize = (chart: IChartApi, chartContainerRef: RefObject<HTMLDivElement>) => {
    if (chartContainerRef.current) {
        chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
        });
    }
};

export const ChartComponent: React.FC<ChartProps> = ({ data, colors = defaultColors }) => {
    const chartContainerRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const chart: IChartApi = createChart(chartContainerRef.current!, {
            width: chartContainerRef.current!.clientWidth,
            height: 400,
        });
        configureChart(chart, colors, data);

        window.addEventListener("resize", () => handleResize(chart, chartContainerRef));
        return () => {
            window.removeEventListener("resize", () => handleResize(chart, chartContainerRef));
            chart.remove();
        };
    }, [data, colors]);

    return <div ref={chartContainerRef} />;
};

export default ChartComponent;
