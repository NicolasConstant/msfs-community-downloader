import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPackageComponent } from './import-package.component';

describe('ImportPackageComponent', () => {
  let component: ImportPackageComponent;
  let fixture: ComponentFixture<ImportPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
