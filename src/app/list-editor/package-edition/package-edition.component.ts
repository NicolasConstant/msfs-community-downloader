import { Component, OnInit, Input } from '@angular/core';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';

import { Package } from '../../core/services/packages.service';
import { SettingsService } from '../../core/services/settings.service';

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

    constructor(
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        const settings = this.settingsService.getSettings();

        this.isRemoved = settings.removedPackageIds.find(x => x === this.packageInfo.id) != null;
        
        const customFolder = settings.customPackageFolders.find(x => x.packageId === this.packageInfo.id);
        if(customFolder){
            this.displayCustomFolder = true;
            this.customFolder = customFolder.customFolder;
        }
    }

    toggleSetFolder(): boolean {
        this.displayCustomFolder = !this.displayCustomFolder;
        return false;
    }

    toggleRemove(): boolean {
        this.isRemoved = !this.isRemoved;

        const packageId = this.packageInfo.id;
        const settings =  this.settingsService.getSettings();
        let removedPackageIds = settings.removedPackageIds
        if(this.isRemoved){
            if(!removedPackageIds.find(x => x === packageId)){
                removedPackageIds.push(packageId)
            }
        } else {
            if(removedPackageIds.find(x => x === packageId)){
                removedPackageIds = removedPackageIds.filter(x => x !== packageId);
            }
        }
        settings.removedPackageIds = removedPackageIds;
        this.settingsService.saveSettings(settings);

        return false;
    }

    findCustomFolder(): boolean {

        return false;
    }
}
