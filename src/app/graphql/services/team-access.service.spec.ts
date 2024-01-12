import { TestBed } from '@angular/core/testing';

import { TeamAccessService } from './team-access.service';

describe('TeamAccessService', () => {
  let service: TeamAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
