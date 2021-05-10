import { Injectable } from '@angular/core';
import { Package } from './packages.service';
import { SettingsService } from './settings.service';
import { ElectronService } from './electron/electron.service';

@Injectable({
    providedIn: 'root'
})
export class FilesystemService {

    constructor(
        private settingsService: SettingsService,
        private electronService: ElectronService
    ) { }

    retrievePackageInfo(p: Package): LocalState {
        const communityPath = this.settingsService.getSettings().communityPath;
        if (!communityPath) return new LocalState(false, null);

        const path = `${communityPath}/${p.folderName}`;
        const folderFound = this.electronService.fs.existsSync(path);

        const versionPath = `${path}/msfs-downloader-updater.json`;
        const versionFound = this.electronService.fs.existsSync(versionPath);

        let version: string = null;
        if (versionFound) {
            version = this.electronService.fs.readFileSync(versionPath, 'utf-8');
        }

        return new LocalState(folderFound, version);
    }
}

export class LocalState {
    constructor(
        folderFound: boolean,
        version: string) { }
}