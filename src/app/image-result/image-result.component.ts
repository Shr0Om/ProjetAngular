import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'image-result',
  templateUrl: './image-result.component.html',
  styleUrls: ['./image-result.component.less']
})
export class ImageResultComponent implements OnInit {
  @Input() src: String;
  title = 'Title';
  subTitle = 'Sub title';

  constructor() { }

  ngOnInit(): void {
  }

  clickHandler() {
    console.log('clicked');
  }

}
