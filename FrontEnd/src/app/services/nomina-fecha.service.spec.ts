import { TestBed } from '@angular/core/testing';

import { NominaFechaService } from './nomina-fecha.service';

describe('NominaFechaService', () => {
  let service: NominaFechaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominaFechaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
