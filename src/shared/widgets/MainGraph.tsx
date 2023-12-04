import {
    ToggleButton,
    Box,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import Chart from '../components/Chart';
import { useEffect, useState } from "react";
import { IChartData } from "../../models/IChartData";
import moexApiInstance from "../../services/apiMoex";
import { serialiseCandles } from "../../utils/graph";


function MainGraph({secid} : {secid: string}) {
    const [graphData, setGraphData] = useState<IChartData[]>([]);
    const [myInterval, setMyInterval] = useState<number>(1); // интервал в минутах
    const [isLoaded, setIsLoaded] = useState(true);

    // useEffect(() => {
    //     const fetch = async () => {
    //         setIsLoaded(false);
    //         const candleData = (
    //             await moexApiInstance.getCandles({
    //                 engine: "stock",
    //                 markets: "shares",
    //                 boardgroups: 57,
    //                 ticker: secid,
    //                 interval: myInterval,
    //                 candles: 500,
    //                 timestamp: Date.now(),
    //             })
    //         ).candles[0];
    //         setGraphData(serialiseCandles(candleData.data));
    //         setIsLoaded(true);
    //     };

    //     fetch();

    //     // const intervalId = setInterval(fetch, 5000); // Запускаем fetch каждые 5000 мс

    //     // return () => {
    //     //     clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    //     // };
    // }, [myInterval, secid]);

    return (
        //
        <Box margin={"auto"}>
            <Box sx={{ m: 1 }}>
                {isLoaded ? (
                    <>
                        {/* <Chart data={graphData}></Chart> */}
                        <Chart secid={secid} myInterval={myInterval}></Chart>
                    </>
                ) : (
                    <Typography variant="h4">Загрузка...</Typography>
                )}
                <ToggleButtonGroup
                    size="small"
                    value={myInterval}
                    exclusive
                    onChange={(_, newInterval) => {
                        if (newInterval !== null) {
                            setMyInterval(newInterval);
                        }
                    }}
                    aria-label="Small sizes"
                >
                    <ToggleButton value={1} key={1} selected={myInterval === 1}>
                        <Typography>Минута</Typography>
                    </ToggleButton>
                    ,
                    <ToggleButton
                        value={10}
                        key={10}
                        selected={myInterval === 10}
                    >
                        <Typography>10 Минут</Typography>
                    </ToggleButton>
                    ,
                    <ToggleButton
                        value={60}
                        key={60}
                        selected={myInterval === 60}
                    >
                        <Typography>Час</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    );
}

export default MainGraph;
