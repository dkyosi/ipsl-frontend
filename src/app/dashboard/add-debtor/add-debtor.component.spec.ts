import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDebtorComponent } from './add-debtor.component';

describe('AddDebtorComponent', () => {
  let component: AddDebtorComponent;
  let fixture: ComponentFixture<AddDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDebtorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
