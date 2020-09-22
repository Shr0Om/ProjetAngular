import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Image } from '../image.type';

@Component({
  selector: 'app-api',
  providers: [ApiService],
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  title = 'angular-httpclient';
  image: String[] = [];
  value = '';
  nbPage = 1;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getImages("hello");

  }
  newPage(tag: string){


    this.nbPage = this.nbPage + 1;
    this.api.getImage(tag, this.nbPage.toString())
    .subscribe(data => {
      this.image = data;
    });
  }
  
  getImages(tag: string) {
    this.nbPage = 0;
    this.newPage(tag);
  }

  onEnter(value: string) {
    this.getImages(value);
  }

}