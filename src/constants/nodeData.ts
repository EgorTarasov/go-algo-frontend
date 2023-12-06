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
    'Lags' : 'Сдвиг определяет какие предыдущие свечи учитывать при предсказании. Необходимо задать признак, по которому учитывать сдвиг и размер сдвига',
    'CMA': 'Кумулятивное скользящее среднее. Необходимо задать признак',
    'SMA': 'Простое скользящее среднее. Среднее значение последних N свечей. Необходимо задать N',
    'EMA': 'Экспоненциальное скользящее среднее. Среднее значение последних N свечей. Необходимо задать N',
    'Green candles ratio': 'Доля зеленых свечей. Сколько из последних N свечей были зелеными. Необходимо задать N',
    'Red candles ratio': 'Доля красных свечей. Сколько из последних N свечей были красными. Необходимо задать N',
    'RSI': 'Индекс относительной силы. Индикатор технического анализа, определяющий силу тренда и вероятность его смены. Необходимо задать N - по какому количеству последних свечей рассчитывать индекс',
    'MACD': 'Расхождение скользящих средних. Индикатор MACD является трендовым осциллятором, сочетающим в себе свойства и трендового индикатора, и осциллятора. Рассчитывается на основе двух скользящих средних. Необходимо задать N1, N2 - параметры для расчета скользящих средних.',
    'Bollinger': 'Линии Боллинджера. Инструмент технического анализа финансовых рынков, отражающий текущие отклонения цены акции или др инструмента.. Необходимо задать N - по какому количеству последних свечей рассчитывать индекс и K - коэффициент для построения верхней и нижней полос',
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

export const MlNodesColors : IMlNodeTip = {
    'Catboost' : '#FF0000',
    'LightGBM' : '#FF0000',
    'CandleSteps' : 'F1AFB8',
    'Lags' : '#6853BA',
    'CMA': '#AAB0FF',
    'SMA': '#AAB0FF',
    'EMA': '#AAB0FF',
    'Green candles ratio': '#536ABA',
    'Red candles ratio': '#536ABA',
    'RSI': '#B6F1CE',
    'MACD': '#FFE8AD',
    'Bollinger': '#F0952A',
    'month' : '#F1FFB8', 
    'week' : '#F1FFB8', 
    'day_of_month' : '#F1FFB8', 
    'day_of_week' : '#F1FFB8', 
    'hour' : '#F1FFB8', 
    'minute' : '#F1FFB8'
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
    Lags: string;
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
