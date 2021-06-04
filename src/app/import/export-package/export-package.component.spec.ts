import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPackageComponent } from './export-package.component';

describe('ExportPackageComponent', () => {
  let component: ExportPackageComponent;
  let fixture: ComponentFixture<ExportPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
