import { Box } from "@mui/material";
import { TypographyMain } from "../ui/Typography";


function NotFound(){
    return(
        <>
        <Box sx={{m: 10}}>
            <TypographyMain sx={{fontSize: '40px'}}>Страница не найдена</TypographyMain>
        </Box>
        </>
    );
}

export default NotFound;