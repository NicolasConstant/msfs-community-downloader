import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReleaseTypeEnum } from './packages.service';

@Injectable({
    providedIn: 'root'
})
export class OnlineRepoService {

    constructor(private http: HttpClient) { }

    retrievePackageList(): Promise<OnlinePackageInfo[]>{
        const route = `https://nicolasconstant.github.io/msfs-community-downloader/index.json`;

        return this.http.get<OnlinePackageInfo[]>(route)
            .toPromise();
    }

    retrievePackage(name: string): Promise<ExportablePackage>{
        const route = `https://nicolasconstant.github.io/msfs-community-downloader/${name}/package.json`;

        return this.http.get<ExportablePackage>(route)
            .toPromise();
    }
}

export class ExportablePackage {
    public id: string;
    public name: string;
    public description: string;
    public githubOwner: string;
    public githubRepo: string;
    public assetName: string;
    public isPrerelease: boolean;
    public versionPatternToRemove: string;
    public folderName: string;
    public illustration: string;
    public summary: string;
    public webpageUrl: string;
    public oldFolderNames: string[];
    public minSoftwareVersion: string;
    public releaseType: ReleaseTypeEnum;
    public releaseBranchTag: string;
    public branchName: string;
}

export class OnlinePackageInfo {
    public name: string;
    public version: string;
    public id: string;
}