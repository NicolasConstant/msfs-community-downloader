import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDetailedComponent } from './package-detailed.component';

describe('PackageDetailedComponent', () => {
  let component: PackageDetailedComponent;
  let fixture: ComponentFixture<PackageDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
