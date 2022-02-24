import { Component, OnInit, Input } from '@angular/core';
import * as semver from 'semver';
import { faArrowDown, faCheck, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { OnlinePackageInfo, OnlineRepoService, ExportablePackage } from '../../core/services/online-repo.service';
import { SettingsService } from '../../core/services/settings.service';
import { Package, ReleaseTypeEnum } from '../../core/services/packages.service';
import { DomainService } from '../../core/services/domain.service';

@Component({
    selector: 'app-remote-package',
    templateUrl: './remote-package.component.html',
    styleUrls: ['./remote-package.component.scss']
})
export class RemotePackageComponent implements OnInit {
    faArrowDown = faArrowDown;
    faCheck = faCheck;
    faChevronUp = faChevronUp;

    expanded: boolean;
    exportablePackage: ExportablePackage;

    status: RemotePackageStatusEnum;
    incompatibleMessage: string;

    @Input() remotePackageInfo: OnlinePackageInfo;

    constructor(
        private domainService: DomainService,
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
                
                this.validatePackageCompatibility(this.exportablePackage);
            })
            .catch(err => {
                console.error(err);
            });
        return false;
    }
    
    private validatePackageCompatibility(p: ExportablePackage){
        const softwareVersion = this.settingsService.getVersion();
        if(semver.ltr(softwareVersion,  p.minSoftwareVersion)){
            this.status = RemotePackageStatusEnum.incompatible;
            this.incompatibleMessage = `Software too old, you need v${p.minSoftwareVersion} or higher`;
            return;
        }

        const packages = this.domainService.getPackages();
        const sameIdPackage = packages.find(x => x.id === p.id && x.isCustomPackage);
        if(sameIdPackage){
            this.status = RemotePackageStatusEnum.incompatible;
            this.incompatibleMessage = `Conflict: Package ${sameIdPackage.name} has same ID`;
            return;
        }

        const sameFolderPackage = packages.find(x => x.folderName === p.folderName && x.isCustomPackage);
        if(sameFolderPackage){
            this.status = RemotePackageStatusEnum.incompatible;
            this.incompatibleMessage = `Conflict: Package ${sameFolderPackage.name} has same Folder`;
            return;
        }
    }

    reduce(): boolean {
        this.expanded = false;
        return false;
    }

    process(): boolean {
        if(!this.exportablePackage || this.status === RemotePackageStatusEnum.incompatible) return false;

        const p = new Package();
        p.id = this.exportablePackage.id;
        p.name = this.exportablePackage.name;
        p.description = this.exportablePackage.description;
        p.summary = this.exportablePackage.summary;
        p.githubOwner = this.exportablePackage.githubOwner;
        p.githubRepo = this.exportablePackage.githubRepo;
        p.assetName = this.exportablePackage.assetName;
        p.isPrerelease = this.exportablePackage.isPrerelease;
        p.folderName = this.exportablePackage.folderName;
        p.illustration = this.exportablePackage.illustration;
        p.webpageUrl = this.exportablePackage.webpageUrl;
        p.versionPatternToRemove = this.exportablePackage.versionPatternToRemove;

        p.releaseType = this.exportablePackage.releaseType;
        p.releaseBranchTag = this.exportablePackage.releaseBranchTag;
        p.branchName = this.exportablePackage.branchName;

        p.onlineVersion = this.remotePackageInfo.version;
        p.isOnlinePackage = true;

        if(!p.releaseType){
            p.releaseType = ReleaseTypeEnum.release;
        }

        if(this.status === RemotePackageStatusEnum.notFound || this.status === RemotePackageStatusEnum.unknown){
            this.domainService.addOnlinePackage(p);
            this.status = RemotePackageStatusEnum.installed;
        } else if(this.status === RemotePackageStatusEnum.notUpToDate){
            this.domainService.updateOnlinePackage(p);
            this.status = RemotePackageStatusEnum.installed;
        } else if(this.status === RemotePackageStatusEnum.installed){
            this.domainService.removeOnlinePackage(p);
            this.status = RemotePackageStatusEnum.notFound;
        }

        return false;
    }
}

enum RemotePackageStatusEnum {
    unknown = 0,
    notFound = 1,
    installed = 2,
    notUpToDate = 3,
    incompatible = 4
}
