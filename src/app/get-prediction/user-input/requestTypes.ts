export type PredictionRequestBody = {
    'clinic-id': number,
    'intervals': string,
    'confidence': string,
    'num-sim-runs': string,
}

export interface TriageClassOptions {
    [index: string]: string;
}
