import { Box } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";

function DashboardAlgo() {

    return (
        <>
            <Box  sx={{display: 'flex'}} >
                <MenuAlgo isStatic={false}/>
                <Box sx={{ml: '310px'}}>
                    CreateAlgo
                </Box>
            </Box>

        </>
    )
}

export default DashboardAlgo;