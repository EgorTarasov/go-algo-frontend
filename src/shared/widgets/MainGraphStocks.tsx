import { Box } from "@mui/material";
import StockCard from "../components/StockCard";
import { TypographyHeader } from "../ui/Typography";
import { Button } from "@mui/material";
import arrowRight from '../../assets/arrow_right.svg';
import StockInfo from "../components/StockInfo";
import { useEffect } from "react";
import { useAllStock } from '../../hooks/AllStockDataProvider';
import MainGraph from "./MainGraph";


function MainGraphStocks() {
    const stockContext = useAllStock();

    if (!stockContext) throw new Error("AllStockProvider is missing");
    const { stocks, setCurrentStock, currentStock } = stockContext;

    useEffect(() => {
        if (stocks.length > 0) {
            const existingCurrentStock = stocks.find(stock => stock.SECID === currentStock?.SECID);

            if (existingCurrentStock) {
                setCurrentStock(existingCurrentStock);
            } else {
                setCurrentStock(stocks[0]);
            }
        }
    }, [stocks, setCurrentStock, currentStock]);


    return (
        <>
            <div style={{ padding: '20px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <TypographyHeader sx={{ fontSize: '20px', alignSelf: 'center' }}>Акции:</TypographyHeader>
                    <Button href="/ui"
                        style={{
                            color: 'black', fontFamily: 'Favorit Pro', backgroundColor: 'transparent',
                            borderRadius: '8px', textTransform: 'lowercase', marginRight: 20, width: '70px',
                            justifyContent: 'space-between', paddingRight: '15px', fontSize: '20px'
                        }}
                    >
                        все
                        <img width="15px" height="15px" src={arrowRight} alt="logo" style={{ margin: '0 5px', paddingTop: '2px' }} />
                    </Button>
                </Box>
                <Box display="flex" flexWrap="wrap" sx={{ gap: 2, pt: 3, justifyContent: 'space-evenly' }}>
                    {stocks.slice(0, 4).map((card) => (
                        <StockCard
                            key={card['SECID']}
                            stockPrice={card['LAST']}
                            changePercent={card['LASTTOPREVPRICE']}
                            shortname={card['SHORTNAME']}
                            stockID={card['SECID']}
                            active={currentStock?.SECID === card['SECID']}
                            onClick={() => setCurrentStock(card)}
                        />
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    {currentStock &&
                        <>
                            <Box sx={{width: '60%'}}>
                                <MainGraph secid={currentStock['SECID']} />
                            </Box>
                            <Box sx={{ width: '40%', height: '350px', backgroundColor: 'secondary.light', borderRadius: '13.5px'}}>
                                <StockInfo
                                    key={currentStock['SECID']}
                                    stockPrice={currentStock['LAST']}
                                    changePercent={currentStock['LASTTOPREVPRICE']}
                                    shortname={currentStock['SHORTNAME']}
                                    stockID={currentStock['SECID']}
                                    change={currentStock['CHANGE']}
                                    volume={currentStock['VALTODAY']}
                                    cap={currentStock['ISSUECAPITALIZATION']}
                                    low={currentStock['LOW']}
                                    high={currentStock['HIGH']}
                                />
                            </Box>
                        </>}
                </Box>

            </div>
        </>
    );
}

export default MainGraphStocks;
