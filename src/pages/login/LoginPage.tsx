import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import login_picture from '../../assets/login_picture.svg';
import logo_algopack from '../../assets/logo_algopack.png';
import LoginForm from "../../shared/components/login/LoginForm";
import RegisterForm from '../../shared/components/register/RegisterForm';


function LoginPage() {
    const auth = useAuth();
    if (!auth) throw new Error("AuthProvider is missing");
    const { isAuthorized, setIsAuthorized } = auth;
    const location = useLocation();
    const navigate = useNavigate();
    const { from } = location.state || { from: { pathname: "/home" } };

    const [isRegister, setIsRegister] = useState(false);

    useEffect(() => {
        if (isAuthorized) {
            navigate(from.pathname);
        }
    }, [isAuthorized, navigate, from]);

    const updateAuthorized = (newAuthorized: boolean) => {
        setIsAuthorized(newAuthorized);
    };
    const updateRegister = (newRegister: boolean) => {
        setIsRegister(newRegister);
    };

    return (
        <>
            <Box sx={{ display: 'flex', height: '100vh', width: '100vw', justifyContent: 'space-evenly' }}>
                <Box sx={{ backgroundColor: 'primary.main', width: '50%' }}>
                    <svg
                        style={{ position: 'absolute', zIndex: 1, left: '-10%', maxWidth: '50%' }}
                        xmlns="http://www.w3.org/2000/svg" width="813" height="100%" viewBox="0 0 813 1494" fill="none">
                        <path d="M467.514 224.296C615.877 371.279 743.723 517.452 771.934 686.536C800.145 855.62 863.976 1178.44 731 1368C598.34 1558.74 268.558 1615.05 101.253 1572.82C-65.7375 1531.76 -205.821 1260.17 -296.832 1008.24C-387.843 756.305 -428.785 523.76 -374.787 322.554C-319.792 121.08 -168.545 -48.1433 -9.13787 -59.313C151.267 -70.7497 319.15 77.312 467.514 224.296Z" fill="#C6CAF5" fillOpacity="0.41" />
                    </svg>
                    <Box sx={{
                        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-around', m: 3, mt: 10,
                        flexWrap: 'wrap'
                    }}>
                        <Typography
                            sx={{
                                fontFamily: 'FavoritC, sans',
                                fontWeight: 400,
                                fontSize: '50px',
                                color: 'secondary.main',
                                textDecoration: 'none',
                                marginRight: 0,
                                paddingRight: 2,
                            }}
                        >
                            ALGOБиржа
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: 'Favorit Pro, sans',
                                fontWeight: 400,
                                fontSize: '20px',
                                color: 'secondary.main',
                                textDecoration: 'none',
                                lineHeight: '1.1',
                                marginRight: 0,
                                paddingRight: 2,
                                width: '30%'
                            }}
                        >
                            С нами
                            создание и покупка
                            торговых алгоритмов станет проще
                        </Typography>
                    </Box>
                    <Box sx={{
                        position: 'relative',
                        zIndex: 3,
                        maxWidth: '95%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '50px'
                    }}>
                        <img src={login_picture} width="70%" />
                    </Box>

                </Box>
                <Box sx={{ width: '50%' }}>
                    <Box sx={{
                        position: 'relative',
                        zIndex: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '50px'
                    }}>
                        <img src={logo_algopack} width="40%" />
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 13}}>
                        {!isRegister ?
                        (<LoginForm updateAuthorized={updateAuthorized} updateRegister={updateRegister}/>) :
                        (<RegisterForm updateAuthorized={updateAuthorized} updateRegister={updateRegister}/>)}
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default LoginPage;