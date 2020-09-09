import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable ';


@Injectable()
export class httpService{
    constructor(private htpp: HttpClient) { }


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
