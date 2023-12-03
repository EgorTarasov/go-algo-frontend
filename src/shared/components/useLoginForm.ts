import { useState, useEffect } from 'react';
import ApiAuth from "../../services/apiAuth"; 

interface LoginFormProps {
    updateAuthorized: (newAuthorized: boolean) => void;
    updateRegister: (newRegister: boolean) => void;
}

export const useLoginForm = ({updateAuthorized, updateRegister}: LoginFormProps) => {
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

    function navigateRegister(){
        updateRegister(true);
    }

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

    return {
        email,
        password,
        showPassword,
        error,
        helperText,
        handleTogglePasswordVisibility,
        handleChange,
        handleSubmit,
        navigateRegister
    };
};
