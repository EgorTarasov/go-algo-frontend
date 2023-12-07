import logo_moex from "../../assets/MOEXlogo-ru.svg";
import { IconButton, Button, Box } from "@mui/material";
import { TypographyHeader } from "./Typography";

export default function Logo() {
    return (
        <>
            <Box
                sx={{
                    width: "300px",
                    backgroundColor: "white",
                    height: "90%",
                    borderRadius: "24.5px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    marginTop: 0.5,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Button sx={{ height: "inherit", flex: "1" }}>
                    <img
                        src={logo_moex}
                        style={{ maxHeight: "30px", width: "150px" }}
                    />
                    <TypographyHeader
                        sx={{
                            display: "inline-block",
                            textAlign: "center",
                            fontSize: "20px",
                            ml: 1,
                        }}
                    >
                        ALGOБиржа
                    </TypographyHeader>
                </Button>
            </Box>
        </>
    );
}
