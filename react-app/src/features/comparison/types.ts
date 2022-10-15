export interface IComparison {
    id: string;
    userId: string;
    name: string;
    description: string,
    created: Date
}

export interface IComparisonDetail extends IComparison {
    attributes: any[];
    entries: any[],
    shares: any[]
}