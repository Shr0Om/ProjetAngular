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
  noSearch = true;
  currentPage = 1;
  nbPerPage = 25;
  images: Photo[] = [];
  keywords: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const tag = params['tag'];
      this.keywords = new FormControl(tag);
      this.submitSearch({...params, tag});
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.currentPage = 1;
    this.submitSearch({
      tag: this.keywords.value,
      nbPage: 1,
      nbResult: this.nbPerPage
    });
    return false;
  }

  submitSearch(params: SearchParams) {
    this.noSearch = !this.keywords.value;
    if (!this.keywords.value)
      return

    history.pushState({}, '', '?'.concat(Object.keys(params).map(
      key => `${key}=${params[key]}`
    ).join('&')));

    this.api.getImages(params).subscribe(images => {
      this.images = images;
        this.hasMore = images.length === params.nbResult;
    });
  }

  submitSeeMore() {
    this.currentPage++;
    this.api.getImages({
      tag: this.keywords.value,
      nbPage: this.currentPage,
      nbResult: this.nbPerPage
    }).subscribe(images => {
      this.hasMore = images.length === this.nbPerPage
      this.images = [...this.images, ...images];
    });
  }
}
