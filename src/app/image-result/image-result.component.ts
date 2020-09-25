import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { ImageDetailData, ImageDetailsComponent } from '../image-details/image-details.component';
import { Photo } from '../image.type';
import { convertImageUrl } from '../api/api.service';

@Component({
  selector: 'image-result',
  templateUrl: './image-result.component.html',
  styleUrls: ['./image-result.component.less']
})
export class ImageResultComponent implements OnInit {
  @Input() img: Photo;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openInfos() {
    this.dialog.open<ImageDetailsComponent, ImageDetailData>(ImageDetailsComponent, {
      data: { title: this.img.title, content: '' }
    });
  };

  getUrl() {
    return convertImageUrl({photo: this.img});
  }
}
