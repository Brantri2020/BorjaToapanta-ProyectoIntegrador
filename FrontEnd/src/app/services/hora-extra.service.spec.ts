import { TestBed } from '@angular/core/testing';

import { HoraExtraService } from './hora-extra.service';

describe('HoraExtraService', () => {
  let service: HoraExtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoraExtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
