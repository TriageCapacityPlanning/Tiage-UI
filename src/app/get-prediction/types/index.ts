export interface PredictionResults {
    intervaledSlotPredictions: SlotPredictions[],
    numberIntervals: number,
    slotPredictions: SlotPredictions
}


export interface TriageClassCount  { slots: number, marginError: number }

export interface TriageClassCountsWrapper {
    [index: string]: TriageClassCount | number | Date;
}

export type SlotPredictions = {
    startDate: Date,
    endDate: Date,
    confidence: number,
    total: number
} & TriageClassCountsWrapper;
