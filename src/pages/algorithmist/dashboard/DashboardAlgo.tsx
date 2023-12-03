import { Box } from "@mui/material";
import MenuAlgo from "../../../shared/components/MenuAlgo";

function DashboardAlgo() {

    return (
        <>
            <Box  sx={{display: 'flex'}} >
                <MenuAlgo/>
                <Box>
                    Dashboard
                </Box>
            </Box>

        </>
    )
}

export default DashboardAlgo;