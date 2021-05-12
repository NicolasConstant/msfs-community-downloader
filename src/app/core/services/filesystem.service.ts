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

        if (!fs.existsSync(extractedFolder)) return null;
        if (fs.existsSync(addinFile)) return extractedFolder;

        const subDirs = this.getDirectories(extractedFolder);
        console.log(subDirs);
        for (let d of subDirs) {
            let result = this.findAddinFolder(d);
            if (result) return result;
        }

        return null;
    }

    deleteIfCommunityContains(folderName: string) {
        const communityDir = this.settingsService.getSettings().communityPath;
        const folderPath = `${communityDir}\\${folderName}`;

        if (this.electronService.fs.existsSync(folderPath)) {
            this.electronService.fs.rmdirSync(folderPath, { recursive: true });
        }
    }

    copyToCommunity(addinFolderPath: string, packageFolderName: string) {
        const communityDir = this.settingsService.getSettings().communityPath;
        const target = `${communityDir}\\${packageFolderName}`;

        this.copyFolderRecursiveSync(addinFolderPath, target);
    }

    private copyFolderRecursiveSync(source, target) {
        const fs = this.electronService.fs;
        const path = this.electronService.remote.path;

        var files = [];

        // Check if folder needs to be created or integrated
        var targetFolder = path.join(target, path.basename(source));
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder);
        }

        // Copy
        if (fs.lstatSync(source).isDirectory()) {
            files = fs.readdirSync(source);
            files.forEach(function (file) {
                var curSource = path.join(source, file);
                if (fs.lstatSync(curSource).isDirectory()) {
                    this.copyFolderRecursiveSync(curSource, targetFolder);
                } else {
                    this.copyFileSync(curSource, targetFolder);
                }
            });
        }
    }

    private copyFileSync(source, target) {
        const fs = this.electronService.fs;
        const path = this.electronService.remote.path;

        var targetFile = target;

        // If target is a directory, a new file with the same name will be created
        if (fs.existsSync(target)) {
            if (fs.lstatSync(target).isDirectory()) {
                targetFile = path.join(target, path.basename(source));
            }
        }

        fs.writeFileSync(targetFile, fs.readFileSync(source));
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