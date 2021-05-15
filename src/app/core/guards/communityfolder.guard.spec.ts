import { TestBed } from '@angular/core/testing';

import { CommunityfolderGuard } from './communityfolder.guard';

describe('CommunityfolderGuard', () => {
  let guard: CommunityfolderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CommunityfolderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
