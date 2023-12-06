import { TextField, Box } from "@mui/material";
import Button from '../../ui/Button';
import { TypographyHeader, TypographyMain } from "../../ui/Typography";
import { useRegisterForm } from './useRegisterForm';


interface LoginFormProps {
    updateAuthorized: (newAuthorized: boolean) => void;
    updateRegister: (newRegister: boolean) => void;
}

const RegisterForm = (loginProps: LoginFormProps) => {
    const {
        fields,
        handleSurnameChange,
        handleNameChange,
        handleEmailChange,
        handleCreateUser,
        navigateRegister,
        handlePassword1,
        handlePassword2
    } = useRegisterForm(loginProps);

    return (
        <Box sx={{ backgroundColor: 'secondary.light', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            style={{
                width: '350px', minHeight: '500px', borderRadius: '20px', padding: '30px', marginTop: '-60px'

            }}>
            <Box>
                <TypographyHeader sx={{mb: 2}}>
                    Зарегистрироваться
                </TypographyHeader>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection={'column'}>
                <div style={{ marginBottom: 20 }}>
                    <TypographyMain>Фамилия</TypographyMain>
                    <TextField
                        id="outlined-basic-1"
                        variant="outlined"
                        color="secondary"
                        className="textfield"
                        error={fields['surname'].error}
                        value={fields['surname'].value}
                        helperText={fields['surname'].helperText}
                        onChange={handleSurnameChange}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <TypographyMain>Имя</TypographyMain>
                    <TextField
                        id="outlined-basic-1"
                        variant="outlined"
                        color="secondary"
                        className="textfield"
                        error={fields['name'].error}
                        value={fields['name'].value}
                        helperText={fields['name'].helperText}
                        onChange={handleNameChange}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <TypographyMain>Email</TypographyMain>
                    <TextField
                        id="outlined-basic-1"
                        variant="outlined"
                        color="secondary"
                        className="textfield"
                        error={fields['email'].error}
                        value={fields['email'].value}
                        helperText={fields['email'].helperText}
                        onChange={handleEmailChange}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <TypographyMain>Пароль</TypographyMain>
                    <TextField
                        id="outlined-basic-1"
                        variant="outlined"
                        color="secondary"
                        className="textfield"
                        error={fields['password1'].error}
                        value={fields['password1'].value}
                        helperText={fields['password1'].helperText}
                        onChange={handlePassword1}
                    />
                </div>
                <div>
                    <TypographyMain>Повторите пароль</TypographyMain>
                    <TextField
                        id="outlined-basic-1"
                        variant="outlined"
                        color="secondary"
                        className="textfield"
                        error={fields['password2'].error}
                        value={fields['password2'].value}
                        helperText={fields['password2'].helperText}
                        onChange={handlePassword2}
                    />
                </div>
            </Box>
            <Box sx={{margin: '0 auto'}}>
                <Button onClick={handleCreateUser}
                    sx={{ mt: 3, width: '300px' }}>
                    Зарегистрироваться</Button>
                <Box sx={{ mt: 1 }}>
                    <span style={{
                        textDecoration: 'none', fontFamily: 'FavoritPro-Regular, sans', color: 'secondary.main',
                        fontSize: '15px'
                    }}>Уже зарегистрированы?</span>
                    <span>    |    </span>
                    <a onClick={navigateRegister} style={{
                        textDecoration: 'none', fontFamily: 'FavoritPro-Regular, sans', color: 'secondary.main',
                        fontSize: '15px', cursor: 'pointer'
                    }}>Войти</a>
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

export default RegisterForm
