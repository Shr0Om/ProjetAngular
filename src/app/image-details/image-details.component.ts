import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService, convertImageUrl } from '../api/api.service';
import { Resolution } from '../api/api.service.type';
import { Photo, PhotoDetails } from '../image.type';

export interface ImageDetailData {
  title: String;
  id: String;
}

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.less'],
  providers: [ApiService]
})
export class ImageDetailsComponent implements OnInit {

  photo: any = {
    title: {},
    owner: {},
    description: {}
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ImageDetailData,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getImageDetails(this.data.id).subscribe(photo =>
      this.photo = ({
        ...photo,
        dateuploaded: (new Date(Number(photo.dateuploaded) * 1000).toLocaleDateString('fr-FR'))
      }));
  }

  getUrl() {
    return this.photo['server']
      ? convertImageUrl({photo: this.photo, resolution: Resolution.large})
      : '';
  }
}
