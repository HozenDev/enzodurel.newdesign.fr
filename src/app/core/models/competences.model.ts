export interface SkillModel {
    technicals: TechnicalModel[];
    languages: LanguageModel[];
    about: string;
}

export interface TechnicalModel {
    name: string;
    type: string;
    lvl: number;
    icon: string;
}

export interface LanguageModel {
    name: string;
    lvl?: string;
    score?: number;
    certifications?: Certification[];
    icon: string;
}

export interface Certification {
    name: string;
    score: number;
}
