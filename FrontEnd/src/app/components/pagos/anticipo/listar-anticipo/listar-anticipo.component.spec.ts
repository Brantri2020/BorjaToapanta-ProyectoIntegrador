import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAnticipoComponent } from './listar-anticipo.component';

describe('ListarAnticipoComponent', () => {
  let component: ListarAnticipoComponent;
  let fixture: ComponentFixture<ListarAnticipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAnticipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAnticipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
