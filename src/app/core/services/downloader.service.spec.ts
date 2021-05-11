import { TestBed } from '@angular/core/testing';

import { DownloaderService } from './downloader.service';

describe('DownloaderService', () => {
  let service: DownloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
