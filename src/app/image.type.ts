export interface Photo {
    id: string;
    owner: string;
    secret: string;
    server: string;
    title: string;
    famr: number;
};

interface PhotoOwner {
    nsid: string;
    username: string;
};

export interface PhotoDetails {
    id: string;
    secret: string;
    server: string;
    farm: number;
    dateuploaded: string; // Timestamp
    owner: PhotoOwner ;
    title: {_content: string};
    description: {_content: string};
    dates: {
        posted: string; // Timestamp
        taken: string;  // YYYY-MM-dd hh:mm:ss
        lastupdate: string; // Timestamp
    }
    views: string;
};