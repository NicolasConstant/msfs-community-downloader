import { Injectable, ApplicationRef } from '@angular/core';
import { FilesystemService, LocalState, CopyFolderInfo } from './filesystem.service';
import { GithubService, PackageInfo } from './github.service';
import { Package, InstallStatusEnum, PackagesService } from './packages.service';
import { DownloaderService, FileDownloadInfo, FileDownloadUpdate } from './downloader.service';
import { Subscription } from 'rxjs';
import { ExtractorService, FileExtractedInfo } from './extractor.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class DomainService {
     
    private packages: Package[];
    private downloadSub: Subscription;
    private downloadUpdateSub: Subscription;
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
        });
        this.downloadUpdateSub = downloaderService.fileDownloadedUpdated.subscribe(r => {
            if(r){
                this.processDownloadedUpdate(r);
            }
        });
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
        });
    }

    analysePackages(packages: Package[]): Promise<any> {
        let pipeline: Promise<any> = Promise.resolve(true);
        packages.forEach(x => {
            pipeline = pipeline.then(() => {
                return this.analysePackage(x);
            });
        });
        return pipeline;
    }

    private analysePackage(p: Package): Promise<any> {
        const localPromise = this.filesystemService.retrievePackageInfo(p);
        const githubPromise = this.githubService.retrievePackageInfo(p);

        return Promise.all([localPromise, githubPromise])
            .then(result => {
                p.localVersion = result[0].version;
                p.availableVersion = result[1].availableVersion;
                p.assetDownloadUrl = result[1].downloadUrl;
                p.state = this.getState(result[0], result[1]);
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
        downloadedPackage.downloaded = null;
        this.app.tick();

        this.extractorService.extract(downloadedPackage.id, r.filePath);
    }

    processDownloadedUpdate(r: FileDownloadUpdate) {
        console.log('processDownloadedUpdate');
        console.warn(r);

        const downloadedPackage = this.packages.find(x => x.id === r.packageId);
        downloadedPackage.downloaded = r.downloadedData;
        this.app.tick();
    }  

    async processExtractedFolder(r: FileExtractedInfo): Promise<any> {
        const extractedFolder = r.extractFolder;
        const addinFolderPath = await this.filesystemService.findAddinFolder(extractedFolder);

        if(!addinFolderPath) return;

        const p = this.packages.find(x => x.id === r.packageId);

        const communityDir = this.settingsService.getSettings().communityPath;
        const folderPath = `${communityDir}\\${p.folderName}`;

        p.state = InstallStatusEnum.installing;
        this.app.tick();

        await this.filesystemService.deleteFolder(folderPath);
        this.filesystemService.copyToCommunity(p.id, addinFolderPath, p.folderName);        
    }

    processCopiedFolder(r: CopyFolderInfo): void {
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

    install(p: Package): void {
        p.state = InstallStatusEnum.downloading;
        this.app.tick();
        this.filesystemService.getTempDir()
            .then(tempDir => {
                p.tempWorkingDir = tempDir;
                this.downloaderService.download(p.id, p.assetDownloadUrl, tempDir);
            });      
    }

    update(p: Package): void {
        this.install(p);
    }

    remove(p: Package): void {
        console.log(p);
        throw new Error("Method not implemented.");
    }
}
