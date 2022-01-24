import { TestBed } from '@angular/core/testing';

import { NominaPagoService } from './nomina-pago.service';

describe('NominaPagoService', () => {
  let service: NominaPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominaPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
