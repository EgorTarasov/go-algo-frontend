import { observer } from "mobx-react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";
import { useEffect } from "react";

const Profile = observer(() => {
    const isMobile = useMediaQuery("(max-width:900px)");

    useEffect(() => {
        // TODO: load data from server
    }, []);

    return (
        <>
            <Box sx={{ display: "flex" }} className="container-main">
                <MenuAlgo isStatic={!isMobile} />
                <Box sx={{ ml: "310px", width: "calc(100% - 310px)" }}>
                    <Typography variant={"h3"} style={{ fontWeight: "bold" }}>
                        Алгоритмы
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        sx={{ paddingTop: "2%", paddingLeft: "2%" }}
                    >
                        <Grid item xs={8}>
                            <Box
                                sx={{
                                    backgroundColor: "#FF0508",
                                }}
                            >
                                hello world
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box
                                sx={{
                                    backgroundColor: "#FF0508",
                                }}
                            >
                                hello world
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
});

export default Profile;
