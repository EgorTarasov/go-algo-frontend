import axios from "axios";
import { IMarketdatum } from "../models/IMarketdatum";
import { ISecurity } from "../models/ISecurity";

const MOEX_URL = "https://iss.moex.com/iss";
interface Charsetinfo {
    name: string;
}

interface ISecuritiesInfoResponse {
    charsetinfo?: Charsetinfo;
    marketdata?: IMarketdatum[];
    securities?: ISecurity[];
}

interface SecuritiesInfoRequest {
    engines: string; //= "stock";
    markets: string; //  = "shares";
    boards: string; //  = "TQBR";
    ticker: string; //  = "SBER";
}
interface GetCandlesRequest {
    engine: string;
    markets: string;
    boardgroups: number;
    ticker: string;
    interval: number;
    candles: number;
    timestamp: number;
}

interface ICandlesResponse {
    candles: Candle[];
    volumes: Candle[];
    technicals: unknown[];
}

export interface Candle {
    id: string;
    slug: string;
    type: string;
    data: number[][];
}

// export const SecuritiesInfoRequest = {
//     engines: "stock",
//     markets: "shares",
//     boards: "TQBR",
// };

// export const GetCandlesRequest = {
//     engine: "stock",
//     markets: "shares",
//     boardgroups: 57,
//     ticker: "SBER",
//     interval: 1,
//     candles: 500,
//     timestamp: 1701609202725,
// };

// https://iss.moex.com/iss/engines/stock/markets/index/boards/SNDX/securities.json?securities=IMOEX,RGBITR&iss.json=extended&iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,TRADEDATE,OPEN,CLOSE&limit=1&sort_column=TRADEDATE&sort_order=desc
// https://iss.moex.com/iss/engines/:engine/markets/:market/boards/:board/securities.json?securities=IMOEX,RGBITR&iss.json=extended&iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,TRADEDATE,OPEN,CLOSE&limit=1&sort_column=TRADEDATE&sort_order=desc
class MoexApiService {
    public async getSecuritiesInfo(
        req: SecuritiesInfoRequest,
    ) {
        // https://iss.moex.com/iss/engines/:engines/markets/:markets/boards/:boards/securities/:ticker.json?iss.meta=off&iss.json=extended&lang=ru&iss.only=marketdata,securities
        const request_url =
            MOEX_URL +
            `/engines/${req.engines}/markets/${req.markets}/boards/${req.boards}/securities/${req.ticker}.json`;
        const res = await axios.get<ISecuritiesInfoResponse[]>(request_url, {
            params: {
                lang: "ru",
                ["iss.only"]: "marketdata,securities",
                ["iss.json"]: "extended",
                ["iss.meta"]: "off",
            },
        });
        return res.data;
    }
    // https://iss.moex.com/cs/engines/stock/markets/shares/boardgroups/57/securities/SBER.hs?s1.type=candles&interval=10&candles=500&indicators=&_=1701609202725
    //https://iss.moex.com/cs/engines/:engine/markets/:markets/boardgroups/:boardgroups/securities/SBER.hs?s1.type=candles&interval=10&candles=500&indicators=&_=1701609202725
    // https://iss.moex.com/cs/engines/stock/markets/shares/boardgroups/57/securities/SBER.hs?s1.type=candles&interval=10&candles=500&indicators=&_=1701609202725
    //https://iss.moex.com/cs/engines/stock/markets/shares/boardgroups/TQBR/securities/SBER.hs?s1.type=candels&interval=10&candles=500&indicators=&_=1701609202725
    public async getCandles(req: GetCandlesRequest) {
        const request_url =
            "https://iss.moex.com/cs" +
            `/engines/${req.engine}/markets/${req.markets}/boardgroups/${req.boardgroups}/securities/${req.ticker}.hs`;
        const res = await axios.get<ICandlesResponse>(request_url, {
            params: {
                ["s1.type"]: "candles",
                interval: req.interval,
                candles: req.candles,
                indicators: "",
                _: req.timestamp,
            },
        });
        return res.data;
    }
}

const moexApiInstance = new MoexApiService();
export default moexApiInstance;
