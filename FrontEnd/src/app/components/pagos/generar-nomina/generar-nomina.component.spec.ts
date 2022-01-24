import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarNominaComponent } from './generar-nomina.component';

describe('GenerarNominaComponent', () => {
  let component: GenerarNominaComponent;
  let fixture: ComponentFixture<GenerarNominaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarNominaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
