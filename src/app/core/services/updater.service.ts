import { Injectable } from '@angular/core';
import { FilesystemService, LocalState } from './filesystem.service';
import { GithubService, PackageInfo } from './github.service';
import { Package, InstallStatusEnum } from './packages.service';

@Injectable({
    providedIn: 'root'
})
export class UpdaterService {
    constructor(
        private filesystemService: FilesystemService,
        private githubService: GithubService
    ) { }

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
        if (local.version && info.downloadUrl) {
            if (local.version === info.downloadUrl) return InstallStatusEnum.installed;
            if (local.version !== info.downloadUrl) return InstallStatusEnum.updateAvailable;
        }
        return InstallStatusEnum.error;
    }
}
