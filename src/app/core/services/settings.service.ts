import { Injectable } from '@angular/core';

import { version } from '../../.././../package.json';

import { ElectronService } from './electron/electron.service';
import { Package } from './packages.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    constructor(
        private electronService: ElectronService
    ) {
    }

    getVersion(): string {
        return version;
    }

    getSettings(): SettingsData {
        const settings = this.getSavedSettings();
        if (!settings.communityPath) {
            settings.communityPath = this.findCommunityFolder();
            if(settings.communityPath) { 
                this.saveSettings(settings);
            }
        }
        if(!settings.customPackages){
            settings.customPackages = [];
            this.saveSettings(settings);
        }
        if(!settings.onlinePackages){
            settings.onlinePackages = [];
            this.saveSettings(settings);
        }
        if(!settings.removedPackageIds){
            settings.removedPackageIds = [];
            this.saveSettings(settings);
        }
        if(!settings.customPackageFolders){
            settings.customPackageFolders = [];
            this.saveSettings(settings);
        }
        return settings;
    }

    getCustomPackageDirectory(packageId: string): string {
        if(!packageId) return null;

        const settings = this.getSettings();
        if(settings.customPackageFolders.length === 0) return null;

        const customPackage = settings.customPackageFolders.find(x => x.packageId === packageId);
        if(!customPackage) return null;
        return customPackage.customFolder;        
    }

    private findCommunityFolder(): string {
        console.log('find community folder');
        try {
            const electron = this.electronService.remote;
            const configDir: string = (electron.app || electron.remote.app).getPath('userData');

            console.warn(`configDir: ${configDir}`);

            const appDataDir = configDir.toLowerCase().split('roaming')[0];

            console.warn(`appDataDir: ${appDataDir}`);

            const steamPath = `${appDataDir}roaming\\Microsoft Flight Simulator\\UserCfg.opt`;
            const winStorePath = `${appDataDir}local\\Packages\\Microsoft.FlightSimulator_8wekyb3d8bbwe\\LocalCache\\UserCfg.opt`;

            let userCfgContent: string;
            if (this.electronService.fs.existsSync(steamPath)) {
                console.warn(`steam path found`);
                userCfgContent = this.electronService.fs.readFileSync(steamPath, 'utf-8');
            } else if (this.electronService.fs.existsSync(winStorePath)) {
                console.warn(`msfs path found`);
                userCfgContent = this.electronService.fs.readFileSync(winStorePath, 'utf-8');
            }

            if (!userCfgContent) return null;

            console.warn(`userCfgContent read succesfuly`);

            const installPackagePath = userCfgContent
                .split('InstalledPackagesPath')[1]
                .split('"')[1];

            console.warn(`installPackagePath: ${installPackagePath}`);

            if (!installPackagePath) return null;

            const community = `${installPackagePath}\\Community`;

            console.warn(`community: ${community}`);

            if (this.electronService.fs.existsSync(community)) {
                console.warn(`community: exists`);
                return community;
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    findAndSelectCommunityPath(): Promise<string> {
        return this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
            .then(re => {
                if (!re.canceled && re.filePaths.length > 0) {
                    const settings = this.getSavedSettings();
                    settings.communityPath = re.filePaths[0];
                    this.saveSettings(settings);

                    return settings.communityPath;
                }
                return null;
            });
    }

    private getSavedSettings(): SettingsData {
        const json = localStorage.getItem('settings');
        if (json) {
            return JSON.parse(json);
        } else {
            return new SettingsData();
        }
    }

    saveSettings(settings: SettingsData): void {
        const json = JSON.stringify(settings);
        localStorage.setItem('settings', json);
    }
}

export class SettingsData {
    communityPath: string;
    customPackages: Package[];
    onlinePackages: Package[];
    removedPackageIds: string[];
    customPackageFolders: CustomFolder[];
}

export class CustomFolder {
    packageId: string;
    customFolder: string;
}