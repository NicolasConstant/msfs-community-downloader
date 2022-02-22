import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { OnlineRepoService, OnlinePackageInfo } from '../core/services/online-repo.service';

@Component({
    selector: 'app-add-package',
    templateUrl: './add-package.component.html',
    styleUrls: ['../core/common.scss', './add-package.component.scss']
})
export class AddPackageComponent implements OnInit {
    faTimes = faTimes;
    
    list: OnlinePackageInfo[] = [];

    constructor(
        private onlineRepoService: OnlineRepoService
    ) { }

    ngOnInit(): void {
        this.list = [];
        this.onlineRepoService.retrievePackageList()
            .then((list: OnlinePackageInfo[]) => {
                console.log(list);
                this.list = list.sort((a, b) => a.name.localeCompare(b.name));
            })
            .catch(err => {
                console.error(err);
            });
    }

}
