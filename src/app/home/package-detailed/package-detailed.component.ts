import { Component, OnInit, Input } from '@angular/core';
import { Package } from '../../core/services/packages.service';

@Component({
    selector: 'app-package-detailed',
    templateUrl: './package-detailed.component.html',
    styleUrls: ['./package-detailed.component.scss']
})
export class PackageDetailedComponent implements OnInit {
    @Input() package: Package;

    constructor() { }

    ngOnInit(): void {
    }

}
