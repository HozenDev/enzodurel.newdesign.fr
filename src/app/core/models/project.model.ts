export interface Image {
    src: string;
    alt: string;
}

export interface Project {
    id: number;
    title: string;
    authors: string;
    description: string;
    date: string;
    tags: Array<string>;
    link: string;
    img: Image;
}
