import { Box } from "@mui/material";
import React from "react";
import { TypographyMain, TypographyHeader } from "../ui/Typography";

export interface StockCardProps {
    shortname: string;
    stockID: string; // как называется на бирже GAZP, SBER, YNDX
    stockPrice: number;
    changePercent: number; // изменение цены в процентах
    active: boolean;
    onClick: () => void;

    // data: DataPoint[];
}
const StockCard: React.FC<StockCardProps> = ({
    shortname,
    stockID,
    stockPrice,
    changePercent,
    active,
    onClick,
}: StockCardProps) => {
    return (
        <Box
            sx={{
                width: '300px',
                height: '172px',
                backgroundColor: 'secondary.light',
                borderRadius: '13.5px',
                boxShadow: active ? '0 0 10px #AAB0FF' : 'none',
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <Box padding={4}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                >
                    <TypographyMain sx={{ fontSize: '25px' }}>{shortname}</TypographyMain>
                    <Box>
                        <TypographyMain >{stockID}</TypographyMain>
                        {changePercent > 0 ? (
                            <TypographyMain sx={{ color: 'green', fontSize: '25px' }} >
                                {changePercent}%
                            </TypographyMain>
                        ) : changePercent < 0 ? (
                            <TypographyMain sx={{ color: 'primary.main', fontSize: '25px' }}>
                                {changePercent}%
                            </TypographyMain>
                        ) : (
                            <TypographyMain sx={{ color: 'secondary.main', fontSize: '25px' }}>
                                {changePercent}%
                            </TypographyMain>
                        )}
                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
                        {(stockPrice !== null) ? (
                            <TypographyHeader sx={{ mr: 0.5 }}>{stockPrice}</TypographyHeader>) :
                            (
                                <TypographyHeader sx={{ mr: 0.5 }}>-</TypographyHeader>)}
                        <TypographyMain sx={{ textAlign: 'center' }}>RUB</TypographyMain>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
};

export default StockCard;
