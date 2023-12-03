import {
    ToggleButton,
    Box,
    ToggleButtonGroup,
    Typography,
    Stack,
} from "@mui/material";
import Chart from "./shared/components/Chart";
import moexApiInstance, {
    GetCandlesRequest,
    SecuritiesInfoRequest,
} from "./services/apiMoex";
import { useEffect, useState } from "react";
import { IChartData } from "./models/IChartData";
import { serialiseCandles } from "./utils/graph";
import StockCard, { StockCardProps } from "./shared/components/StockCard";
import { createDataPoints } from "./shared/components/AreaChart";

const CardsData: StockCardProps[] = [
    {
        ticker: "Газпром",
        stockID: "GAZP", // как называется на бирже GAZP, SBER, YNDX
        stockPrice: 162.5,
        change: -0.35, // изменение цены в процентах
        data: createDataPoints(162.5, 12),
    },
    // {
    //     ticker: "Сбер",
    //     stockID: "SBER", // как называется на бирже GAZP, SBER, YNDX
    //     stockPrice: 271,
    //     change: 5.35, // изменение цены в процентах
    //     data: createDataPoints(271, 12),
    // },
];

function DrawUi() {
    // TODO: перерисовывать график на изменении интервала
    const [graphData, setGraphData] = useState<IChartData[]>([]);
    const [interval, setInterval] = useState<number>(10); // интервал в минутах
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await moexApiInstance.getSecuritiesInfo({
                ...SecuritiesInfoRequest,
                ticker: "SBER",
            });

            const candleData = (await moexApiInstance.getCandles()).candles[0];

            setGraphData(serialiseCandles(candleData.data));
            setIsLoaded(true);

            if (data) {
                // console.log(data.securities[0]);
                // setSecuries(data.securities[0]);
            }
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
            <Stack direction={"row"} spacing={2} paddingTop={5} paddingLeft={5}>
                {CardsData.map((card) => (
                    <StockCard key={card.stockID} {...card} />
                ))}
            </Stack>
            <Box sx={{ m: 10 }}>
                {isLoaded ? (
                    <Chart data={graphData}></Chart>
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
                    ,
                    <ToggleButton
                        value={1440}
                        key={1440}
                        selected={interval === 1440}
                    >
                        <Typography>День</Typography>
                    </ToggleButton>
                    ,
                    <ToggleButton
                        value={10_080}
                        key={10_080}
                        selected={interval === 10_080}
                    >
                        <Typography>Неделя</Typography>
                    </ToggleButton>
                    ,
                    <ToggleButton
                        value={40_320}
                        key={40_320}
                        selected={interval === 40_320}
                    >
                        <Typography>Неделя</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    );
}

export default DrawUi;
