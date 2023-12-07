import axios from "axios";
import storage from "../utils/storage";
import { BASE_URL } from "../config";

interface UserLogin {
    username: string;
    password: string;
}

interface CreateUserData {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    role_id: number;
}

interface AuthResponse {
    accessToken: string;
    role: string;
}

// {
//   "first_name": "Ivan",
//   "last_name": "Ivanov",
//   "email": "test@]test.com",
//   "password": "Test123456",
//   "role_id": 2
// }

const ApiAuth = {
    async loginUser(data: UserLogin) {
        // send POST request to /auth/login with FormData object
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);

        const response = await axios.post<AuthResponse>(
            `${BASE_URL}/auth/login`,
            formData,
        );
        // const response = await axios.post(`${BASE_URL}/auth/login`, data);
        console.log(response.data);
        storage.setToken(response.data.accessToken);
        storage.setRole(response.data.role);
        return;
    },
    async createUser(data: CreateUserData) {
        const response = await axios.post<AuthResponse>(
            `${BASE_URL}/auth/register`,
            data,
        );
        storage.setToken(response.data.accessToken);
        storage.setRole(response.data.role);
        return;
    },
};
export default ApiAuth;
