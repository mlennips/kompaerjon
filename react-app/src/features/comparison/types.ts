export interface IComparison {
    id: string;
    userId: string;
    name: string;
    description: string,
    created: Date
}

export interface IComparisonDetail extends IComparison {
    attributes: any[];
    entries: IComparisonEntry[],
    shares: any[]
}

export interface IComparisonAnalysis {
    id: string;
}

export interface IComparisonEntry {
    id: string;
    createx: Date;
    updated: Date;
    name: string;
    url: string;
    price: number;
    ratingPoints: number;
    comment: string;
}