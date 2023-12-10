import { Box } from "@mui/material";
import MainGraph from "./MainGraph";
import StockInfo from "../components/StockInfo";
import { useAllStock } from "../../hooks/AllStockDataProvider";

function SideAlgoInfo() {
    const stockContext = useAllStock();
    if (!stockContext) throw new Error("AllStockProvider is missing");
    const { currentStock } = stockContext;
    //todo доставать акцию не их провайдера

    return (
        <>
            {currentStock &&
                <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    <Box sx={{ width: '100%' }}>
                        <MainGraph secid={currentStock['SECID']} />
                    </Box>
                    <Box sx={{ backgroundColor: 'secondary.light', borderRadius: '13.5px', alignSelf: 'center', mb: 5 }}>
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
                            button={false}
                        />
                    </Box>
                </Box>}

        </>
    );
}

export default SideAlgoInfo;