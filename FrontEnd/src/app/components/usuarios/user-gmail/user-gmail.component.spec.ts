import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGmailComponent } from './user-gmail.component';

describe('UserGmailComponent', () => {
  let component: UserGmailComponent;
  let fixture: ComponentFixture<UserGmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
