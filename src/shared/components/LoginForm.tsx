import { useState, useEffect } from "react";
import { TextField, Typography, Box, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ApiAuth from "../../services/apiAuth";
import Button from '../ui/Button';
import { TypographyHeader, TypographyMain } from "../ui/Typography";


interface LoginFormProps {
    updateAuthorized: (newAuthorized: boolean) => void;
}

const LoginForm = ({ updateAuthorized }: LoginFormProps) => {
    const [isAuthorized, setAuthorized] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState({ email: false, password: false });
    const [helperText, setHelperText] = useState({ email: '', password: '' });

    const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleChange = (event: any, type: string) => {
        type === 'email' ? setEmail(event.target.value) : setPassword(event.target.value);
    };

    useEffect(() => {
        updateAuthorized(isAuthorized);
    }, [isAuthorized]);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        let errorEmpty = false;
        let newError = { email: false, password: false };
        let newHelperText = { email: '', password: '' };

        if (!email) {
            newError.email = true;
            errorEmpty = true;
            newHelperText.email = 'Введите логин';
        }

        if (!password) {
            newError.password = true;
            errorEmpty = true;
            newHelperText.password = 'Введите пароль';
        }

        setError(newError);
        setHelperText(newHelperText);

        if (!errorEmpty) {
            ApiAuth.loginUser({ username: email, password: password })
                .then((_: any) => {
                    setAuthorized(true);
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        alert('Ошибка ввода данных, проверьте данные или пройдите регистрацию');
                    }
                });
        }
    };


    return (
        <Box sx={{ backgroundColor: 'secondary.light', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            style={{
                width: '300px', minHeight: '500px', borderRadius: '20px', padding: '30px'

            }}>
            <Box>
                <TypographyHeader>
                    Добро <br></br> пожаловать!
                </TypographyHeader>
                <TypographyMain sx={{ mt: 2 }}>
                    Пожалуйста введите свой логин и пароль
                </TypographyMain >
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection={'column'}>
                <div style={{ marginBottom: 30 }}>
                    <TypographyMain>Логин</TypographyMain>
                    <TextField
                        id="outlined-basic-1"
                        variant="outlined"
                        color="secondary"
                        error={error.email}
                        helperText={helperText.email}
                        value={email}
                        onChange={(event) => handleChange(event, 'email')}
                        sx={{
                            width: '300px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        }}
                    />
                </div>

                <div>
                    <TypographyMain>Пароль</TypographyMain>
                    <TextField type={showPassword ? 'text' : 'password'}
                        id="outlined-basic-2"
                        variant="outlined"
                        color="secondary"
                        sx={{
                            width: '300px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        }}
                        error={error.password}
                        helperText={helperText.password}
                        value={password}
                        onChange={(event) => handleChange(event, 'password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {!showPassword ? <VisibilityOffIcon onClick={handleTogglePasswordVisibility} sx={{ color: '#1F1B4C' }} /> : <VisibilityIcon onClick={handleTogglePasswordVisibility} sx={{ color: '#1F1B4C' }} />}
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </Box>
            <Box>
                <Button onClick={handleSubmit}
                    sx={{ mt: 3, width: '300px' }}>
                    Вход</Button>
                <Box sx={{ mt: 1 }}>
                    <a href='/ui' style={{ textDecoration: 'none', fontFamily: 'Favorit Pro, sans', color: 'secondary.main' ,
                fontSize: '15px'}}>Войти как инвестор</a>
                    <span> | </span>
                    <a href='/ui' style={{ textDecoration: 'none', fontFamily: 'Favorit Pro, sans', color: 'secondary.main',
                fontSize: '15px' }}>Зарегистрироваться</a>
                    <style>
                        {`
                        a:visited {
                            color: black;
                        }
                        `}
                    </style>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginForm
