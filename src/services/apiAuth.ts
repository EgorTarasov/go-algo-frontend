import axios from "axios";
import storage from "../utils/storage";
import { BASE_URL } from '../config';

interface UserLogin {
    username: string;
    password: string;
}

const ApiAuth = {

    async loginUser(data: UserLogin) {
        const response = await axios
            .post(`${BASE_URL}/auth/login`, data)

        storage.setToken(response.data.accessToken);
        storage.setRole(response.data.role);
        return;
    },
};
export default ApiAuth;