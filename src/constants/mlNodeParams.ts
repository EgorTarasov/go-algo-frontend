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
        'degree_of_lift' : ['1', '2', '3'],
    },
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


