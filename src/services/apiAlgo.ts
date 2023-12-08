import axios from "axios";
import storage from "../utils/storage";
import { BASE_URL } from "../config";
import { IAlgoritm, IVersion } from "../models/IAlgorithm";

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
    async update(uuid: string, modelObject: any): Promise<IAlgoritm> {
        const config = {
            headers: {
                Authorization: storage.getToken()
                    ? `Bearer ${storage.getToken()}`
                    : undefined,
            },
        };
        const response = await axios.post<IAlgoritm>(
            `${BASE_URL}/ml/d/${uuid}`,
            modelObject,
            config,
        );
        if (response.status != 200) {
            throw new Error("Error getting algorithms");
        } else {
            return response.data;
        }
    },
    async getAlgoMl(uuid: string): Promise<IAlgoritm> {
        const config = {
            headers: {
                Authorization: storage.getToken()
                    ? `Bearer ${storage.getToken()}`
                    : undefined,
            },
        };
        const response = await axios.get<IAlgoritm>(
            `${BASE_URL}/ml/d/${uuid}`,
            config,
        );
        if (response.status != 200) {
            throw new Error("Error getting algorithms");
        } else {
            return response.data;
        }
    },
    async backtest(uuid: string, period: string): Promise<IAlgoritm> {
        const config = {
            headers: {
                Authorization: storage.getToken()
                    ? `Bearer ${storage.getToken()}`
                    : undefined,
            },
        };
        console.log(config, 'con')
        const response = await axios.post<IAlgoritm>(
            `${BASE_URL}/ml/d/${uuid}/train/${period}m`,
            {},
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
