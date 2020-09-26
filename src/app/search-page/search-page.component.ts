import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { SearchParams } from '../api/api.service.type';
import { Photo } from '../image.type';

const formatDate = (date: Date): string => new Intl.DateTimeFormat().format(date);

@Component({
  selector: 'app-search-page',
  providers: [ApiService],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less']
})
export class SearchPageComponent implements OnInit {
  title = 'Search Engine';
  seeMoreLabel = 'Voir plus d\'images';
  color = 'primary';
  today = new Date();

  private nbPerPage: number = 25;
  private currentPage: number = 1;

  hasMore = false;
  noSearch = true;
  images: Photo[] = [];
  fields: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const {tag, isSafe, isGallery, minDate, maxDate} = params;
      this.fields = this.fb.group({
          keywords: [tag],
          isSafe: [isSafe || true],
          isGallery: [isGallery || false],
          minDate: [minDate || ''],
          maxDate: [maxDate || this.today]
      });
      this.submitSearch();
    });
  }

  getMinDate() {
    return this.fields.controls['minDate'];
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.submitSearch();
    return false;
  }

  private getParams() {
    const {
      keywords: {value: tag},
      isSafe: {value: isSafe},
      isGallery: {value: isGallery}
    } = this.fields.controls;
    return {
      tag,
      isSafe,
      isGallery
    };
  }

  getImages() {
    const {
      minDate: {value: minDate},
      maxDate: {value: maxDate}
    } = this.fields.controls;
    return this.api.getImages({
      ...this.getParams(),
      minDate: formatDate(minDate),
      maxDate: formatDate(maxDate),
      nbResult: this.nbPerPage,
      nbPage: this.currentPage
    });
  }

  submitSearch() {
    this.currentPage = 1;
    const params = this.getParams();
    this.noSearch = !params.tag;
    if (!params.tag)
      return

    history.pushState({}, '', '?'.concat(Object.keys(params).map(
      key => `${key}=${params[key]}`
    ).join('&')));

    this.getImages().subscribe(images => {
      this.images = images;
      this.hasMore = images.length === this.nbPerPage;
    });
  }

  submitSeeMore() {
    this.currentPage++;
    this.getImages().subscribe(images => {
      this.hasMore = images.length === this.nbPerPage
      this.images = [...this.images, ...images];
    });
  }
}
