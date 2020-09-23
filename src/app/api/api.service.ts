import {catchError, map, retry} from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Image, Images } from '../image.type';


const localurl = "https://www.flickr.com/services/rest/"
const string = "https:\/\/live.staticflickr.com\/"

const converturl = ({server, id, secret, resolution = "c"}:Image & {resolution: string}) => {
//    console.log(server)
//    console.log(string.concat(server, "\/", id, "_", secret, "_", resolution, ".jpg" ))
    return string.concat(server, "\/", id, "_", secret, "_", resolution, ".jpg" )
}


@Injectable({providedIn: "root"})
export class ApiService {
    constructor(private http: HttpClient) { }
    getImage(tag: string, nbPage: string, nbResult: string) {
        return this.http.get(localurl , {
            params:{
                method: "flickr.photos.search",
                api_key: "47b6c8cb3b6052624c0f7dc5beeda6d6",
                tags: tag,
                sort: "",
                per_page: nbResult,
                page: nbPage,
                format: "json",
                nojsoncallback: "1",
                //auth_token: "72157716070477538-a196b321564c5914",
                //api_sig: "8ffeffe4d4e1058c18bdd064a0fe9096"
            }
        }).pipe(map(({ photos }:{ photos: Images }) => photos.photo.map(converturl))
        );
        
    }

}

