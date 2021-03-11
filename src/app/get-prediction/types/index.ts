export interface PredictionResults {
    predictions: TriageClassPredictions,
    _url: string
}

export interface IntervalPrediction {
    slots: number;
    start_date: string;
    end_date: string;
}

export type TriageClassPredictions = {
    [index: string]: IntervalPrediction[]
}
