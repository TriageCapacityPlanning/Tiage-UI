export type PredictionRequestBody = {
    'start-date': string,
    'end-date': string,
    'confidence': string,
    'num-sim-runs': string,
} & TriageClassOptions

export type TriageClassOptions = {
    [index: string]: string;
}