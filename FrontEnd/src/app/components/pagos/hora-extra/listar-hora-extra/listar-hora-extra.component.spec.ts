import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHoraExtraComponent } from './listar-hora-extra.component';

describe('ListarHoraExtraComponent', () => {
  let component: ListarHoraExtraComponent;
  let fixture: ComponentFixture<ListarHoraExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarHoraExtraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHoraExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
