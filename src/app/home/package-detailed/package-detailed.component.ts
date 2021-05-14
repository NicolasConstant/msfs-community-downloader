import { Component, OnInit, Input } from '@angular/core';
import { Package, InstallStatusEnum } from '../../core/services/packages.service';
import { DomainService } from '../../core/services/domain.service';

@Component({
    selector: 'app-package-detailed',
    templateUrl: './package-detailed.component.html',
    styleUrls: ['./package-detailed.component.scss']
})
export class PackageDetailedComponent implements OnInit {
    @Input() package: Package;

    constructor(
        private domainService: DomainService
    ) { }

    ngOnInit(): void {
    }

    install():boolean {
        this.domainService.install(this.package);
        return false;
    }

    remove():boolean {
        this.domainService.remove(this.package);
        return false;
    }

    update():boolean {
        this.domainService.update(this.package);
        return false;
    }

    getWorkingInfo(p: Package): string {        
        if(p.state === InstallStatusEnum.downloading){
            return `${p.downloaded} MB`;
        }
        if(p.state === InstallStatusEnum.extracting){
            return "Extracting...";
        }
        if(p.state === InstallStatusEnum.installing){
            return "Installing...";
        }
    }
}
