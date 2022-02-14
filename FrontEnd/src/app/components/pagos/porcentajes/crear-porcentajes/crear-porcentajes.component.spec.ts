import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPorcentajesComponent } from './crear-porcentajes.component';

describe('CrearPorcentajesComponent', () => {
  let component: CrearPorcentajesComponent;
  let fixture: ComponentFixture<CrearPorcentajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPorcentajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPorcentajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
