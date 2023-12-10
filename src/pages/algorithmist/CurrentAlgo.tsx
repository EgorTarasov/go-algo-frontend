import { Box } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";
import SideAlgoInfo from "../../shared/widgets/sideAlgoInfo";
import AlgoFlow from "../../shared/widgets/AlgoFlow";
import { useParams } from "react-router-dom";
import { AllStockProvider } from "../../hooks/AllStockDataProvider";
import { useMLFlow } from "../../hooks/MlFlowProvider";
import { TypographyHeader, TypographyMain } from "../../shared/ui/Typography";
import { useEffect } from "react";
import { Backdrop } from '@mui/material'
import { IFRAME_URL } from "../../config";
import BacktestForm from "../../shared/components/BacktestForm";
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { useState } from "react";
import Button from '../../shared/ui/Button'

function CurrentAlgo() {
    let { type } = useParams<{ type: 'algo' | 'ml', uuid: string }>();
    const MlFlowContext = useMLFlow();
    if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
    const { algoName, showBacktest } = MlFlowContext;

    const [runTour, setRunTour] = useState(false);

    const steps: Step[] = [
        {
            target: '.instruction-button',
            content: 'По клику на эту кнопку вы в любой момент можете снова открыть инструкцию!',
        },
        {
            target: '.react-flow__node.react-flow__node-algo',
            content: 'Это блок модели.',
        },
        {
            target: '.react-flow__panel',
            content: 'Это меню блоков.',
        },
        {
            target: '.react-flow__node.react-flow__node-if',
            content: 'Это условия.',
        },
    ];

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;
        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            setRunTour(false)
        }
    };

    return (
        <>
            <AllStockProvider>
                <Joyride steps={steps} run={runTour} styles={{
                    options: {
                        backgroundColor: '#FFFFFF',
                        primaryColor: '#A00709',
                        textColor: '#000000',
                    }
                }}
                    callback={handleJoyrideCallback} continuous={true} />
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <Box sx={{ ml: 2 }}>
                                            <TypographyHeader>Алгоритм:  {algoName}</TypographyHeader>
                                        </Box>
                                        <Button className='instruction-button' sx={{ width: '117px', margin: '0 auto', height: '40px' }} onClick={() => { setRunTour(true) }}>Инструкция</Button>
                                    </div>
                                }
                                <SideAlgoInfo />
                            </Box>
                        </Box>
                    </>
                </Box>
                <Backdrop
                    sx={{ color: '#fff', zIndex: 10000 }}
                    open={showBacktest}>
                    <BacktestForm />
                </Backdrop>
            </AllStockProvider>
        </>
    )
}

export default CurrentAlgo;