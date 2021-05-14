import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PackagesService {
    constructor() { }

    getPackages(): Promise<Package[]> {
        const wtcj4 = new Package();
        wtcj4.id = "wt-cj4";
        wtcj4.name = "WT CJ4";
        wtcj4.description = "Working Title CJ4";
        wtcj4.githubOwner = "Working-Title-MSFS-Mods";
        wtcj4.githubRepo = "fspackages";
        wtcj4.illustration = "assets/illustrations/wt-cj4.jpg";
        wtcj4.folderName = "workingtitle-aircraft-cj4";
        wtcj4.assetName = "workingtitle-cj4-v";
        wtcj4.state = InstallStatusEnum.unknown;

        const wtg1000 = new Package();
        wtg1000.id = "wt-g1000";
        wtg1000.name = "WT G1000";
        wtg1000.description = "Working Title G1000";
        wtg1000.githubOwner = "Working-Title-MSFS-Mods";
        wtg1000.githubRepo = "fspackages";
        wtg1000.illustration = "assets/illustrations/aa.jpg";
        wtg1000.folderName = "workingtitle-g1000";
        wtg1000.assetName = "workingtitle-g1000-v";
        wtg1000.state = InstallStatusEnum.unknown;

        const wtg3000 = new Package();
        wtg3000.id = "wt-g3000";
        wtg3000.name = "WT G3000";
        wtg3000.description = "Working Title G3000";
        wtg3000.githubOwner = "Working-Title-MSFS-Mods";
        wtg3000.githubRepo = "fspackages";
        wtg3000.illustration = "assets/illustrations/aa.jpg";
        wtg3000.folderName = "workingtitle-g3000";
        wtg3000.assetName = "workingtitle-g3000-v";
        wtg3000.state = InstallStatusEnum.unknown;

        const a32nx = new Package();
        a32nx.id = "a32nx";
        a32nx.name = "FBW A32NX";
        a32nx.description = "flybywire A32NX";
        a32nx.githubOwner = "flybywiresim";
        a32nx.githubRepo = "a32nx";
        a32nx.illustration = "assets/illustrations/aa.jpg";
        a32nx.folderName = "flybywire-aircraft-a320-neo";
        a32nx.assetName = "A32NX-stable.zip";
        a32nx.state = InstallStatusEnum.unknown;

        // const wtg3x = new Package();
        // wtg3x.id = "wt-g3x";
        // wtg3x.name = "WT G3X";
        // wtg3x.description = "Working Title G3X Touch";
        // wtg3x.githubOwner = "Working-Title-MSFS-Mods";
        // wtg3x.githubRepo = "fspackages";
        // wtg3x.illustration = "assets/illustrations/aa.jpg";
        // wtg3x.folderName = "workingtitle-g3000";
        // wtg3x.assetName = "workingtitle-g3000-v";
        // wtg3x.state = InstallStatusEnum.unknown;

        const aa =  new Package();
        aa.id = "aa-liv";
        aa.name = "Azgharie Airlines";
        aa.description = "Azgharie Airlines Liveries";
        aa.githubOwner = "dites33";
        aa.githubRepo = "aa";
        aa.illustration = "assets/illustrations/aa.jpg";
        aa.folderName = "AA";
        aa.state = InstallStatusEnum.unknown;
     
        // const test = new Package();
        // test.id = "aa-liv-test";
        // test.name = "Test Livs";
        // test.description = "TEST Liveries";
        // test.githubOwner = "nicolasconstant";
        // test.githubRepo = "test-msfs-package";
        // test.illustration = "assets/illustrations/aa.jpg";
        // test.folderName = "AATEST";
        // test.assetName = "release.zip";
        // test.state = InstallStatusEnum.unknown; 
        
        return Promise.resolve([wtcj4, wtg1000, wtg3000, a32nx, aa]);

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
    downloaded: InstallStatusEnum;
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