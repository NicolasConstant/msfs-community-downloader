import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Package } from './packages.service';

@Injectable({
    providedIn: 'root'
})
export class GithubService {

    constructor(private http: HttpClient) { }

    retrieveBranchInfo(p: Package): Promise<BranchInfo> {
        const route = `https://api.github.com/repos/${p.githubOwner}/${p.githubRepo}/branches/${p.branchName}`;
        return this.http.get<GithubBranch>(route).toPromise()
            .then(res => {
                if(!res) return null;

                const hashVersion = res.commit.sha.substring(0,7);
                const downloadUrl = `http://github.com/${p.githubOwner}/${p.githubRepo}/archive/${p.branchName}.zip`;

                const result = new BranchInfo(res.commit.sha, hashVersion, res.commit.commit.committer.date, downloadUrl);
                return result;
            });
    }

    retrievePackageInfo(p: Package): Promise<PackageInfo> {
        const route = `https://api.github.com/repos/${p.githubOwner}/${p.githubRepo}/releases?per_page=100`;
        return this.http.get<GithubRelease[]>(route).toPromise()        
            .then((rel: GithubRelease[]) => {
                const lastRelease = rel
                    .sort((a, b) => {
                        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
                    })
                    .find(x => this.isCandidate(x, p));

                if(!lastRelease) return null;
                
                return this.buildPackageInfo(lastRelease, p);
            });
    }

    retrievePackageInfoFromUniqueTag(p: Package): Promise<PackageInfo> {
        const route = `https://api.github.com/repos/${p.githubOwner}/${p.githubRepo}/releases/tags/${p.releaseBranchTag}`;
        return this.http.get<GithubRelease>(route).toPromise()        
            .then((rel: GithubRelease) => {
                const lastRelease = rel;

                if(!lastRelease) return null;

                return this.buildPackageInfo(lastRelease, p);
            });
    }

    private buildPackageInfo(lastRelease: GithubRelease, p: Package): PackageInfo{
        const asset = lastRelease.assets.find(y => y.name.includes(p.assetName));

        let publishedAt = lastRelease.published_at;
        let downloadUrl = lastRelease.zipball_url;
        let fileSize: number = null;
        if (asset) {
            publishedAt = asset.updated_at;
            downloadUrl = asset.browser_download_url;
            fileSize = asset.size;
        }

        const res = new PackageInfo(lastRelease.tag_name, downloadUrl, publishedAt, lastRelease.html_url, fileSize);
        return res;
    }

    private isCandidate(rel: GithubRelease, p: Package): boolean {
        let keepPrerelease = false;
        if(p.isPrerelease) {
            keepPrerelease = true;
        }

        return  rel.draft === false 
                && rel.prerelease === keepPrerelease
                && (!p.assetName || rel.assets.findIndex(y => y.name.includes(p.assetName)) !== -1);
    }
}

export class BranchInfo {
    
    constructor(
        public hash: string,
        public hashVersion: string,
        public publishedAt: Date,
        public downloadUrl: string
    ){}
}

interface GithubAuthor {
    name: string,
    email: string,
    date: Date
}

interface Commit {
    author: GithubAuthor,
    committer: GithubAuthor
}

interface GithubCommit {
    sha: string;
    commit: Commit;
}

interface GithubBranch {
    name: string;
    commit: GithubCommit;
}

export class PackageInfo {
    constructor(
        public availableVersion: string,
        public downloadUrl: string,
        public publishedAt: Date,
        public html_url: string,
        public fileSize: number) { }
}

interface GithubRelease {
    tag_name: string;
    target_commitish: string;
    draft: boolean;
    prerelease: boolean;
    assets: GithubAsset[];
    zipball_url: string;
    published_at: Date;
    html_url: string;
}

interface GithubAsset {
    name: string;
    browser_download_url: string;
    size: number;
    created_at: Date;
    updated_at: Date;
}
