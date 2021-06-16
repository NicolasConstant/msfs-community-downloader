import { Component, OnInit, Input } from '@angular/core';

import { Package } from '../../core/services/packages.service';

@Component({
    selector: 'app-package-edition',
    templateUrl: './package-edition.component.html',
    styleUrls: ['./package-edition.component.scss']
})
export class PackageEditionComponent implements OnInit {

    @Input()
    packageInfo: Package;

    constructor() { }

    ngOnInit(): void {
    }

}
