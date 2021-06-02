import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackageComponent } from './add-package.component';

describe('AddPackageComponent', () => {
  let component: AddPackageComponent;
  let fixture: ComponentFixture<AddPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
