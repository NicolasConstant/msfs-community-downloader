import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-remote-package',
    templateUrl: './remote-package.component.html',
    styleUrls: ['./remote-package.component.scss']
})
export class RemotePackageComponent implements OnInit {
    expanded: boolean;

    constructor() { }

    ngOnInit(): void {
    }
    
    expand(): boolean {
        this.expanded = true;
        return false;
    }
}
