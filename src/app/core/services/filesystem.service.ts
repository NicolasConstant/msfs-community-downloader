import { Injectable } from '@angular/core';
import { Package } from './packages.service';
import { SettingsService } from './settings.service';
import { ElectronService } from './electron/electron.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilesystemService {  
    public folderCopied = new BehaviorSubject<CopyFolderInfo>(null);

    constructor(
        private settingsService: SettingsService,
        private electronService: ElectronService
    ) { 

        this.electronService.ipcRenderer.on('copy-folder-success', (event, arg) => {
            console.warn("on('copy-folder-success')");
            console.warn(arg);

            if(arg){
                this.folderCopied.next(arg);
            }
        });
    }

    retrievePackageInfo(p: Package): LocalState {
        const communityPath = this.settingsService.getSettings().communityPath;
        if (!communityPath) return new LocalState(false, null);

        const path = `${communityPath}\\${p.folderName}`;
        const folderFound = this.electronService.fs.existsSync(path);

        const versionPath = `${path}\\msfs-downloader-updater.json`;
        const versionFound = this.electronService.fs.existsSync(versionPath);

        let version: string = null;
        if (versionFound) {
            version = this.electronService.fs.readFileSync(versionPath, 'utf-8');
        }

        return new LocalState(folderFound, version);
    }

    getTempDir(): string {
        let tempDir = this.electronService.fs.mkdtempSync("msfs-downloader___");
        tempDir = `${this.settingsService.getSettings().communityPath}\\${tempDir}`;
        if (this.electronService.fs.existsSync(tempDir)) {
            this.electronService.fs.rmdirSync(tempDir, { recursive: true });
        }
        this.electronService.fs.mkdirSync(tempDir);
        console.warn(tempDir);
        return tempDir;
    }

    findAddinFolder(extractedFolder: string): string {
        const fs = this.electronService.fs;
        const addinFile = `${extractedFolder}\\manifest.json`;

        console.warn('addinFile')
        console.warn(addinFile)

        if (!fs.existsSync(extractedFolder)) return null;
        if (fs.existsSync(addinFile)) return extractedFolder;

        const subDirs = this.getDirectories(extractedFolder);
        console.warn('subDirs');
        console.warn(subDirs);
        for (let d of subDirs) {
            const subDirPath = `${extractedFolder}\\${d}`;
            console.warn('subDirPath');
            console.warn(subDirPath);
            let result = this.findAddinFolder(subDirPath);
            if (result) return result;
        }

        return null;
    }

    deleteFolder(folderPath: string) {
        if (this.electronService.fs.existsSync(folderPath)) {
            this.electronService.fs.rmdirSync(folderPath, { recursive: true });
        }
    }

    copyToCommunity(packageId: string, addinFolderPath: string, packageFolderName: string) {
        const communityDir = this.settingsService.getSettings().communityPath;
        const target = `${communityDir}\\${packageFolderName}`;

        const info = new CopyFolderInfo();
        info.packageId = packageId;
        info.source = addinFolderPath;
        info.target = target;

        this.electronService.ipcRenderer.send('copy-folder', info);
    }

    writeVersionFile(targetDir: string, version: string) {
        const path = `${targetDir}\\msfs-downloader-updater.json`;
        this.electronService.fs.writeFileSync(path, version, 'utf-8'); 
    }

    private getDirectories(path): string[] {
        const fs = this.electronService.fs;
        return fs.readdirSync(path).filter(function (file) {
            return fs.statSync(path + '/' + file).isDirectory();
        });
    }
}

export class LocalState {
    constructor(
        public folderFound: boolean,
        public version: string) { }
}

export class CopyFolderInfo {
    packageId: string;
    source: string;
    target: string;
}