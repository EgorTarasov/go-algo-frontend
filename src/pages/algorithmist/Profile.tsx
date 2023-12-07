import { observer } from "mobx-react";
import { Box, Grid, Typography, useMediaQuery, Button } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";

import { useEffect, useState } from "react";
import { IAlgoritm } from "../../models/IAlgorithm";
import { Link } from "react-router-dom";
import ApiAlgo from "../../services/apiAlgo";

const AlgorithmCard = (props: IAlgoritm) => {
    console.log(props.versions.length > 0);
    const change = Math.random() * 20 - 10;
    return (
        <Box
            sx={{
                // add shadow to card
                boxShadow: 2,
                width: "100%",
                height: "100%",
                borderRadius: "10px",
            }}
        >
            <Box
                sx={{
                    padding: "20px",
                }}
            >
                <Typography variant={"h5"} style={{ fontWeight: "bold" }}>
                    {props.name}
                </Typography>
                <Link
                    to={`https://www.moex.com/ru/issue.aspx?board=TQBR&code=${props.sec_id}`}
                >
                    <Typography variant={"h6"}>{props.sec_id}</Typography>
                </Link>
                {props.versions.length > 0 && (
                    <Box>
                        <Typography variant={"body1"}>
                            Версия: {props.versions[0].id}
                        </Typography>
                        <Typography variant={"body1"}>
                            Прогнозируемая доходность:{" "}
                        </Typography>
                        <Typography
                            sx={{ color: change < 0 ? "#ea3326" : "#43972a" }}
                        >
                            {change.toFixed(2)} %
                        </Typography>
                    </Box>
                )}
                <Link to={`/algorithm/ml/${props.uuid}`}>
                    <Button>Редактировать</Button>
                </Link>
            </Box>
        </Box>
    );
};

const Profile = observer(() => {
    const isMobile = useMediaQuery("(max-width:900px)");
    const [algoritms, setAlgoritms] = useState<IAlgoritm[]>([]);

    useEffect(() => {
        // TODO: load data from server
        ApiAlgo.getMyAlgorithms("ml").then((res) => {
            setAlgoritms(res);
        });
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
                        {algoritms.map((algo, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <AlgorithmCard {...algo} />
                            </Grid>
                        ))}
                        {/* <Grid item xs={8}>
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
                        </Grid> */}
                    </Grid>
                </Box>
            </Box>
        </>
    );
});

export default Profile;