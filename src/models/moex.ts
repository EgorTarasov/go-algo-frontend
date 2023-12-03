export interface IssIndexResponse {
    charsetinfo?: Charsetinfo;
    engines?: Engine[];
    markets?: Market[];
    boards?: Board[];
    boardgroups?: Boardgroup[];
    durations?: Duration[];
    securitytypes?: Securitytype[];
    securitygroups?: Securitygroup[];
    securitycollections?: Securitycollection[];
}

export interface Securitycollection {
    id: number;
    name: string;
    title: string;
    security_group_id: number;
}

export interface Securitygroup {
    id: number;
    name: string;
    title: string;
    is_hidden: number;
}

export interface Securitytype {
    id: number;
    trade_engine_id: number;
    trade_engine_name: string;
    trade_engine_title: string;
    security_type_name: string;
    security_type_title: string;
    security_group_name: string;
    stock_type?: string;
}

export interface Duration {
    interval: number;
    duration: number;
    days?: any;
    title: string;
    hint: string;
}

export interface Boardgroup {
    id: number;
    trade_engine_id: number;
    trade_engine_name: string;
    trade_engine_title: string;
    market_id: number;
    market_name: string;
    name: string;
    title: string;
    is_default: number;
    board_group_id: number;
    is_traded: number;
    is_order_driven?: number;
    category: string;
}

export interface Board {
    id: number;
    board_group_id: number;
    engine_id: number;
    market_id: number;
    boardid: string;
    board_title: string;
    is_traded: number;
    has_candles: number;
    is_primary: number;
}

export interface Market {
    id: number;
    trade_engine_id: number;
    trade_engine_name: string;
    trade_engine_title: string;
    market_name: string;
    market_title: string;
    market_id: number;
    marketplace?: string;
    is_otc: number;
    has_history_files: number;
    has_history_trades_files: number;
    has_trades: number;
    has_history: number;
    has_candles: number;
    has_orderbook: number;
    has_tradingsession: number;
    has_extra_yields: number;
    has_delay: number;
}

export interface Engine {
    id: number;
    name: string;
    title: string;
}

export interface Charsetinfo {
    name: string;
}
