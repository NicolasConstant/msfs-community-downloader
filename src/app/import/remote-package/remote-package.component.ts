import { Component, OnInit, Input } from '@angular/core';
import { faArrowDown, faCheck } from '@fortawesome/free-solid-svg-icons';

import { OnlinePackageInfo, OnlineRepoService, ExportablePackage } from '../../core/services/online-repo.service';
import { SettingsService } from '../../core/services/settings.service';

@Component({
    selector: 'app-remote-package',
    templateUrl: './remote-package.component.html',
    styleUrls: ['./remote-package.component.scss']
})
export class RemotePackageComponent implements OnInit {
    faArrowDown = faArrowDown;
    faCheck = faCheck;

    expanded: boolean;
    exportablePackage: ExportablePackage;

    status: RemotePackageStatusEnum;

    @Input() remotePackageInfo: OnlinePackageInfo;

    constructor(
        private onlineRepoService: OnlineRepoService,
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        const onlinePackages = this.settingsService.getSettings().onlinePackages;
        const onlinePackage = onlinePackages.find(x => x.id === this.remotePackageInfo.id);
        if(onlinePackage){
            if(onlinePackage.onlineVersion === this.remotePackageInfo.version){
                this.status = RemotePackageStatusEnum.installed;
            } else {
                this.status = RemotePackageStatusEnum.notUpToDate;
            }
        } else {
            this.status = RemotePackageStatusEnum.notFound;
        }
    }
    
    expand(): boolean {
        this.expanded = true;
        this.onlineRepoService.retrievePackage(this.remotePackageInfo.id)
            .then((p: ExportablePackage) => {
                console.log(this.status);
                this.exportablePackage = p;
            })
            .catch(err => {
                console.error(err);
            });
        return false;
    }

    process(): boolean {
        
        return false;
    }
}

enum RemotePackageStatusEnum {
    unknown = 0,
    notFound = 1,
    installed = 2,
    notUpToDate = 3
}
