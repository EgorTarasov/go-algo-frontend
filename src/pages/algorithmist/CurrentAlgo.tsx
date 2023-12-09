import { Box } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";
import SideAlgoInfo from "../../shared/widgets/sideAlgoInfo";
import AlgoFlow from "../../shared/widgets/AlgoFlow";
import { useParams } from "react-router-dom";
import { AllStockProvider } from "../../hooks/AllStockDataProvider";
import { useMLFlow } from "../../hooks/MlFlowProvider";
import { TypographyHeader, TypographyMain } from "../../shared/ui/Typography";

function CurrentAlgo() {
    let { type } = useParams<{ type: 'algo' | 'ml', uuid: string }>();
    const MlFlowContext = useMLFlow();
    if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
    const { algoName } = MlFlowContext;

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
                                    <AlgoFlow type={type} />
                                </Box>
                                <Box sx={{ width: '30%', ml: 5 }}>
                                     {algoName &&
                                     <Box sx={{ml: 2}}>
                                        <TypographyHeader>Алгоритм:  {algoName}</TypographyHeader>
                                    </Box>
                                    }
                                    <SideAlgoInfo />
                                </Box>
                            </Box>
                        </>
                    </Box>
            </AllStockProvider>
        </>
    )
}

export default CurrentAlgo;