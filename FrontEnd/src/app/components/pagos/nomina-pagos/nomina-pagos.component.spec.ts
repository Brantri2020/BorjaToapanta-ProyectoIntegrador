import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominaPagosComponent } from './nomina-pagos.component';

describe('NominaPagosComponent', () => {
  let component: NominaPagosComponent;
  let fixture: ComponentFixture<NominaPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominaPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
