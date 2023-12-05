import { Box } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";
import { useState } from "react";
import NewAlgoForm from '../../shared/components/newAlgoForm'
import background_arrow from '../../assets/background_arrow.svg'
import { AllStockProvider } from "../../hooks/AllStockDataProvider";
import SideAlgoInfo from "../../shared/widgets/sideAlgoInfo";
import AlgoFlow from "../../shared/widgets/AlgoFlow";

function DashboardAlgo() {
    return (
        <>
            <AllStockProvider>
                <Box sx={{ display: 'flex' }} className='container-main'>
                    <MenuAlgo isStatic={false} />
                    <>
                        <Box sx={{
                            display: 'flex', justifyContent: 'space-between',
                            mt: '80px', width: '100%', height: 'calc(100vh - 200px)',
                        }}>
                            <Box sx={{ width: '70%' }}>
                                <AlgoFlow />
                            </Box>
                            <Box sx={{ width: '30%', ml: 5 }}>
                                <SideAlgoInfo />
                            </Box>
                        </Box>
                    </>
                </Box>
            </AllStockProvider>

        </>
    )
}

export default DashboardAlgo;