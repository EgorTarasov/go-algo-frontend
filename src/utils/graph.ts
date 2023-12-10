import { IChartData } from "../models/IChartData";

export function serialiseCandles(candels: number[][]): IChartData[] {
    const data = new Array(candels.length);
    for (let index = 0; index < candels.length; index++) {
        data[index] = {
            time: candels[index][0],
            value: candels[index][4],
            open: candels[index][1],
            high: candels[index][2],
            low: candels[index][3],
            close: candels[index][4],
        };
    }

    return data;
}
