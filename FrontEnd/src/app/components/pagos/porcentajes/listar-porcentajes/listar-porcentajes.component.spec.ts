import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPorcentajesComponent } from './listar-porcentajes.component';

describe('ListarPorcentajesComponent', () => {
  let component: ListarPorcentajesComponent;
  let fixture: ComponentFixture<ListarPorcentajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPorcentajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPorcentajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
