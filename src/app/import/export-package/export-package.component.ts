import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-export-package',
    templateUrl: './export-package.component.html',
    styleUrls: ['./export-package.component.scss']
})
export class ExportPackageComponent implements OnInit {
    faTimes = faTimes;
    
    constructor() { }

    ngOnInit(): void {
    }

    saveFile(): boolean {
        return false;
    }

}
