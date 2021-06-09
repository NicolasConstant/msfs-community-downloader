import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotePackageComponent } from './remote-package.component';

describe('RemotePackageComponent', () => {
    let component: RemotePackageComponent;
    let fixture: ComponentFixture<RemotePackageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RemotePackageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RemotePackageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
