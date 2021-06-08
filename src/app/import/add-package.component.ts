import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-add-package',
    templateUrl: './add-package.component.html',
    styleUrls: ['../core/common.scss', './add-package.component.scss']
})
export class AddPackageComponent implements OnInit {
    faTimes = faTimes;

    constructor() { }

    ngOnInit(): void {
    }

}
