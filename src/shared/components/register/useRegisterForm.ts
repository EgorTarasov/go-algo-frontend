import { useState, useEffect } from "react";
import ApiAuth from "../../../services/apiAuth";

interface FieldState {
    value: string;
    error: boolean;
    helperText: string;
    status: boolean;
}

interface FieldsState {
    [key: string]: FieldState;
}

interface LoginFormProps {
    updateAuthorized: (newAuthorized: boolean) => void;
    updateRegister: (newRegister: boolean) => void;
}

export const useRegisterForm = ({
    updateAuthorized,
    updateRegister,
}: LoginFormProps) => {
    const [isAuthorized, setAuthorized] = useState(false);
    useEffect(() => {
        updateAuthorized(isAuthorized);
    }, [isAuthorized]);

    function navigateRegister() {
        updateRegister(false);
    }

    const [fields, setFields] = useState<FieldsState>({
        surname: {
            value: "",
            error: false,
            helperText: "",
            status: false,
        },
        name: {
            value: "",
            error: false,
            helperText: "",
            status: false,
        },
        email: {
            value: "",
            error: false,
            helperText: "",
            status: false,
        },
        password1: {
            value: "",
            error: false,
            helperText: "",
            status: false,
        },
        password2: {
            value: "",
            error: false,
            helperText: "",
            status: false,
        },
    });

    const updateField = (fieldName: string, updates: Partial<FieldState>) => {
        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: {
                ...prevFields[fieldName],
                ...updates,
            },
        }));
    };

    const handleSurnameChange = (event: any) => {
        if (/^[А-Я][а-я]*$/.test(event.target.value)) {
            updateField("surname", { helperText: "", error: false });
        } else {
            updateField("surname", {
                helperText: "Введите с заглавной буквы на русском языке",
                error: true,
            });
        }
        updateField("surname", { value: event.target.value });
        updateField("surname", { status: false });
    };

    const handleNameChange = (event: any) => {
        if (/^[А-Я][а-я]*$/.test(event.target.value)) {
            updateField("name", { helperText: "", error: false });
        } else {
            updateField("name", {
                helperText: "Введите с заглавной буквы на русском языке",
                error: true,
            });
        }
        updateField("name", { value: event.target.value });
        updateField("surname", { status: false });
    };

    const handleEmailChange = (event: any) => {
        if (
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                event.target.value,
            )
        ) {
            updateField("email", { helperText: "", error: false });
        } else {
            updateField("email", {
                helperText: "Неверный формат ввода email",
                error: true,
            });
        }
        updateField("email", { value: event.target.value });
        updateField("surname", { status: false });
    };

    const handlePassword1 = (event: any) => {
        const password1 = event.target.value;
        updateField("password1", { value: password1 });

        if (!password1) {
            updateField("password1", {
                helperText: "Введите пароль",
                error: true,
            });
        } else {
            updateField("password1", { helperText: "", error: false });
        }

        if (
            fields["password2"].value &&
            password1 !== fields["password2"].value
        ) {
            updateField("password2", {
                helperText: "Пароли не совпадают",
                error: true,
            });
        } else if (fields["password2"].value) {
            updateField("password2", { helperText: "", error: false });
        }
    };

    const handlePassword2 = (event: any) => {
        const password2 = event.target.value;
        updateField("password2", { value: password2 });

        if (!password2) {
            updateField("password2", {
                helperText: "Подтвердите пароль",
                error: true,
            });
        } else if (password2 !== fields["password1"].value) {
            updateField("password2", {
                helperText: "Пароли не совпадают",
                error: true,
            });
        } else {
            updateField("password2", { helperText: "", error: false });
        }
    };

    const handleCreateUser = (event: any) => {
        let errorEmpty = false;
        event.preventDefault();

        if (!fields["surname"].value) {
            updateField("surname", {
                helperText: "Введите фамилию",
                error: true,
            });
            errorEmpty = true;
        } else updateField("surname", { helperText: "", error: false });

        if (!fields["name"].value) {
            updateField("name", { helperText: "Введите имя", error: true });
            errorEmpty = true;
        } else updateField("name", { helperText: "", error: false });

        if (!fields["email"].value) {
            updateField("email", { helperText: "Введите email", error: true });
            errorEmpty = true;
        } else updateField("email", { helperText: "", error: false });

        if (!fields["password1"].value || !fields["password2"].value) {
            updateField("password1", {
                helperText: "Введите пароль",
                error: true,
            });
            updateField("password2", {
                helperText: "Повторите пароль",
                error: true,
            });
            errorEmpty = true;
        } else {
            updateField("password1", { helperText: "", error: false });
            updateField("password2", { helperText: "", error: false });
        }

        if (!errorEmpty) {
            const result = ApiAuth.createUser({
                email: fields["email"].value,
                first_name: fields["name"].value,
                last_name: fields["surname"].value,
                password: fields["password2"].value,
                role_id: 2,
            });

            result.then((_) => {
                setAuthorized(true);
                updateField("surname", { status: true });
            });
        }
    };

    return {
        fields,
        handleSurnameChange,
        handleNameChange,
        handleEmailChange,
        handleCreateUser,
        navigateRegister,
        handlePassword1,
        handlePassword2,
    };
};
