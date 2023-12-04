import {
    ToggleButton,
    Box,
    ToggleButtonGroup,
    Typography,
    Stack,
} from "@mui/material";
import Chart from "./shared/components/Chart";
import ChartCandles from './shared/components/ChartCandles'
import moexApiInstance from "./services/apiMoex";
import { useEffect, useState } from "react";
import { IChartData } from "./models/IChartData";
import { serialiseCandles } from "./utils/graph";
import StockCard, { StockCardProps } from "./shared/components/StockCard";
import { createDataPoints } from "./shared/components/AreaChart";

// const CardsData: StockCardProps[] = [
//     {
//         ticker: "Газпром",
//         stockID: "GAZP", // как называется на бирже GAZP, SBER, YNDX
//         stockPrice: 162.5,
//         change: -0.35, // изменение цены в процентах
//         data: createDataPoints(162.5, 12),
//     },
//     // {
//     //     ticker: "Сбер",
//     //     stockID: "SBER", // как называется на бирже GAZP, SBER, YNDX
//     //     stockPrice: 271,
//     //     change: 5.35, // изменение цены в процентах
//     //     data: createDataPoints(271, 12),
//     // },
// ];

function DrawUi() {
    // TODO: перерисовывать график на изменении интервала
    const [graphData, setGraphData] = useState<IChartData[]>([]);
    const [interval, setInterval] = useState<number>(10); // интервал в минутах
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await moexApiInstance.getSecuritiesInfo({
                engines: "stock",
                markets: "shares",
                boards: "TQBR",
                ticker: "SBER",
            });

            const candleData = (await moexApiInstance.getCandles()).candles[0];

            setGraphData(serialiseCandles(candleData.data));
            setIsLoaded(true);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            setIsLoaded(false);
            const candleData = (
                await moexApiInstance.getCandles({
                    ...GetCandlesRequest,
                    interval: interval,
                })
            ).candles[0];
            setGraphData(serialiseCandles(candleData.data));
            setIsLoaded(true);
        };
        fetch();
    }, [interval]);

    return (
        //
        <Box margin={"auto"}>
            {/* <Stack direction={"row"} spacing={2} paddingTop={5} paddingLeft={5}>
                {CardsData.map((card) => (
                    <StockCard key={card.stockID} {...card} />
                ))}
            </Stack> */}
            <Box sx={{ m: 10 }}>
                {isLoaded ? (
                    <>
                        <Chart data={graphData}></Chart>
                        {/* <ChartCandles data={graphData}></ChartCandles> */}
                    </>
                ) : (
                    <Typography variant="h4">Loading...</Typography>
                )}
                <ToggleButtonGroup
                    size="small"
                    value={interval}
                    exclusive
                    onChange={(event, newInterval) => {
                        if (newInterval !== null) {
                            setInterval(newInterval);
                        }
                    }}
                    aria-label="Small sizes"
                >
                    <ToggleButton value={1} key={1} selected={interval === 1}>
                        <Typography>Минута</Typography>
                    </ToggleButton>
                    ,
                    <ToggleButton
                        value={10}
                        key={10}
                        selected={interval === 10}
                    >
                        <Typography>10 Минут</Typography>
                    </ToggleButton>
                    ,
                    <ToggleButton
                        value={60}
                        key={60}
                        selected={interval === 60}
                    >
                        <Typography>Час</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    );
}

export default DrawUi;
