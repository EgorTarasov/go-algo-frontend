export const MlNodeSectionNames: IMlNodeSectionNames = {
    'models': 'Модели',
    'delay': 'Сдвиг',
    'mean': 'Скользящие среднии',
    'candles': 'Доля красных и зеленых свечей',
    'RSISection': 'Индекс относительной силы',
    'MACDSection': 'Расхождение скользящих средних',
    'BollingerSection': 'Линии Боллинджера',
    'timeFeatures': 'Временные признаки',
};


export const MlNodeTip: IMlNodeTip = {
    'Catboost': 'Модель Catboost',
    'LightGBM': 'Модель LightGBM',
    'CandleSteps': 'Интервал свечей',
    'Lags': 'Сдвиг определяет какие предыдущие свечи учитывать при предсказании. Необходимо задать признак, по которому учитывать сдвиг и размер сдвига',
    'CMA': 'Кумулятивное скользящее среднее. Необходимо задать признак',
    'SMA': 'Простое скользящее среднее. Среднее значение последних N свечей. Необходимо задать N',
    'EMA': 'Экспоненциальное скользящее среднее. Среднее значение последних N свечей. Необходимо задать N',
    'Green candles ratio': 'Доля зеленых свечей. Сколько из последних N свечей были зелеными. Необходимо задать N',
    'Red candles ratio': 'Доля красных свечей. Сколько из последних N свечей были красными. Необходимо задать N',
    'RSI': 'Индекс относительной силы. Индикатор технического анализа, определяющий силу тренда и вероятность его смены. Необходимо задать N - по какому количеству последних свечей рассчитывать индекс',
    'MACD': 'Расхождение скользящих средних. Индикатор MACD является трендовым осциллятором, сочетающим в себе свойства и трендового индикатора, и осциллятора. Рассчитывается на основе двух скользящих средних. N1, N2 - параметры для расчета скользящих средних.',
    'Bollinger': 'Линии Боллинджера. Инструмент технического анализа финансовых рынков, отражающий текущие отклонения цены акции или др инструмента. Необходимо задать N - по какому количеству последних свечей рассчитывать индекс и K - коэффициент для построения верхней и нижней полос',
    'month': 'Месяц',
    'week': 'Неделя',
    'day_of_month': 'Число',
    'day_of_week': 'День недели',
    'hour': 'Час',
    'minute': 'Минута'
};

export const MlNodeSectionNodes: IMlNodeSectionNodes = {
    'models': ['Catboost', 'LightGBM'],
    'delay': ['Lags'],
    'mean': ['CMA', 'SMA', 'EMA'],
    'candles': ['Green candles ratio', 'Red candles ratio'],
    'RSISection': ['RSI'],
    'MACDSection': ['MACD'],
    'BollingerSection': ['Bollinger'],
    'timeFeatures': ['month', 'week', 'day_of_month', 'day_of_week', 'hour', 'minute']
}

export const MlNodesColors: IMlNodeTip = {
    'Catboost': '#FF0000',
    'LightGBM': '#FF0000',
    'CandleSteps': 'F1AFB8',
    'Lags': '#6853BA',
    'CMA': '#AAB0FF',
    'SMA': '#AAB0FF',
    'EMA': '#AAB0FF',
    'Green candles ratio': '#536ABA',
    'Red candles ratio': '#536ABA',
    'RSI': '#B6F1CE',
    'MACD': '#FFE8AD',
    'Bollinger': '#F0952A',
    'month': '#869C2E',
    'week': '#869C2E',
    'day_of_month': '#869C2E',
    'day_of_week': '#869C2E',
    'hour': '#869C2E',
    'minute': '#869C2E'
}

export const IfNodesSectionNames: { [key: string]: string } = {
    'algo': 'Блок алгоритма',
    'if': 'Параметры условий'
}

export const IfNodeTitle: { [key: string]: string } = {
    'anomaly': 'Аномальное значение',
    'anomal_rsi': 'Аномалия RSI',
    'out_of_limits': 'Превышение порога',
    'average_cross': 'Пересечение средних',
    'macd_cross': 'Нулевой MACD',
    'algo_block': 'Блок алгоритма'
}

export const IfNodeTip: { [key: string]: string } = {
    'anomaly': `Значение параметра выходит за три сигмы. 1) condition: high - попадает в три правые сигмы, 2) low - попадает в три левые сигмы 
    2) param: value - объём в рублях, price_changing - изменение цены в долях`,
    'anomal_rsi': `Аномальное значение RSI. 1) period - по какому количеству последних свечей рассчитываем RSI
    2) value - какое значение RSI считаем аномально высоким`,
    'out_of_limits': `Выход параметра за установленный лимит. 1) condition: high - больше установленного лимита (>), low - меньше установленного лимита (<)
    2) limit: установленный пользователем лимит
    3) period: (для green_candles_ratio и red_candles_ratio) по какому количеству последних свечей считаем долю красных и зеленых свечей.`,
    'average_cross': `Пересечение скользящих средних. 1) average_type - тип скользящего среднего (обычное, экспоненциальное)
    2) feature_name - величина (признак), по которой строить скользящее среднее
    3) n_fast - По какому кол-ву последних N1 свечей строить быстрое скользящее среднее
    4) n_slow - По какому кол-ву последних N2 свечей строить медленное скользящее среднее (N2 > N1)`,
    'macd_cross': 'Расхождение скользящих средних. Рассчитывается на основе двух скользящих средних. Необходимо задать N1, N2 - параметры для расчета скользящих средних.',
    'algo_block': 'Блок алгоритма'
}

export const IfNodeSectionNodes: { [key: string]: string[] } = {
    'algo': ['algo_block'],
    'if': ['anomaly', 'anomal_rsi', 'out_of_limits', 'average_cross', 'macd_cross']
}

export const IfNodesColor: IIfNodeColor = {
    'anomaly': '#AAB0FF',
    'anomal_rsi': '#AAB0FF',
    'out_of_limits': '#AAB0FF',
    'average_cross': '#AAB0FF',
    'macd_cross': '#AAB0FF',
    'algo_block': '#FF0000'
}

export interface IIfNodeColor {
    'anomaly': string;
    'anomal_rsi': string;
    'out_of_limits': string;
    'average_cross': string;
    'macd_cross': string;
    'algo_block': string;
    [key: string]: string;
}

export interface IMlNodeSectionNames {
    [key: string]: string;
    models: string;
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
    delay: string[];
    mean: string[];
    candles: string[];
    RSISection: string[];
    MACDSection: string[];
    BollingerSection: string[];
    timeFeatures: string[];
}
