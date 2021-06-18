import { Component, OnInit, Input } from '@angular/core';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';

import { Package } from '../../core/services/packages.service';

@Component({
    selector: 'app-package-edition',
    templateUrl: './package-edition.component.html',
    styleUrls: ['./package-edition.component.scss']
})
export class PackageEditionComponent implements OnInit {
    faBan = faBan;
    faFolder = faFolder;

    isRemoved: boolean;
    displayCustomFolder: boolean;

    customFolder: string;

    @Input()
    packageInfo: Package;

    constructor() { }

    ngOnInit(): void {
    }

    toggleSetFolder(): boolean {
        this.displayCustomFolder = !this.displayCustomFolder;
        return false;
    }

    toggleRemove(): boolean {
        this.isRemoved = !this.isRemoved;
        return false;
    }

    findCustomFolder(): boolean {

        return false;
    }
}
