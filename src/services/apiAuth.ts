import axios from "axios";
import storage from "../utils/storage";
import { BASE_URL } from '../config';

interface UserLogin {
    username: string;
    password: string;
}

interface CreateUserData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

const ApiAuth = {

    async loginUser(data: UserLogin) {
        // const response = await axios
        //     .post(`${BASE_URL}/auth/login`, data)

        // storage.setToken(response.data.accessToken);
        // storage.setRole(response.data.role);
        storage.setToken('12345');
        return;
    },
    async createUser(data: CreateUserData) {
        // let config = {
        //     headers: {
        //         Authorization: `Bearer ${storage.getToken()}`
        //     }
        // }
        // return await axios
        //     .post(`${BASE_URL}/api/v1/users`, data , config);
        storage.setToken('12345');
    },
};
export default ApiAuth;