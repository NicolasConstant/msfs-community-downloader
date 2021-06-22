import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEditorComponent } from './list-editor.component';

describe('ListEditorComponent', () => {
    let component: ListEditorComponent;
    let fixture: ComponentFixture<ListEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListEditorComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
