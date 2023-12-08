import { Box } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";
import SideAlgoInfo from "../../shared/widgets/sideAlgoInfo";
import AlgoFlow from "../../shared/widgets/AlgoFlow";
import { useParams } from "react-router-dom";
import { AllStockProvider } from "../../hooks/AllStockDataProvider";
import { MLFlowProvider } from "../../hooks/MlFlowProvider";
import { useMLFlow } from "../../hooks/MlFlowProvider";
import { TypographyMain } from "../../shared/ui/Typography";

function CurrentAlgo() {
    let { type, uuid } = useParams<{ type: 'algo' | 'ml', uuid: string }>();
    // const MlFlowContext = useMLFlow();
    // if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
    // const { algoName } = MlFlowContext;

    return (
        <>
            <AllStockProvider>
                <MLFlowProvider>
                    <Box sx={{ display: 'flex' }} className='container-main'>
                        <MenuAlgo isStatic={false} />
                        <>
                            <Box sx={{
                                display: 'flex', justifyContent: 'space-between',
                                mt: '80px', width: '100%', height: 'calc(100vh - 200px)',
                            }}>
                                {/* {algoName &&
                                    <Box>
                                        <TypographyMain>{algoName}</TypographyMain>
                                    </Box>} */}
                                <Box sx={{ width: '70%' }}>
                                    <AlgoFlow type={type} />
                                </Box>
                                <Box sx={{ width: '30%', ml: 5 }}>
                                    <SideAlgoInfo />
                                </Box>
                            </Box>
                        </>
                    </Box>
                </MLFlowProvider>
            </AllStockProvider>
        </>
    )
}

export default CurrentAlgo;