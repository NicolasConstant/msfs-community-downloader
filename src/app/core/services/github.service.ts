import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Package } from './packages.service';

@Injectable({
    providedIn: 'root'
})
export class GithubService {

    constructor(private http: HttpClient) { }

    retrievePackageInfo(p: Package): Promise<PackageInfo> {
        const route = `https://api.github.com/repos/${p.githubOwner}/${p.githubRepo}/releases`;
        return this.http.get<GithubRelease[]>(route).toPromise()        
            .then((rel: GithubRelease[]) => {
                const lastRelease = rel.find(x => this.isCandidate(x, p));
                const asset = lastRelease.assets.find(y => y.name.includes(p.assetName));
                
                let downloadUrl = lastRelease.zipball_url;
                if(asset){
                    downloadUrl = asset.browser_download_url;
                }

                const res = new PackageInfo(lastRelease.tag_name, downloadUrl);
                return res;
            });
    }

    private isCandidate(rel: GithubRelease, p: Package): boolean {
        return  rel.draft === false 
                && rel.prerelease === false
                && (!p.assetName || rel.assets.findIndex(y => y.name.includes(p.assetName)) !== -1);
    }
}

export class PackageInfo {
    constructor(
        public availableVersion: string,
        public downloadUrl: string) { }
}

interface GithubRelease {
    tag_name: string;
    target_commitish: string;
    draft: boolean;
    prerelease: boolean;
    assets: GithubAsset[];
    zipball_url: string;
}

interface GithubAsset {
    name: string;
    browser_download_url: string;
}
