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
  nbResult= 25;
  minDate = "";
  maxDate = "";


  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getImages("hello");
  }
  newPage(tag: string){
    this.nbPage = this.nbPage + 1;
    this.api.getImage(tag, this.nbPage.toString(), this.nbResult.toString(), this.minDate, this.maxDate).subscribe(data => {
      this.image = data;
    });
  }

  previousPage(tag: string) {
    console.log(this.nbPage); //result 2 
    this.nbPage = this.nbPage - 1;
    this.newPage(tag);
    console.log(this.nbPage); //result 2 
  }
  
  getImages(tag: string) {
    this.nbPage = 0;
    this.newPage(tag);
  }

  onEnter(value: string) {
    this.getImages(value);
  }


  setNbResult(value: string, nbResult: number) {
    console.log(nbResult)
    this.nbResult = nbResult;
    this.newPage(value);
  }
  getNbResult() {
    return this.nbResult
  }

  
  searchWithFilter(minDate: Date, maxDate: Date,value : string){
    this.setDate(minDate.toString(), maxDate.toString());
    this.getImages(value);

  }

  setDate(minDate: string, maxDate: string){
    this.minDate = minDate;
    this.maxDate = maxDate;

  }
}