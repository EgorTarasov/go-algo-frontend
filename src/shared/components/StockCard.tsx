import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import AreaChart, { DataPoint } from "./AreaChart";

export interface StockCardProps {
    ticker: string;
    stockID: string; // как называется на бирже GAZP, SBER, YNDX
    stockPrice: number;
    change: number; // изменение цены в процентах
    data: DataPoint[];
}
const StockCard: React.FC<StockCardProps> = ({
    ticker,
    stockID,
    stockPrice,
    change,
    data,
}: StockCardProps) => {
    return (
        <Paper>
            <Stack padding={4}>
                <Stack
                    direction={"row"}
                    spacing={20}
                    justifyContent={"space-between"}
                >
                    <Typography variant={"h4"}>{ticker}</Typography>
                    <Stack>
                        <Typography variant={"h6"}>{stockID}</Typography>
                        {change > 0 ? (
                            <Typography variant={"h6"} color={"green"}>
                                {change}%
                            </Typography>
                        ) : (
                            <Typography variant={"h6"} color={"red"}>
                                {change}%
                            </Typography>
                        )}
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"}>
                        <Typography variant={"h4"}>{stockPrice}</Typography>
                        <Typography variant={"h6"}>RUB</Typography>
                    </Stack>
                    {/* <AreaChart
                        dataPoints={data}
                        color={change < 0 ? "#FF0000" : "#00FF00"}
                    /> */}
                </Stack>
            </Stack>
        </Paper>
    );
};

export default StockCard;
