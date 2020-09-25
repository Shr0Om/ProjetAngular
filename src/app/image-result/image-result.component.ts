import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { ImageDetailData, ImageDetailsComponent } from '../image-details/image-details.component';

@Component({
  selector: 'image-result',
  templateUrl: './image-result.component.html',
  styleUrls: ['./image-result.component.less']
})
export class ImageResultComponent implements OnInit {
  @Input() src: String;
  title = 'Title';
  subTitle = 'Sub title';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openInfos() {
    this.dialog.open<ImageDetailsComponent, ImageDetailData>(ImageDetailsComponent, {
      data: { title: this.title, content: this.subTitle }
    });
  };
}
