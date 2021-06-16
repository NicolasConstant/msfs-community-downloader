import { Component, OnInit } from '@angular/core';
import { faTimes, faBan } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';

import { DomainService } from '../core/services/domain.service';
import { Package } from '../core/services/packages.service';

@Component({
    selector: 'app-list-editor',
    templateUrl: './list-editor.component.html',
    styleUrls: ['../core/common.scss', './list-editor.component.scss']
})
export class ListEditorComponent implements OnInit {
    faTimes = faTimes;
    faBan = faBan;
    faFolder = faFolder;

    packages: Package[];

    constructor(
        private domainService: DomainService
    ) { }

    ngOnInit(): void {
        this.packages = this.domainService.getPackages();
    }

}
