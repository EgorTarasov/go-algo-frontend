export const MlNodeSectionNames : IMlNodeSectionNames= {
    'models' : 'Модели',
    'operators' : 'Операторы',
    'delay' : 'Задержка',
    'mean' : 'Скользящие среднии',
    'candles' : 'Доля красных и зеленых свечей',
    'rsiSection' : 'Индекс относительной силы',
    'macdSection' : 'Расхождение скользящих средних',
    'bollingerSection' : 'Линии Боллинджера',
    'timeFeatures' : 'Временные признаки',
};

export const MlNodeTip : IMlNodeTip = {
    'Catboost' : 'Модель Catboost',
    'LightGBM' : 'Модель LightGBM',
    'candleSteps' : 'Интервал свечей',
    'lags' : 'Сдвиг',
    'cma': 'Кумулятивное скользящее среднее',
    'sma': 'Простое скользящее среднее',
    'ema': 'Экспоненциальное скользящее среднее',
    'Green candles ratio': 'Доля зеленых свечей',
    'Red candles ratio': 'Доля красных свечей',
    'rsi': 'Индекс относительной силы',
    'macd': 'Расхождение скользящих средних',
    'bollinger': 'Линии Боллинджера',
    'month' : 'Месяц', 
    'week' : 'Неделя', 
    'day_of_month' : 'Число', 
    'day_of_week' : 'День недели', 
    'hour' : 'Час', 
    'minute' : 'Минута'
};

export const MlNodeSectionNodes : IMlNodeSectionNodes = {
    'models' : ['Catboost', 'LightGBM'],
    'operators' : ['candleSteps'],
    'delay' : ['Lags'],
    'mean' : ['cma', 'sma', 'ema'], 
    'candles' : ['Green candles ratio', 'Red candles ratio'],
    'rsiSection' : ['rsi'],
    'macdSection' : ['macd'],
    'bollingerSection' : ['bollinger'],
    'timeFeatures' : ['month', 'week', 'day_of_month', 'day_of_week', 'hour', 'minute']
}

export interface IMlNodeSectionNames {
    [key: string]: string;
    models: string;
    operators: string;
    delay: string;
    mean: string;
    candles: string;
    rsiSection: string;
    macdSection: string;
    bollingerSection: string;
    timeFeatures: string;
}

export interface IMlNodeTip {
    [key: string]: string;
    Catboost: string;
    LightGBM: string;
    candleSteps: string;
    lags: string;
    cma: string;
    sma: string;
    ema: string;
    'Green candles ratio': string;
    'Red candles ratio': string;
    rsi: string;
    macd: string;
    bollinger: string;
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
    rsiSection: string[];
    macdSection: string[];
    bollingerSection: string[];
    timeFeatures: string[];
}
