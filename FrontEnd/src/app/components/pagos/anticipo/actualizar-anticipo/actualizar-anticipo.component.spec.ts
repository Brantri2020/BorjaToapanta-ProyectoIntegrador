import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAnticipoComponent } from './actualizar-anticipo.component';

describe('ActualizarAnticipoComponent', () => {
  let component: ActualizarAnticipoComponent;
  let fixture: ComponentFixture<ActualizarAnticipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarAnticipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarAnticipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
