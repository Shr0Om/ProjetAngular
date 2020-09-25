import { Photo } from '../image.type';

export interface SearchParams {
    tag: string;
    nbPage?: number;
    nbResult?: number;
    minDate?: string;
    maxDate?: string;
    isSafe?: boolean;
    isGallery?: boolean;
};

export enum Resolution {
    small = 's',
    medium = 'm',
    large = 'l'
};

export interface Photos {
    page: number;
    pages: number;
    perpage: number;
    photo: Photo[];
    total: string;
};

export interface SearchResponse {
    stat: string;
    photos?: Photos;
    code?: number;
    message?: string;
}