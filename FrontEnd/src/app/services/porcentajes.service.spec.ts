import { TestBed } from '@angular/core/testing';

import { PorcentajesService } from './porcentajes.service';

describe('PorcentajesService', () => {
  let service: PorcentajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorcentajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
