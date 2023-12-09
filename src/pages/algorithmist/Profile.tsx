import { observer } from "mobx-react";
import { Box, Grid, Typography, useMediaQuery, Button } from "@mui/material";
import MenuAlgo from "../../shared/components/MenuAlgo";

import { useEffect, useState } from "react";
import { IAlgoritm } from "../../models/IAlgorithm";
import { Link } from "react-router-dom";
import ApiAlgo from "../../services/apiAlgo";
import { useMLFlow } from "../../hooks/MlFlowProvider";

const AlgorithmCard = (props: IAlgoritm) => {
    const MlFlowContext = useMLFlow();
    if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
    const { setNodes, setEdges, setShowBacktest } = MlFlowContext;

    useEffect(() => {
        setNodes([]);
        setEdges([]);
        setShowBacktest(false);
    }, [])
    const change = Math.random() * 20 - 10;
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'secondary.light',
                borderRadius: '13.5px',
                boxShadow: 'none',
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer'

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
                <Link target="_blank"
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
                <Link to={`/algorithm/${props.algo_type}/${props.uuid}`}>
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
