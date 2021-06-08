import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageMiniComponent } from './package-mini.component';

describe('PackageMiniComponent', () => {
    let component: PackageMiniComponent;
    let fixture: ComponentFixture<PackageMiniComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PackageMiniComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PackageMiniComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
