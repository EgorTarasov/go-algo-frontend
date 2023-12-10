export interface IAlgoritm {
    sec_id: string;
    name: string;
    uuid: string;
    algo_type: string;
    versions: IVersion[];
}

export interface IBacktestResult {
    status: string;
    data: any;
    [key: string]: string | number | null;
}

// interface IBacktestData {
//     "Start": string | null,
//     "End": string | null,
//     "Duration": string | null,
//     "Exposure Time [%]": number | null,
//     "Equity Final [$]": number | null,
//     "Equity Peak [$]": number | null,
//     "Return [%]": number | null,
//     "Buy & Hold Return [%]": number | null,
//     "Return (Ann.) [%]": number | null,
//     "Volatility (Ann.) [%]": number | null,
//     "Sharpe Ratio": number | null,
//     "Sortino Ratio": number | null,
//     "Calmar Ratio": number | null,
//     "Max. Drawdown [%]": number | null,
//     "Avg. Drawdown [%]": number | null,
//     "Max. Drawdown Duration": string | null,
//     "Avg. Drawdown Duration": string | null,
//     "# Trades": number,
//     "Best Trade [%]": number | null,
//     "Worst Trade [%]": number | null,
//     "Avg. Trade [%]": number | null,
//     "Max. Trade Duration": string | null,
//     "Avg. Trade Duration": string | null,
//     "Profit Factor": number | null,
//     "Expectancy [%]": number | null,
//     "SQN": number | null
// }

export interface IVersion {
    id: number;
    features: IMlFeatures;
    management: IRiskManagement;
    created_at?: string;
    updated_at?: string;
    nodes: any;
}

export interface IRiskManagement {
    balance: number;
    max_balance_for_trading: number;
    min_balance_for_trading: number;
    part_of_balance_for_buy: number;
    sum_for_buy_rur: number;
    sum_for_buy_num: number;
    part_of_balance_for_sell: number;
    sum_for_sell_rur: number;
    sum_for_sell_num: number;
    sell_all: boolean;
}

export interface IMlFeatures {
    lags: ILags;
    cma: ICma;
    sma: ILags;
    ema: ILags;
    green_candles_ratio: IGreencandlesratio;
    red_candles_ratio: IGreencandlesratio;
    rsi: boolean;
    macd: boolean;
    bollinger: boolean;
    time_features: IMlTimeFeatures;
    model: string;
    order: string[];
    threshold: number;
}

export interface IMlTimeFeatures {
    month: boolean;
    week: boolean;
    day_of_month: boolean;
    day_of_week: boolean;
    hour: boolean;
    minute: boolean;
}

export interface IGreencandlesratio {
    period: number[];
}

export interface ICma {
    features: string[];
}

export interface ILags {
    features: string[];
    period: number[];
}
