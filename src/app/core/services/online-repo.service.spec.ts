import { TestBed } from '@angular/core/testing';

import { OnlineRepoService } from './online-repo.service';

describe('OnlineRepoService', () => {
    let service: OnlineRepoService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OnlineRepoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
