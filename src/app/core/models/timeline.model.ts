export interface TimelineEvent {
    percent: number;
    title: string;
    
    date?: string;
    description?: string;
    icon?: number; // influence the height

    // Computed fields
    x?: number;
    y?: number;
}
