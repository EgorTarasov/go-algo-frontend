import { Box } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";
import { useMediaQuery } from '@mui/material';
import MainGraphStocks from "../../shared/widgets/MainGraphStocks";


function DashboardAlgo() {
    const isMobile = useMediaQuery('(max-width:900px)');
    return (
        <>
            <Box sx={{ display: 'flex' }} className='container-main'>
                <MenuAlgo isStatic={!isMobile} />
                <Box sx={{ ml: '310px', width: 'calc(100% - 310px)' }}>
                    <MainGraphStocks />
                </Box>
            </Box>

        </>
    )
}

export default DashboardAlgo;