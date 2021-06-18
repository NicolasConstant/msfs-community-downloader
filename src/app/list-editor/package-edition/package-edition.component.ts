import { Component, OnInit, Input } from '@angular/core';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';

import { Package } from '../../core/services/packages.service';
import { SettingsService, CustomFolder } from '../../core/services/settings.service';
import { ElectronService } from '../../core/services/electron/electron.service';

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
        private settingsService: SettingsService,
        private electronService: ElectronService
    ) { }

    ngOnInit(): void {
        const settings = this.settingsService.getSettings();

        this.isRemoved = settings.removedPackageIds.find(x => x === this.packageInfo.id) != null;

        const customFolder = settings.customPackageFolders.find(x => x.packageId === this.packageInfo.id);
        if (customFolder) {
            this.displayCustomFolder = true;
            this.customFolder = customFolder.customFolder;
        }
    }

    toggleSetFolder(): boolean {
        this.displayCustomFolder = !this.displayCustomFolder;

        if (!this.displayCustomFolder) {
            this.customFolder = null;

            const settings = this.settingsService.getSettings();
            let customPackageFolders = settings.customPackageFolders;
            customPackageFolders = customPackageFolders.filter(x => x.packageId !== this.packageInfo.id);
            settings.customPackageFolders = customPackageFolders;
            this.settingsService.saveSettings(settings);
        }

        return false;
    }

    toggleRemove(): boolean {
        this.isRemoved = !this.isRemoved;

        const packageId = this.packageInfo.id;
        const settings = this.settingsService.getSettings();
        let removedPackageIds = settings.removedPackageIds;
        if (this.isRemoved) {
            if (!removedPackageIds.find(x => x === packageId)) {
                removedPackageIds.push(packageId)
            }
        } else {
            if (removedPackageIds.find(x => x === packageId)) {
                removedPackageIds = removedPackageIds.filter(x => x !== packageId);
            }
        }
        settings.removedPackageIds = removedPackageIds;
        this.settingsService.saveSettings(settings);

        return false;
    }

    findCustomFolder(): boolean {
        this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
            .then(re => {
                if (!re.canceled && re.filePaths.length > 0) {                   
                    return re.filePaths[0];
                }
                return null;
            })
            .then(path => {
                if(path){
                    const settings = this.settingsService.getSettings();
                    const customPackageFolders = settings.customPackageFolders;
                    const customPackageFolder = customPackageFolders.find(x => x.packageId === this.packageInfo.id);

                    if(customPackageFolder){
                        this.customFolder = customPackageFolder.customFolder;
                    } else {
                        const newPackageFolder = new CustomFolder();
                        newPackageFolder.packageId = this.packageInfo.id;
                        newPackageFolder.customFolder = path;

                        customPackageFolders.push(newPackageFolder);

                        settings.customPackageFolders = customPackageFolders;
                        this.settingsService.saveSettings(settings);

                        this.customFolder = path;
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });

        return false;
    }
}
