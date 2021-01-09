export type PredictionResults = {
    intervaledSlotPredictions: SlotPredictions[],
    numberIntervals: number,
    slotPredictions: SlotPredictions
}


export type TriageClassCount  = { slots: number, stdDev: number }

export type TriageClassCountsWrapper = {
    [index: string]: TriageClassCount | number | Date;
}

export type SlotPredictions = {
    startDate: Date,
    endDate: Date,
    confidence: number,
    total: number
} & TriageClassCountsWrapper;