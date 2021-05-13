import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PackagesService {
    constructor() { }

    getPackages(): Promise<Package[]> {
        const aa =  new Package();
        aa.id = "aa-liv";
        aa.name = "Azgharie Airlines";
        aa.description = "Azgharie Airlines Liveries";
        aa.githubOwner = "dites33";
        aa.githubRepo = "aa";
        aa.illustration = "assets/illustrations/aa.jpg";
        aa.folderName = "AA";
        aa.state = InstallStatusEnum.unknown;

        const test = new Package();
        test.id = "aa-liv-test";
        test.name = "Test Livs";
        test.description = "TEST Liveries";
        test.githubOwner = "nicolasconstant";
        test.githubRepo = "test-msfs-package";
        test.illustration = "assets/illustrations/aa.jpg";
        test.folderName = "AATEST";
        test.assetName = "release.zip";
        test.state = InstallStatusEnum.unknown; 
        
        return Promise.resolve([aa, test]);

        //     new Package();
        //         "aa-liv",
        //         "AA Liveries",
        //         "Azghar Airline Liveries",
        //         InstallStatusEnum.installed,
        //         null,
        //         "1.0.0",
        //         "dites33",
        //         "aa",
        //         null,
        //         "url",
        //         "assets/illustrations/aa.jpg",
        //         true
        //     ),
        //     new Package(
        //         "wt-cj4",
        //         "WT CJ4",
        //         "Working Title CJ4",
        //         InstallStatusEnum.notFound,
        //         null,
        //         "1.0.0",
        //         "url",
        //         "assets/illustrations/aa.jpg",
        //         false
        //     ),
        //     new Package(
        //         "aa-liv-3",
        //         "AA Liveries",
        //         "Azghar Airline Liveries",
        //         InstallStatusEnum.updateAvailable,
        //         null,
        //         "1.0.0",
        //         "url",
        //         "assets/illustrations/aa.jpg",
        //         false
        //     )

        // ]);
    }
}

export class Package {
    public id: string;
    public name: string;
    public description: string;
    public state: InstallStatusEnum;
    public localVersion: string;
    public availableVersion: string;

    public githubOwner: string;
    public githubRepo: string;
    public assetName: string;
    public folderName: string;
    public assetDownloadUrl: string;

    public url: string;
    public illustration: string;
    public isSelected: boolean;
    tempWorkingDir: string;
}

export enum InstallStatusEnum {
    unknown = 0,
    installed = 1,
    updateAvailable = 2,
    error = 3,
    notFound = 4,
    downloading = 5,
    extracting = 6,
    installing = 7
}