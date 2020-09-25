import { TestBed } from '@angular/core/testing';
import { ApiService } from "./api.service";

describe('Api service', () => {
    let service: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ApiService);
    });

    it('getImages', async () => {
        service.getImages({tag: 'evian'}).subscribe(result => {
            expect(result).not.toBeUndefined();
            console.log(result);
        })
    });

    it('getImageUrls', () => {
        service.getImageUrls({tag: 'evian'}).subscribe(result => {
            expect(result).not.toBeUndefined();
            console.log(result);
        })
    });

    it('getImageDetails', () => {
        service.getImageDetails(50382077582).subscribe(result => {
            expect(result).not.toBeUndefined();
            console.log(result);
        })
    });
});