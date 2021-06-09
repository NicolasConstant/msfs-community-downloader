import { Component, OnInit, Input } from '@angular/core';
import { OnlinePackageInfo, OnlineRepoService, ExportablePackage } from '../../core/services/online-repo.service';

@Component({
    selector: 'app-remote-package',
    templateUrl: './remote-package.component.html',
    styleUrls: ['./remote-package.component.scss']
})
export class RemotePackageComponent implements OnInit {
    expanded: boolean;
    exportablePackage: ExportablePackage;

    @Input() remotePackageInfo: OnlinePackageInfo;

    constructor(
        private onlineRepoService: OnlineRepoService
    ) { }

    ngOnInit(): void {
    }
    
    expand(): boolean {
        this.expanded = true;
        this.onlineRepoService.retrievePackage(this.remotePackageInfo.name)
            .then((p: ExportablePackage) => {
                this.exportablePackage = p;
            })
            .catch(err => {
                console.error(err);
            });
        return false;
    }
}
