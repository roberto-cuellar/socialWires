import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllMessagesComponent } from './see-all-messages.component';

describe('SeeAllMessagesComponent', () => {
  let component: SeeAllMessagesComponent;
  let fixture: ComponentFixture<SeeAllMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAllMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
