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

    getTempDir(): string {
        let tempDir = this.electronService.fs.mkdtempSync("msfs-downloader___");
        tempDir = `${this.settingsService.getSettings().communityPath}/${tempDir}`;
        if (this.electronService.fs.existsSync(tempDir)) {
            this.electronService.fs.rmdirSync(tempDir, { recursive: true });
        }
        this.electronService.fs.mkdirSync(tempDir);
        console.warn(tempDir);
        return tempDir;
    }   
}

export class LocalState {
    constructor(
        public folderFound: boolean,
        public version: string) { }
}