import { TestBed } from '@angular/core/testing';

import { AnticipoService } from './anticipo.service';

describe('AnticipoService', () => {
  let service: AnticipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnticipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
