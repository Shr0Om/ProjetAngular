import {catchError, map, retry} from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Image, Images } from '../image.type';

const localurl = "https://www.flickr.com/services/rest/"
const string = "https:\/\/live.staticflickr.com\/"

const converturl = ({server, id, secret, resolution = "c"}:Image & {resolution: string}) => {
    console.log(server)
    console.log(string.concat(server, "\/", id, "_", secret, "_", resolution, ".jpg" ))
    return string.concat(server, "\/", id, "_", secret, "_", resolution, ".jpg" )
}


@Injectable({providedIn: "root"})
export class ApiService {
    constructor(private http: HttpClient) { }
    getImage(tag: string) {
        return this.http.get(localurl , {
            params:{
                method: "flickr.photos.search",
                api_key: "250a292a0f8a61b7e329e576dd1505c7",
                tags: tag,
                format: "json",
                nojsoncallback: "1",
                auth_token: "72157716063046997-30330787026b1d31",
                api_sig: "f8e8062a1d9e29eedd0df5d4b23028f7"
            }
        }).pipe(map(({ photos }:{ photos: Images }) => photos.photo.map(converturl))
        );
        
    }

}

