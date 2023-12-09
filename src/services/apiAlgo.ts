import axios from "axios";
import storage from "../utils/storage";
import { BASE_URL } from "../config";
import { IAlgoritm, IBacktestResult } from "../models/IAlgorithm";

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
        const response = await axios.post<ICreateAlgoResponse>(
            `${BASE_URL}/algo/${data.blockType}/create`,
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
            `${BASE_URL}/algo`,
            config,
        );
        if (response.status != 200) {
            throw new Error("Error getting algorithms");
        } else {
            return response.data;
        }
    },
    async update(uuid: string, modelObject: any, versionUuid: string, blockType: string): Promise<IAlgoritm> {
        const config = {
            headers: {
                Authorization: storage.getToken()
                    ? `Bearer ${storage.getToken()}`
                    : undefined,
            },
        };
        const response = await axios.post<IAlgoritm>(
            `${BASE_URL}/algo/${blockType}/d/${uuid}/${versionUuid}`,
            modelObject,
            config,
        );
        if (response.status != 200) {
            throw new Error("Error getting algorithms");
        } else {
            return response.data;
        }
    },
    async getAlgoMl(uuid: string, blockType: string): Promise<IAlgoritm> {
        const config = {
            headers: {
                Authorization: storage.getToken()
                    ? `Bearer ${storage.getToken()}`
                    : undefined,
            },
        };
        const response = await axios.get<IAlgoritm>(
            `${BASE_URL}/algo/${blockType}/d/${uuid}`,
            config,
        );
        if (response.status != 200) {
            throw new Error("Error getting algorithms");
        } else {
            return response.data;
        }
    },
    async backtest(uuid: string, period: string, blockType: string, versionUuid: string): Promise<IBacktestResult> {
        const config = {
            headers: {
                Authorization: storage.getToken()
                    ? `Bearer ${storage.getToken()}`
                    : undefined,
            },
        };
        if(period === undefined) period = '1';
        const response = await axios.post<IBacktestResult>(
            `${BASE_URL}/algo/${blockType}/d/${uuid}/${versionUuid}/backtest/${period}m`,
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
