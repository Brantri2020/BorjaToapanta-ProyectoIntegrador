import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHoraExtraComponent } from './crear-hora-extra.component';

describe('CrearHoraExtraComponent', () => {
  let component: CrearHoraExtraComponent;
  let fixture: ComponentFixture<CrearHoraExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearHoraExtraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHoraExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
