import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable ';


@Injectable()
export class httpService{
    constructor(private htpp: HttpClient) { }

    getListOfPhoto():
        return this.http.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5547db88b5bfc7ba2b56b8a2395caadd&tags=chien&format=json&nojsoncallback=1');

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

}
