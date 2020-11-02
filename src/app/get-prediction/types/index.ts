export type PredictionResults = {
    totalPatients: number;
    expectedPatientsPerTriageClass: TriageClassCounts;
    slotsPerTriageClass: TriageClassCounts;
    totalSlots: number;
    patientsSeenPercentage: TriageClassCounts;
}

export type TriageClassCounts = {
    urgent: number;
    ['semi-urgent']?: number;
    standard?: number;
}