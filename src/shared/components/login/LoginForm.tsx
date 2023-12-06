import { TextField, Box, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '../../ui/Button';
import { TypographyHeader, TypographyMain } from "../../ui/Typography";
import { useLoginForm } from './useLoginForm';


interface LoginFormProps {
    updateAuthorized: (newAuthorized: boolean) => void;
    updateRegister: (newRegister: boolean) => void;
}

const LoginForm = (loginProps: LoginFormProps) => {
    const {
        email,
        password,
        showPassword,
        error,
        helperText,
        handleTogglePasswordVisibility,
        handleChange,
        handleSubmit,
        navigateRegister
    } = useLoginForm(loginProps);

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
                        className="textfield"
                        error={error.email}
                        helperText={helperText.email}
                        value={email}
                        onChange={(event) => handleChange(event, 'email')}
                    />
                </div>

                <div>
                    <TypographyMain>Пароль</TypographyMain>
                    <TextField type={showPassword ? 'text' : 'password'}
                        id="outlined-basic-2"
                        variant="outlined"
                        color="secondary"
                        className="textfield"
                        error={error.password}
                        helperText={helperText.password}
                        value={password}
                        onChange={(event) => handleChange(event, 'password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {!showPassword ? <VisibilityOffIcon onClick={handleTogglePasswordVisibility} sx={{ color: '#1F1B4C', cursor: 'pointer' }} /> : <VisibilityIcon onClick={handleTogglePasswordVisibility} sx={{ color: '#1F1B4C', cursor: 'pointer' }} />}
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
                    <a href='/ui' style={{ textDecoration: 'none', fontFamily: 'FavoritPro-Regular, sans', color: 'secondary.main' ,
                fontSize: '15px'}}>Войти как инвестор</a>
                    <span> | </span>
                    <a onClick={navigateRegister} style={{ textDecoration: 'none', fontFamily: 'FavoritPro-Regular, sans', color: 'secondary.main',
                fontSize: '15px', cursor: 'pointer' }}>Зарегистрироваться</a>
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
