import {
    ToggleButton,
    Box,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import Chart from '../components/Chart';
import { useState } from "react";


function MainGraph({ secid }: { secid: string }) {
    const [myInterval, setMyInterval] = useState<number>(1); // интервал в минутах


    return (
        <Box margin={"auto"}>
            <Box sx={{ m: 1 }}>
                <Chart secid={secid} myInterval={myInterval}></Chart>
                <ToggleButtonGroup
                    size="small"
                    value={myInterval}
                    exclusive
                    onChange={(_, newInterval) => {
                        if (newInterval !== null) {
                            setMyInterval(newInterval);
                        }
                    }}
                    aria-label="Small sizes"
                >
                    <ToggleButton value={1} key={1} selected={myInterval === 1}>
                        <Typography>Минута</Typography>
                    </ToggleButton>
                    ,
                    <ToggleButton
                        value={10}
                        key={10}
                        selected={myInterval === 10}
                    >
                        <Typography>10 Минут</Typography>
                    </ToggleButton>
                    ,
                    <ToggleButton
                        value={60}
                        key={60}
                        selected={myInterval === 60}
                    >
                        <Typography>Час</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    );
}

export default MainGraph;
