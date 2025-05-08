export interface UniversitySection {
    id: number;
    section: string;
    content: string;
}

export interface University {
    id: number;
    name: string;
    introduction?: string;
    news?: string;
    description?: string;
    programmes?: string;
    majors?: string;
    admission?: string;
    [key: string]: any;
}