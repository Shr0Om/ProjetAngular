import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ImageDetailData {
  title: String;
  content: any;
}

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.less']
})
export class ImageDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ImageDetailData) { }

  ngOnInit(): void {
  }
}
