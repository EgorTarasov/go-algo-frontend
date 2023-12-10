export interface IIfNode {
    feature: string;
    condition?: string;
    param: IIFNodeParam | string;
}

export interface IIFNodeParam { //py key param
    period?: string | number | null;
    value?: number;
    feature_name?: string;
    limit?: number;
    n_fast?: number;
    n_slow?: number;
    average_type? : string;
}

export interface IIfNodeData {
    title: string;
    params: IIfNode;
}