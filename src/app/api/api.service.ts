import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoDetails } from '../image.type';
import { SearchParams, Resolution, SearchResponse } from './api.service.type';
const localUrl = "https://www.flickr.com/services/rest/";
const liveUrl = "https:\/\/live.staticflickr.com\/";
const photoSearchMethod = 'flickr.photos.search';
const photoGetInfoMethod = 'flickr.photos.getInfo';

export interface UrlParams {
    photo: {
        server: string;
        id: string;
        secret: string;
    };
    resolution?: Resolution;
};

export const convertImageUrl = ({photo: {server, id, secret}, resolution = Resolution.medium}: UrlParams) =>
    `${liveUrl}${server}\/${id}_${secret}_${resolution}.jpg`;

@Injectable({
    providedIn: "root"
})
export class ApiService {
    constructor(private http: HttpClient) { }

    private apiKey = '5547db88b5bfc7ba2b56b8a2395caadd';

    getImages({
        tag,
        nbPage = 1,
        nbResult = 25,
        minDate = '',
        maxDate = '',
        isSafe = true,
        isGallery = false
    }: SearchParams) {
        return this.http.get<SearchResponse>(localUrl, {
            params:{
                method: photoSearchMethod,
                api_key: this.apiKey,
                tags: tag,
                min_upload_date: minDate,
                max_upload_date: maxDate,
                safe_search: isSafe.toString(),
                is_gallery: isGallery.toString(),
                sort: "",
                per_page: nbResult.toString(),
                page: nbPage.toString(),
                format: "json",
                nojsoncallback: "1"
                //auth_token: "72157716070477538-a196b321564c5914",
                //api_sig: "8ffeffe4d4e1058c18bdd064a0fe9096"
            }
        }).pipe(map(data => data.photos?.photo));
    }

    getImageDetails(id: number) {
        return this.http.get<{photo: PhotoDetails}>(localUrl, {
            params: {
                method: photoGetInfoMethod,
                api_key: this.apiKey,
                photo_id: id.toString()
            }
        }).pipe(map(data => data.photo));
    }
}
