import { Box } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";
import { useMediaQuery } from '@mui/material';
import MainGraphStocks from "../../shared/widgets/MainGraphStocks";
import { AllStockProvider } from "../../hooks/AllStockDataProvider";


function DashboardAlgo() {
    const isMobile = useMediaQuery('(max-width:900px)');
    return (
        <>
            <AllStockProvider>
                <Box sx={{ display: 'flex' }} className='container-main'>
                    <MenuAlgo isStatic={!isMobile} />
                    <Box sx={{ ml: '310px', width: 'calc(100% - 310px)' }}>
                        <MainGraphStocks />
                    </Box>
                </Box>
            </AllStockProvider>

        </>
    )
}

export default DashboardAlgo;