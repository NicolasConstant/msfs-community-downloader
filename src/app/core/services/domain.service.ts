import { Injectable, ApplicationRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { FilesystemService, LocalState, CopyFolderInfo } from './filesystem.service';
import { BranchInfo, GithubService, PackageInfo } from './github.service';
import { Package, InstallStatusEnum, PackagesService, ReleaseTypeEnum } from './packages.service';
import { DownloaderService } from './downloader.service';
import { ExtractorService } from './extractor.service';
import { SettingsService } from './settings.service';
import { FileDownloadInfo, FileDownloadUpdate, FileExtractedInfo, FilePackageInfo } from '../models';
import { ElectronService } from './electron/electron.service';

@Injectable({
    providedIn: 'root'
})
export class DomainService {
    private packages: Package[];
    private downloadSub: Subscription;
    private downloadUpdateSub: Subscription;
    private extractSub: Subscription;
    private copySub: Subscription;

    public errorSubject = new Subject<string>();

    constructor(
        private app: ApplicationRef,
        private packageService: PackagesService,
        private filesystemService: FilesystemService,
        private githubService: GithubService,
        private downloaderService: DownloaderService,
        private extractorService: ExtractorService,
        private settingsService: SettingsService,
        private electronService: ElectronService
    ) {
        this.downloadSub = downloaderService.fileDownloaded.subscribe(r => {
            if (r) {
                this.processDownloadedFile(r);
            }
        });
        this.downloadUpdateSub = downloaderService.fileDownloadedUpdated.subscribe(r => {
            if (r) {
                this.processDownloadedUpdate(r);
            }
        });
        this.extractSub = extractorService.fileExtracted.subscribe(r => {
            if (r) {
                this.processExtractedFolder(r);
            }
        });
        this.copySub = filesystemService.folderCopied.subscribe(r => {
            if (r) {
                this.processCopiedFolder(r);
            }
        });

        this.electronService.ipcRenderer.on('log-error', (event, arg) => {
            if (arg) {
                const error = arg.error;
                const info: FilePackageInfo = arg.info;

                this.processPackageError(info);

                console.error('Node error');
                console.error(error);

                if (error.message) {
                    this.errorSubject.next(error.message);
                } else {
                    this.errorSubject.next(error);
                }
            }
        });
    }

    analysePackages(packages: Package[]): Promise<any> {
        let error: any = null;
        let pipeline: Promise<any> = Promise.resolve(true);
        packages.forEach(x => {
            pipeline = pipeline.then(() => {
                return this.analysePackage(x)
                    .catch(err => {
                        console.error(err);
                        error = err;
                        x.state = InstallStatusEnum.error;
                    });
            });
        });
        pipeline = pipeline.then(() => {
            if (error) {
                throw (error);
            }
        });
        return pipeline;
    }

    private analysePackage(p: Package): Promise<any> {
        const localPromise = this.filesystemService.retrievePackageInfo(p);

        let githubPromise: Promise<PackageInfo> = Promise.resolve(null);
        if (p.releaseType === ReleaseTypeEnum.release) {
            githubPromise = this.githubService.retrievePackageInfo(p);
        } else if (p.releaseType === ReleaseTypeEnum.releaseFromBranch) {
            githubPromise = this.githubService.retrievePackageInfoFromUniqueTag(p);
        }

        let branchPromise: Promise<BranchInfo> = Promise.resolve(null);
        if (p.releaseType === ReleaseTypeEnum.branch || p.releaseType === ReleaseTypeEnum.releaseFromBranch) {
            branchPromise = this.githubService.retrieveBranchInfo(p);
        }

        return Promise.all([localPromise, githubPromise, branchPromise])
            .then(result => {
                const local = result[0];
                const remote = result[1];
                const branch = result[2];

                if (local) {
                    p.localVersion = local.version;
                }

                // if (remote || p.releaseType === ReleaseTypeEnum.branch) {
                if (p.releaseType === ReleaseTypeEnum.branch) {
                    p.assetDownloadUrl = branch.downloadUrl;
                } else {
                    p.assetDownloadUrl = remote.downloadUrl;
                }

                if (p.releaseType === ReleaseTypeEnum.branch || p.releaseType === ReleaseTypeEnum.releaseFromBranch) {
                    p.availableVersion = branch.hashVersion;
                } else {
                    p.availableVersion = remote.availableVersion;
                }

                if (p.releaseType === ReleaseTypeEnum.release || p.releaseType === ReleaseTypeEnum.releaseFromBranch) {
                    p.publishedAt = remote.publishedAt;
                    p.html_url = remote.html_url;
                } else if (p.releaseType === ReleaseTypeEnum.branch) {
                    p.publishedAt = branch.publishedAt;
                }
                // }

                p.state = this.getState(p, local);
            });
    }

    private getState(p: Package, local: LocalState): InstallStatusEnum {
        if (p.state === InstallStatusEnum.error) return InstallStatusEnum.error;
        if (p.state === InstallStatusEnum.downloading) return InstallStatusEnum.downloading;
        if (p.state === InstallStatusEnum.extracting) return InstallStatusEnum.extracting;
        if (p.state === InstallStatusEnum.installing) return InstallStatusEnum.installing;

        if (local && local.untrackedFolderFound) return InstallStatusEnum.untrackedPackageFound;
        if (local && !local.folderFound) return InstallStatusEnum.notFound;
        if (local && local.version && p && p.availableVersion) {
            if (local.version === p.availableVersion) return InstallStatusEnum.installed;
            if (local.version !== p.availableVersion) return InstallStatusEnum.updateAvailable;
        }

        return InstallStatusEnum.unknown;
    }

    private processDownloadedFile(r: FileDownloadInfo): void {
        const downloadedPackage = this.packages.find(x => x.id === r.packageId);
        downloadedPackage.state = InstallStatusEnum.extracting;
        downloadedPackage.downloaded = null;
        this.app.tick();

        this.extractorService.extract(downloadedPackage.id, r.filePath);
    }

    processPackageError(r: FilePackageInfo) {
        const errorPackage = this.packages.find(x => x.id === r.packageId);
        errorPackage.state = InstallStatusEnum.error;
        errorPackage.downloaded = null;
        this.app.tick();
    }

    processDownloadedUpdate(r: FileDownloadUpdate): void {
        const downloadedPackage = this.packages.find(x => x.id === r.packageId);
        downloadedPackage.downloaded = r.downloadedData;
        this.app.tick();
    }

    async processExtractedFolder(r: FileExtractedInfo): Promise<any> {
        try {
            const extractedFolder = r.extractFolder;
            const addinFolderPath = await this.filesystemService.findAddinFolder(extractedFolder);

            if (!addinFolderPath) return;

            const p = this.packages.find(x => x.id === r.packageId);

            const communityDir = this.settingsService.getSettings().communityPath;
            const folderPath = `${communityDir}\\${p.folderName}`;

            p.state = InstallStatusEnum.installing;
            this.app.tick();

            // Clean up
            await this.filesystemService.deleteFolder(folderPath);

            if (p.oldFolderNames && p.oldFolderNames.length > 0) {
                p.oldFolderNames.forEach(o => {
                    (async () => {
                        const oldFolderPath = `${communityDir}\\${o}`;
                        await this.filesystemService.deleteFolder(oldFolderPath);
                    })();
                });
            }

            this.filesystemService.copyToCommunity(p.id, addinFolderPath, p.folderName);
        } catch (err) {
            console.error(err);
        }
    }

    processCopiedFolder(r: CopyFolderInfo): void {
        try {
            const p = this.packages.find(x => x.id === r.packageId);
            if (p.tempWorkingDir) {
                this.filesystemService.deleteFolder(p.tempWorkingDir);
                p.tempWorkingDir = null;
            }
            this.filesystemService.writeVersionFile(r.target, p.availableVersion);
            p.localVersion = p.availableVersion;
            p.state = InstallStatusEnum.installed;
            this.app.tick();
        } catch (err) {
            console.error(err);
        }
    }

    getPackages(): Package[] {
        if (this.packages) {
            return this.packages;
        }

        this.packages = this.packageService.getPackages();
        return this.packages;
    }

    addCustomPackage(p: Package): void {
        if (!this.packages) {
            this.getPackages();
        }

        if (!p) return;
        p.minSoftwareVersion = this.settingsService.getVersion();

        this.packages.forEach(x => x.isSelected = false);

        const settings = this.settingsService.getSettings();
        settings.customPackages.push(p);
        this.settingsService.saveSettings(settings);

        this.packages.unshift(p);
        p.state = InstallStatusEnum.unknown;
        p.isCustomPackage = true;
        p.isSelected = true;
        this.analysePackage(p)
            .catch(err => {
                console.error(err);
            });
    }

    addOnlinePackage(p: Package): void {
        if (!this.packages) {
            this.getPackages();
        }

        if (!p) return;

        this.packages.forEach(x => x.isSelected = false);

        const settings = this.settingsService.getSettings();
        settings.onlinePackages.push(p);
        this.settingsService.saveSettings(settings);

        this.packages.unshift(p);
        p.state = InstallStatusEnum.unknown;
        p.isOnlinePackage = true;
        p.isSelected = true;

        this.analysePackage(p)
            .catch(err => {
                console.error(err);
            });
    }

    updateCustomPackage(p: Package): void {
        if (!p) return;

        const settings = this.settingsService.getSettings();
        const toUpdate = settings.customPackages.find(x => x.id === p.id);

        toUpdate.id = p.id;
        toUpdate.name = p.name;
        toUpdate.description = p.description;
        toUpdate.summary = p.summary;
        toUpdate.githubOwner = p.githubOwner;
        toUpdate.githubRepo = p.githubRepo;
        toUpdate.assetName = p.assetName;
        toUpdate.isPrerelease = p.isPrerelease;
        toUpdate.folderName = p.folderName;
        toUpdate.illustration = p.illustration;
        toUpdate.webpageUrl = p.webpageUrl;
        toUpdate.versionPatternToRemove = p.versionPatternToRemove;
        toUpdate.releaseType = p.releaseType;
        toUpdate.branchName = p.branchName;
        toUpdate.releaseBranchTag = p.releaseBranchTag;

        this.settingsService.saveSettings(settings);

        const localToUpdate = this.packages.find(x => x.id === p.id);

        localToUpdate.id = p.id;
        localToUpdate.name = p.name;
        localToUpdate.description = p.description;
        localToUpdate.summary = p.summary;
        localToUpdate.githubOwner = p.githubOwner;
        localToUpdate.githubRepo = p.githubRepo;
        localToUpdate.assetName = p.assetName;
        localToUpdate.isPrerelease = p.isPrerelease;
        localToUpdate.folderName = p.folderName;
        localToUpdate.illustration = p.illustration;
        localToUpdate.webpageUrl = p.webpageUrl;
        localToUpdate.versionPatternToRemove = p.versionPatternToRemove;
        localToUpdate.releaseType = p.releaseType;
        localToUpdate.branchName = p.branchName;
        localToUpdate.releaseBranchTag = p.releaseBranchTag;
    }

    updateOnlinePackage(p: Package): void {
        if (!p) return;

        const settings = this.settingsService.getSettings();
        const toUpdate = settings.onlinePackages.find(x => x.id === p.id);

        toUpdate.id = p.id;
        toUpdate.name = p.name;
        toUpdate.description = p.description;
        toUpdate.summary = p.summary;
        toUpdate.githubOwner = p.githubOwner;
        toUpdate.githubRepo = p.githubRepo;
        toUpdate.assetName = p.assetName;
        toUpdate.isPrerelease = p.isPrerelease;
        toUpdate.folderName = p.folderName;
        toUpdate.illustration = p.illustration;
        toUpdate.webpageUrl = p.webpageUrl;
        toUpdate.versionPatternToRemove = p.versionPatternToRemove;
        toUpdate.onlineVersion = p.onlineVersion;
        toUpdate.releaseType = p.releaseType;
        toUpdate.branchName = p.branchName;
        toUpdate.releaseBranchTag = p.releaseBranchTag;

        this.settingsService.saveSettings(settings);

        const localToUpdate = this.packages.find(x => x.id === p.id);

        localToUpdate.id = p.id;
        localToUpdate.name = p.name;
        localToUpdate.description = p.description;
        localToUpdate.summary = p.summary;
        localToUpdate.githubOwner = p.githubOwner;
        localToUpdate.githubRepo = p.githubRepo;
        localToUpdate.assetName = p.assetName;
        localToUpdate.isPrerelease = p.isPrerelease;
        localToUpdate.folderName = p.folderName;
        localToUpdate.illustration = p.illustration;
        localToUpdate.webpageUrl = p.webpageUrl;
        localToUpdate.versionPatternToRemove = p.versionPatternToRemove;
        localToUpdate.onlineVersion = p.onlineVersion;
        localToUpdate.releaseType = p.releaseType;
        localToUpdate.branchName = p.branchName;
        localToUpdate.releaseBranchTag = p.releaseBranchTag;
    }

    removeCustomPackage(p: Package): void {
        if (!p) return;

        const settings = this.settingsService.getSettings();
        settings.customPackages = settings.customPackages.filter(x => x.id !== p.id);
        this.settingsService.saveSettings(settings);

        this.packages = this.packages.filter(x => x.id !== p.id);
    }

    removeOnlinePackage(p: Package): void {
        if (!p) return;

        const settings = this.settingsService.getSettings();
        settings.onlinePackages = settings.onlinePackages.filter(x => x.id !== p.id);
        this.settingsService.saveSettings(settings);

        this.packages = this.packages.filter(x => x.id !== p.id);
    }

    install(p: Package): void {
        // const p = this.packages.find(x => x.id === pack.id);

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

    resetPackage(packageId: string): void {
        const p = this.packages.find(x => x.id === packageId);
        p.state = InstallStatusEnum.unknown;
        this.analysePackage(p)
            .catch(err => {
                console.error(err);
            })
            .then(_ => {
                this.app.tick();
            });
    }

    remove(p: Package): void {
        const communityDir = this.settingsService.getSettings().communityPath;

        let folderPath = `${communityDir}\\${p.folderName}`;

        const customPackageFolder = this.settingsService.getCustomPackageDirectory(p.id);
        if (customPackageFolder) {
            folderPath = `${customPackageFolder}\\${p.folderName}`;
        }

        this.filesystemService.deleteFolder(folderPath)
            .then(() => {
                p.localVersion = null;
                p.state = InstallStatusEnum.notFound;
                this.app.tick();
            })
            .catch(err => {
                console.error(err);
            });
    }
}
