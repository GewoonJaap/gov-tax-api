export interface TaxRow {
    title: string;
    price: number;
}

export interface TaxYearData {
    [year: string]: TaxRow[];
}

export interface TaxResult {
    title: string;
    data: TaxYearData;
}

export interface TaxResponse {
    data: TaxResult[];
}