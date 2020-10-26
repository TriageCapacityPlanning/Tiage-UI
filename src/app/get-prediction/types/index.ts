export type PredictionResults = {
    totalPatientsPerWeek: number;
    numberSlotsNeeded:number;
    patientsNeededByType: PatientsNeededByType;
}

export type PatientsNeededByType = {
    urgent: number;
    ['semi-urgent']?: number;
    standard?: number;
}