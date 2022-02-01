import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnticipoComponent } from './crear-anticipo.component';

describe('CrearAnticipoComponent', () => {
  let component: CrearAnticipoComponent;
  let fixture: ComponentFixture<CrearAnticipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAnticipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAnticipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
