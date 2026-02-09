export interface TimelineEvent {
    date: string;
    title: string;
    description?: string;
    importance?: number; // influence the height
}
