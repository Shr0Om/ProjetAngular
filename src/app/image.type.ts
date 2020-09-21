export interface Image {
    id: string;
    owner: string;
    secret: string;
    server: string;
    title: string;
    farm: string;
    ispublic: string;
    isfriend: string;
    isfamily: string;
}

export interface Images {
    page: number;
    pages: number;
    perpage: number;
    photo: Image[];
    total: string;
}
