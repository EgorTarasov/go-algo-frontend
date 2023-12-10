import { Box, IconButton } from "@mui/material";
import { TypographyHeader, TypographyMain } from "../ui/Typography";
import { useMLFlow } from "../../hooks/MlFlowProvider";
import { IFRAME_URL } from "../../config";
import { GridLoader } from 'react-spinners';
import Close from "@mui/icons-material/Close";

function BacktestForm() {
    const MlFlowContext = useMLFlow();
    if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
    const { backtestData, setShowBacktest } = MlFlowContext;
    return (
        <>
            {backtestData &&
                <>
                    <div style={{
                        display: 'flex', flexDirection: 'column', backgroundColor: "#F3F4F6",
                        borderRadius: "20px", padding: 30
                    }}>
                        {Object.entries(backtestData.backtestData.data).map(([key, value]) =>
                            value !== null ? (
                                <div key={key} style={{ display: 'flex' }}>
                                    <TypographyHeader>{key}</TypographyHeader>
                                    <TypographyMain>{String(value)}</TypographyMain>
                                </div>
                            ) : null
                        )}
                    </div>
                </>}
            <Box sx={{
                backgroundColor: "secondary.light",
                borderRadius: "20px",
                height: "900px",
                width: "1500px",
                maxWidth: "90vw",
                maxHeight: "90vh",
                marginLeft: '10px',
                p: 5,
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <TypographyHeader sx={{ mb: 5 }}>Результат BACKTEST</TypographyHeader>
                    <IconButton  sx={{mt: -5}}
                    onClick={() => {
                        setShowBacktest(false);
                    }}>
                        <Close/>
                    </IconButton>
                </div>
                {!backtestData &&
                    <Box sx={{alignContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%', height: '100%', 
                    display: 'flex', justifyContent: 'center', mt: -12}}>
                        <GridLoader color="#FF0508" size={100}/>
                    </Box>
                }
                {backtestData?.backtestData.status &&
                    <>

                        <iframe
                            id="inlineFrameExample"
                            title="Inline Frame Example"
                            width='100%'
                            height='100%'
                            src={`${IFRAME_URL}${backtestData.backtestData.status}`}>
                        </iframe>
                    </>}
            </Box>
        </>
    );
}

export default BacktestForm;