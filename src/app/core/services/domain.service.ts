import { Injectable, ApplicationRef } from '@angular/core';
import { FilesystemService, LocalState, CopyFolderInfo } from './filesystem.service';
import { GithubService, PackageInfo } from './github.service';
import { Package, InstallStatusEnum, PackagesService } from './packages.service';
import { DownloaderService, FileDownloadInfo } from './downloader.service';
import { Subscription } from 'rxjs';
import { ExtractorService, FileExtractedInfo } from './extractor.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class DomainService {    
    private packages: Package[];
    private downloadSub: Subscription;
    private extractSub: Subscription;
    private copySub: Subscription;

    constructor(
        private app: ApplicationRef,
        private packageService: PackagesService,
        private filesystemService: FilesystemService,
        private githubService: GithubService,
        private downloaderService: DownloaderService,
        private extractorService: ExtractorService,
        private settingsService: SettingsService
    ) {
        this.downloadSub = downloaderService.fileDownloaded.subscribe(r => {
            console.warn('sub download r');
            console.warn(r);

            if (r) {
                this.processDownloadedFile(r);
            }
        })
        this.extractSub = extractorService.fileExtracted.subscribe(r => {
            console.warn('sub extract r');
            console.warn(r);

            if(r){
                this.processExtractedFolder(r);
            }
        });
        this.copySub = filesystemService.folderCopied.subscribe(r => {
            console.warn('sub copy r');
            console.warn(r);

            if(r){
                this.processCopiedFolder(r);
            }
        })
    }

    analysePackages(packages: Package[]): Promise<any> {
        let pipeline: Promise<any> = Promise.resolve(true);
        packages.forEach(x => {
            pipeline = pipeline.then(_ => {
                return this.analysePackage(x);
            });
        });
        return pipeline;
    }

    private analysePackage(p: Package): Promise<any> {
        const local = this.filesystemService.retrievePackageInfo(p);
        return this.githubService.retrievePackageInfo(p)
            .then((info: PackageInfo) => {
                p.localVersion = local.version;
                p.availableVersion = info.availableVersion;
                p.assetDownloadUrl = info.downloadUrl;
                p.state = this.getState(local, info);
            });
    }

    private getState(local: LocalState, info: PackageInfo): InstallStatusEnum {
        if (!local.folderFound) return InstallStatusEnum.notFound;
        if (local.version && info.availableVersion) {
            if (local.version === info.availableVersion) return InstallStatusEnum.installed;
            if (local.version !== info.availableVersion) return InstallStatusEnum.updateAvailable;
        }
        return InstallStatusEnum.error;
    }

    private processDownloadedFile(r: FileDownloadInfo) {
        console.log('processDownloadedFile');
        console.warn(r);

        const downloadedPackage = this.packages.find(x => x.id === r.packageId);
        downloadedPackage.state = InstallStatusEnum.extracting;
        this.app.tick();

        this.extractorService.extract(downloadedPackage.id, r.filePath);
    }

    processExtractedFolder(r: FileExtractedInfo) {
        const extractedFolder = r.extractFolder;
        const addinFolderPath = this.filesystemService.findAddinFolder(extractedFolder);

        console.warn('FOUND addinFolderPath');
        console.warn(addinFolderPath);

        if(!addinFolderPath) return;

        const p = this.packages.find(x => x.id === r.packageId);

        const communityDir = this.settingsService.getSettings().communityPath;
        const folderPath = `${communityDir}\\${p.folderName}`;

        p.state = InstallStatusEnum.installing;
        this.app.tick();

        this.filesystemService.deleteFolder(folderPath);
        this.filesystemService.copyToCommunity(p.id, addinFolderPath, p.folderName);        
    }

    processCopiedFolder(r: CopyFolderInfo) {
        const p = this.packages.find(x => x.id === r.packageId);
        if(p.tempWorkingDir){
            this.filesystemService.deleteFolder(p.tempWorkingDir);
            p.tempWorkingDir = null;
        }
        this.filesystemService.writeVersionFile(r.target, p.availableVersion);
        p.localVersion = p.availableVersion;
        p.state = InstallStatusEnum.installed;
        this.app.tick();
    }

    getPackages(): Promise<Package[]> {
        return this.packageService.getPackages()
            .then(p => {
                this.packages = p;
                return p;
            });
    }

    install(p: Package) {
        p.state = InstallStatusEnum.downloading;
        this.app.tick();
        const tempDir = this.filesystemService.getTempDir();
        p.tempWorkingDir = tempDir;
        this.downloaderService.download(p.id, p.assetDownloadUrl, tempDir);
    }

    update(p: Package) {
        p.state = InstallStatusEnum.downloading;
        this.app.tick();
        const tempDir = this.filesystemService.getTempDir();
        this.downloaderService.download(p.id, p.assetDownloadUrl, tempDir);
    }
    remove(p: Package) {
        throw new Error("Method not implemented.");
    }

}
