import { TestBed } from '@angular/core/testing';

import { ExtractorService } from './extractor.service';

describe('ExtractorService', () => {
  let service: ExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
