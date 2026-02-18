export interface ExpProModel {
    id: number;
    name: string;
    company: string;
    poste: string;
    tags: string[];
    begin_date: string;
    end_date?: string;
    missions?: string[];
}
