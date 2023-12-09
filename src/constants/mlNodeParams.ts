export const MlNodeParams: IMlNodeParams = {
    'Lags': {
        'features': ['open', 'close', 'high', 'low', 'value', 'volume', 'target'],
        'period': ['1', '2', '3', '4', '10', '14', '20', '50', '100']
    },
    'CMA': { 'features': ['open', 'close', 'high', 'low', 'value', 'volume'] },
    'SMA': {
        'features': ['open', 'close', 'high', 'low', 'value', 'volume'],
        'period': ['2', '3', '4', '10', '14', '20', '50', '100']
    },
    'EMA': {
        'features': ['open', 'close', 'high', 'low', 'value', 'volume'],
        'period': ['2', '3', '4', '10', '14', '20', '50', '100']
    },
    'Green candles ratio': { 'period': ['2', '3', '4', '10', '14', '20', '50', '100'] },
    'Red candles ratio': { 'period': ['2', '3', '4', '10', '14', '20', '50', '100'] },
    'RSI': { 'period': ['2', '3', '4', '10', '14', '20', '50', '100'] },
    'MACD': { 'period': ['12', '26'] }, //только(12, 26)
    'Bollinger': {
        'period': ['2', '3', '4', '10', '14', '20', '50', '100'], // выбор один из 2, 3, 4, 10, 14, 20, 50, 100
        'degree_of_lift': ['1', '2', '3'],
    },
}
interface IIFNodeAllParam {
    condition?: string[];
    param? : string[];
    period?: string[];
    value?: string[];
    feature_name?: string[];
    limit?: string[];
    n_fast?: string[];
    n_slow?: string[];
    average_type?: string[];
}

export const IfNodeParams: {
    [key: string]: IIFNodeAllParam;
} = {
    'anomaly': {
        condition: ['high', 'low'],
        param: ['value', 'price_changing']
    },
    'anomal_rsi': {
        period: ['2', '5', '10', '15', '20', '30', '50'],
        value: ['50', '55', '60', '65', '70', '75', '80', '85', '90']
    },
    'out_of_limits': {
        condition: ['high', 'low'],
        feature_name: ['close', 'high', 'low', 'open', 'value', 'volume', 'green_candle_ratio', 'red_candle_ratio', 'price_changing'],
        period: ['2', '5', '7', '10', '14', '21', '30', '100']
    },
    'average_cross': {
        average_type: ['ema', 'sma'],
        feature_name: ['close', 'high', 'low', 'open', 'value', 'volume'],
        n_fast: ['2', '5', '10', '15', '50', '100'],
        n_slow: ['2', '5', '10', '15', '50', '100']
    },
    'macd_cross': {
        feature_name: ['close', 'high', 'low', 'open', 'value', 'volume'],
        n_fast: ['2', '5', '10', '15', '50', '100'],
        n_slow: ['2', '5', '10', '15', '50', '100']
    },
}


export const CandleStepNames: { [key: string]: string } = {
    '1 минута': '1',
    // '5 минут': '5',
    '10 минут': '10',
    // '30 минут': '30',
    // '1 час': '60',
    // '4 часа': '240',
    // '1 сутки': '1440'
}

export const ManagmentTip: { [key: string]: string } = {
    'balance': "Баланс",
    'max_balance_for_trading': "Максимальный баланс для торговли",
    'min_balance_for_trading': "Минимальный баланс для торговли",
    'part_of_balance_for_buy': "Доля баланса для покупки",
    'sum_for_buy_rur': "Сумма для покупки в рублях",
    'sum_for_buy_num': "Сумма для покупки в количестве",
    'part_of_balance_for_sell': "Доля баланса для продажи",
    'sum_for_sell_rur': "Сумма для продажи в рублях",
    'sum_for_sell_num': "Сумма для продажи в количестве",
    'sell_all': "Продавать все",
}

export interface IManagment {
    'balance': number,
    'max_balance_for_trading': number,
    'min_balance_for_trading': number,
    'part_of_balance_for_buy': number,
    'sum_for_buy_rur': number,
    'sum_for_buy_num': number,
    'part_of_balance_for_sell': number,
    'sum_for_sell_rur': number,
    'sum_for_sell_num': number,
    'sell_all': boolean,
}


export interface IMlNodeParams {
    Lags: {
        features: string[];
        period: string[];
    };
    CMA: {
        features: string[];
    };
    SMA: {
        features: string[];
        period: string[];
    };
    EMA: {
        features: string[];
        period: string[];
    };
    'Green candles ratio': {
        period: string[];
    };
    'Red candles ratio': {
        period: string[];
    };
    RSI: {
        period: string[];
    };
    MACD: {
        period: string[];
    };
    Bollinger: {
        period: string[];
        degree_of_lift: string[];
    };
    [key: string]: {
        features?: string[];
        period?: string[];
        degree_of_lift?: string[];
    };
}


