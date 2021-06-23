import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageEditionComponent } from './package-edition.component';

describe('PackageEditionComponent', () => {
    let component: PackageEditionComponent;
    let fixture: ComponentFixture<PackageEditionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PackageEditionComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PackageEditionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
