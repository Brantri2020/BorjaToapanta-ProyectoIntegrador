import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSalarioComponent } from './listar-salario.component';

describe('ListarSalarioComponent', () => {
  let component: ListarSalarioComponent;
  let fixture: ComponentFixture<ListarSalarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSalarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSalarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
