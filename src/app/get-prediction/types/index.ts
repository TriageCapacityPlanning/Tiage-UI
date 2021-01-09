export type PredictionResults = {
    intervaledSlotPredictions: SlotPredictions[],
    numberIntervals: number,
    slotPredictions: SlotPredictions
}

export type TriageClassCounts = {
    [index: string]: number | Date;
}

export type SlotPredictions = {
    startDate: Date,
    endDate: Date,
    confidence: number,
    standardDeviation: number,
    total: number
} & TriageClassCounts;