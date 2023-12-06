import { Box } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";
import NewAlgoForm from '../../shared/components/newAlgoForm'
import background_arrow from '../../assets/background_arrow.svg'


function DashboardAlgo() {
    return (
        <>
            <Box sx={{ display: 'flex' }} className='container-main'>
                <MenuAlgo isStatic={false} />
                <Box sx={{
                    mt: '80px', width: '100%', height: 'calc(100vh - 156px)',
                    backgroundImage: `url(${background_arrow})`,
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '105vh',
                }}>
                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <NewAlgoForm />
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashboardAlgo;