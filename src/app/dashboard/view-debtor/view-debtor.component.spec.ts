import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDebtorComponent } from './view-debtor.component';

describe('ViewDebtorComponent', () => {
  let component: ViewDebtorComponent;
  let fixture: ComponentFixture<ViewDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDebtorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
