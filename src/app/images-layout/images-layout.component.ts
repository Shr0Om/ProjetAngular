import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../image.type';

@Component({
  selector: 'images-layout',
  templateUrl: './images-layout.component.html',
  styleUrls: ['./images-layout.component.less']
})
export class ImagesLayoutComponent implements OnInit {
  @Input() imgs: Photo[];

  constructor() { }

  ngOnInit(): void {
  }
}
