export const MlNodeSectionNames : IMlNodeSectionNames= {
    'models' : 'Модели',
    'operators' : 'Операторы',
    'delay' : 'Сдвиг',
    'mean' : 'Скользящие среднии',
    'candles' : 'Доля красных и зеленых свечей',
    'RSISection' : 'Индекс относительной силы',
    'MACDSection' : 'Расхождение скользящих средних',
    'BollingerSection' : 'Линии Боллинджера',
    'timeFeatures' : 'Временные признаки',
};

export const MlNodeTip : IMlNodeTip = {
    'Catboost' : 'Модель Catboost',
    'LightGBM' : 'Модель LightGBM',
    'CandleSteps' : 'Интервал свечей',
    'lags' : 'Сдвиг',
    'CMA': 'Кумулятивное скользящее среднее',
    'SMA': 'Простое скользящее среднее',
    'EMA': 'Экспоненциальное скользящее среднее',
    'Green candles ratio': 'Доля зеленых свечей',
    'Red candles ratio': 'Доля красных свечей',
    'RSI': 'Индекс относительной силы',
    'MACD': 'Расхождение скользящих средних',
    'Bollinger': 'Линии Боллинджера',
    'month' : 'Месяц', 
    'week' : 'Неделя', 
    'day_of_month' : 'Число', 
    'day_of_week' : 'День недели', 
    'hour' : 'Час', 
    'minute' : 'Минута'
};

export const MlNodeSectionNodes : IMlNodeSectionNodes = {
    'models' : ['Catboost', 'LightGBM'],
    'operators' : ['CandleSteps'],
    'delay' : ['Lags'],
    'mean' : ['CMA', 'SMA', 'EMA'], 
    'candles' : ['Green candles ratio', 'Red candles ratio'],
    'RSISection' : ['RSI'],
    'MACDSection' : ['MACD'],
    'BollingerSection' : ['Bollinger'],
    'timeFeatures' : ['month', 'week', 'day_of_month', 'day_of_week', 'hour', 'minute']
}

export interface IMlNodeSectionNames {
    [key: string]: string;
    models: string;
    operators: string;
    delay: string;
    mean: string;
    candles: string;
    RSISection: string;
    MACDSection: string;
    BollingerSection: string;
    timeFeatures: string;
}

export interface IMlNodeTip {
    [key: string]: string;
    Catboost: string;
    LightGBM: string;
    CandleSteps: string;
    lags: string;
    CMA: string;
    SMA: string;
    EMA: string;
    'Green candles ratio': string;
    'Red candles ratio': string;
    RSI: string;
    MACD: string;
    Bollinger: string;
    month: string;
    week: string;
    day_of_month: string;
    day_of_week: string;
    hour: string;
    minute: string;
}

export interface IMlNodeSectionNodes {
    [key: string]: string[];
    models: string[];
    operators: string[];
    delay: string[];
    mean: string[];
    candles: string[];
    RSISection: string[];
    MACDSection: string[];
    BollingerSection: string[];
    timeFeatures: string[];
}
