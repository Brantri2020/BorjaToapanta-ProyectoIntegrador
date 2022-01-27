import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSalarioComponent } from './crear-salario.component';

describe('CrearSalarioComponent', () => {
  let component: CrearSalarioComponent;
  let fixture: ComponentFixture<CrearSalarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSalarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSalarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
