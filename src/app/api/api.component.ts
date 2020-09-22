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



  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getImages("chien");
  }

  
  getImages(tag: string) {
    this.api.getImage(tag)
      .subscribe(data => {
        this.image = data;
      });
  }



  onEnter(value: string) {
    this.getImages(value);
  }

}