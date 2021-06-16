import { Component, OnInit } from '@angular/core';

import { faTimes, faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-list-editor',
    templateUrl: './list-editor.component.html',
    styleUrls: ['../core/common.scss', './list-editor.component.scss']
})
export class ListEditorComponent implements OnInit {
    faTimes = faTimes;
    faBan = faBan;

    constructor() { }

    ngOnInit(): void {
    }

}
