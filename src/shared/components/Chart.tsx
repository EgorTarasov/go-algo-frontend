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

export const ChartComponent: React.FC<ChartProps> = (props) => {
    const {
        data,
        colors: {
            backgroundColor = "white",
            lineColor = "#2962FF",
            textColor = "black",
            areaTopColor = "#2962FF",
            areaBottomColor = "rgba(41, 98, 255, 0.28)",
        } = {},
    } = props;

    const chartContainerRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            }
        };

        const chart: IChartApi = createChart(chartContainerRef.current!, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            } as DeepPartial<LayoutOptions>,
            width: chartContainerRef.current!.clientWidth,
            height: 300,
        });
        chart.timeScale().applyOptions({
            timeVisible: true,
            secondsVisible: false,
            ticksVisible: true,
        });

        const myPriceFormatter = Intl.NumberFormat("ru", {
            style: "currency",
            currency: "RUB", // Currency for data points
        }).format;
        chart.applyOptions({
            localization: {
                locale: "ru",

                priceFormatter: myPriceFormatter,

                timeFormatter: (time: number) => {
                    return new Date(time).toUTCString().slice(16);
                },
            },

            timeScale: {
                tickMarkFormatter: (time: number) => {
                    return new Date(time).toUTCString().slice(0, 16);
                },
            },
            overlayPriceScales: {
                scaleMargins: {
                    top: 0.3,
                    bottom: 0.25,
                },
                borderVisible: false,
            },
        });

        chart.timeScale().applyOptions({
            timeVisible: true,
            secondsVisible: false,
            ticksVisible: true,
            fixLeftEdge: true,
            fixRightEdge: true,
            barSpacing: 50,
            lockVisibleTimeRangeOnResize: true,
            borderColor: "#D1D4DC",
        });

        // const newSeries: ISeriesApi<"Area"> = chart.addAreaSeries({
        //     lineColor,
        //     topColor: areaTopColor,
        //     bottomColor: areaBottomColor,
        // });
        const mainSeries = chart.addCandlestickSeries();

        mainSeries.setData(data);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);

            chart.remove();
        };
    }, [
        data,
        backgroundColor,
        lineColor,
        textColor,
        areaTopColor,
        areaBottomColor,
    ]);

    return <div ref={chartContainerRef} />;
};

export default function Chart(props: ChartProps) {
    return <ChartComponent {...props}></ChartComponent>;
}
