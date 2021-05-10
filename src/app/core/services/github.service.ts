import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Package, InstallStatusEnum } from './packages.service';

@Injectable({
    providedIn: 'root'
})
export class GithubService {

    constructor(private http: HttpClient) { }

    // analysePackages(packages: Package[]): Promise<any> {
    //     let pipeline: Promise<any> = Promise.resolve(true);
    //     packages.forEach(x => {
    //         pipeline = pipeline.then(_ => {
    //             return this.retrievePackageInfo(x)
    //                 .then(res => {
    //                     if (res) {
    //                         x.localVersion = res.localVersion;
    //                         x.availableVersion = res.availableVersion;
    //                         x.state = res.state;
    //                     }
    //                 })
    //                 .catch(err => {

    //                 });
    //         });
    //     });
    //     return pipeline;
    // }

    retrievePackageInfo(p: Package): Promise<PackageInfo> {
        const route = `https://api.github.com/repos/${p.githubOwner}/${p.githubRepo}/releases`;
        return this.http.get<GithubRelease[]>(route).toPromise()        
            .then((rel: GithubRelease[]) => {
                const lastRelease = rel.find(x => this.isCandidate(x, p));
                const asset = lastRelease.assets.find(y => y.name === p.assetName);
                
                const res = new PackageInfo(lastRelease.tag_name, asset.browser_download_url);
                return res;
            });
    }

    private isCandidate(rel: GithubRelease, p: Package): boolean {
        return  rel.draft === false 
                && rel.prerelease === false
                && rel.assets.findIndex(y => y.name === p.assetName) !== -1;
    }
}

class PackageInfo {
    constructor(
        public availableVersion: string,
        public downloadUrl: string) { };
}

interface GithubRelease {
    tag_name: string;
    target_commitish: string;
    draft: boolean;
    prerelease: boolean;
    assets: GithubAsset[];
}

interface GithubAsset {
    name: string;
    browser_download_url: string;
}
