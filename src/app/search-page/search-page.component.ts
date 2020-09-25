import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { SearchParams } from '../api/api.service.type';
import { Photo } from '../image.type';

@Component({
  selector: 'app-search-page',
  providers: [ApiService],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less']
})
export class SearchPageComponent implements OnInit {
  title = 'Search Engine';
  seeMoreLabel = 'Voir plus d\'images';
  hasMore = false;
  currentPage = 1;
  images: Photo[] = [];
  keywords: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const tag = params['keywords'];
      this.keywords = new FormControl(tag);
      this.submitSearch({tag, nbPage: 0});
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.currentPage = 0;
    this.submitSearch({tag: this.keywords.value, nbPage: 0});
    return false;
  }

  submitSearch(params: SearchParams) {
      this.api.getImages(params).subscribe(images => {
        this.images = images;
        if (images.length === params.nbResult)
          this.hasMore = true;
      });
  }

  submitSeeMore() {
      this.currentPage++;
      this.api.getImages({tag: this.keywords.value, nbPage: this.currentPage}).subscribe(images => {
        if (images.length === 0)
          this.hasMore = false;
        else
          this.images = [...this.images, ...images];
      });
  }
}
