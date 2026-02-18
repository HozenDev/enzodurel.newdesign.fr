export interface TimelineEvent {
    percent: number;
    title: string;
    
    date?: string;
    description?: string;
    cours?: string[];
    lieu?: string;
    links?: {
	alt: string,
	src: string
    }[];
    
    // computed fields
    x?: number; 
    y?: number;
}
