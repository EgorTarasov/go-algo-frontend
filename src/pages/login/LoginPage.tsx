import { Box } from "@mui/material";

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
            <Box className='root-box'            >
                Login
            </Box>

        </>
    )
}

export default LoginPage;