import axios from "axios";
import storage from "../utils/storage";
import { BASE_URL } from "../config";
import { IAlgoritm } from "../models/IAlgorithm";

interface ICreateAlgo {
    sec_id: string;
    name: string;
    blockType: string;
}

interface ICreateAlgoResponse {
    sec_id: string;
    name: string;
    uuid: string;
}

const ApiAlgo = {
    async createAlgorithm(data: ICreateAlgo): Promise<ICreateAlgoResponse> {
        const config = {
            headers: {
                Authorization: storage.getToken()
                    ? `Bearer ${storage.getToken()}`
                    : undefined,
            },
        };
        console.log(config.headers);
        const response = await axios.post<ICreateAlgoResponse>(
            `${BASE_URL}/${data.blockType}/create`,
            {
                sec_id: data.sec_id,
                name: data.name,
            },
            config,
        );
        if (response.status != 200) {
            throw new Error("Error creating algorithm");
        } else {
            return response.data;
        }
    },
    async getMyAlgorithms(blockType: string): Promise<IAlgoritm[]> {
        const config = {
            headers: {
                Authorization: storage.getToken()
                    ? `Bearer ${storage.getToken()}`
                    : undefined,
            },
        };
        const response = await axios.get<IAlgoritm[]>(
            `${BASE_URL}/${blockType}`,
            config,
        );
        if (response.status != 200) {
            throw new Error("Error getting algorithms");
        } else {
            return response.data;
        }
    },
};
export default ApiAlgo;