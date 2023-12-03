import { Box, CardHeader, Typography } from "@mui/material";
import Chart from "./shared/components/Chart";
import moexApiInstance, { SecuritiesInfoRequest } from "./services/apiMoex";
import { useEffect, useState } from "react";
import { Engine } from "./models/Moex";
import { ISecurity } from "./models/ISecurity";
import { IChartData } from "./models/ICandle";
import { serialiseCandles } from "./utils/graph";
import { set } from "mobx";

const initialData = [
    { time: "2018-12-22", value: 32.51 },
    { time: "2018-12-23", value: 31.11 },
    { time: "2018-12-24", value: 27.02 },
    { time: "2018-12-25", value: 27.32 },
    { time: "2018-12-26", value: 25.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 25.46 },
    { time: "2018-12-29", value: 23.92 },
    { time: "2018-12-30", value: 22.68 },
    { time: "2018-12-31", value: 22.67 },
    // open: 173.74, high: 175.99, low: 170.95, close: 173.20
];

function DrawUi() {
    const [securities, setSecuries] = useState<ISecurity | null>(null);
    const [graphData, setGraphData] = useState<IChartData[]>([]);
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

    return (
        <>
            {isLoaded ? (
                <Box sx={{ m: 10 }}>
                    <Chart data={graphData}></Chart>
                </Box>
            ) : (
                <Box sx={{ m: 10 }}>
                    <Typography variant="h4">Loading...</Typography>
                </Box>
            )}
        </>
    );
}

export default DrawUi;
