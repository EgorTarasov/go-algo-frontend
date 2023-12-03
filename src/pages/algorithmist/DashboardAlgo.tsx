import { Box } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";

function DashboardAlgo() {

    return (
        <>
            <Box  sx={{display: 'flex'}} >
                <MenuAlgo isStatic={true}/>
                <Box sx={{ml: '310px'}}>
                    Dashboard
                </Box>
            </Box>

        </>
    )
}

export default DashboardAlgo;