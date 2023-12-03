import { Box, Typography } from "@mui/material";

import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useAuth } from '../../hooks/AuthProvider';


function LoginPage() {
    const auth = useAuth();
    if (!auth) throw new Error("AuthProvider is missing");
    const { isAuthorized, setIsAuthorized } = auth;
    const location = useLocation();
    const navigate = useNavigate();
    const { from } = location.state || { from: { pathname: "/home" } };

    useEffect(() => {
        if (isAuthorized) {
            navigate(from.pathname);
        }
    }, [isAuthorized, navigate, from]);

    const updateAuthorized = (newAuthorized: boolean) => {
        setIsAuthorized(newAuthorized);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{backgroundColor: 'primary.main'}}>
                    <Typography
                        sx={{
                            fontFamily: 'Favorit Pro, sans',
                            fontWeight: 400,
                            fontSize: '15px',
                            color: 'black',
                            textDecoration: 'none',
                            marginRight: 0,
                            paddingRight: 2,
                        }}
                    >
                        Text
                    </Typography>
                </Box>
            </Box>

        </>
    )
}

export default LoginPage;