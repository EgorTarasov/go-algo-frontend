import { createChart, ColorType, IChartApi, ISeriesApi, DeepPartial, LayoutOptions, Background } from 'lightweight-charts';
import { useEffect, useRef, RefObject } from 'react';

interface ChartData {
    time: string;
    value: number;
}

interface ChartColors {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
}

interface ChartProps {
    data: ChartData[];
    colors?: ChartColors;
}

export const ChartComponent: React.FC<ChartProps> = (props) => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef: RefObject<HTMLDivElement> = useRef(null);

	useEffect(() => {
			const handleResize = () => {
				if (chartContainerRef.current) {
					chart.applyOptions({ width: chartContainerRef.current.clientWidth });
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
			chart.timeScale().fitContent();

			const newSeries: ISeriesApi<'Area'> = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};

const initialData: ChartData[] = [
	{ time: '2018-12-22', value: 32.51 },
	{ time: '2018-12-23', value: 31.11 },
	{ time: '2018-12-24', value: 27.02 },
	{ time: '2018-12-25', value: 27.32 },
	{ time: '2018-12-26', value: 25.17 },
	{ time: '2018-12-27', value: 28.89 },
	{ time: '2018-12-28', value: 25.46 },
	{ time: '2018-12-29', value: 23.92 },
	{ time: '2018-12-30', value: 22.68 },
	{ time: '2018-12-31', value: 22.67 },
];

export default function Chart(props: ChartProps) {
	return (
		<ChartComponent {...props} data={initialData}></ChartComponent>
	);
}
