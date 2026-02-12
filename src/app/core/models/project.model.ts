export interface ProjectTheme {
    background: string;
    text: string;
    backgroundAlt: string;
}

export interface ProjectImage {
    id: number;
    src: string;
    alt: string;
    depth: number;

    position?: {
	x: number;
	y: number;
	scale?: number;
	rotation?: number;
    }
}

export interface ProjectModel {
    id: number;
    title: string;
    authors: string[];
    date: string;
    tags: string[];
    links: {
	label: string;
	url: string;
    }[];
    description: string;
    images: ProjectImage[];
    theme?: ProjectTheme;
}
