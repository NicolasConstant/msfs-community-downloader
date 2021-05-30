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
        wtcj4.versionPatternToRemove = "cj4-";
        wtcj4.state = InstallStatusEnum.unknown;
        wtcj4.summary = "OPEN BETA<br/>Performance and avionics improvements for the Citation CJ4";
        wtcj4.webpageUrl = "https://www.workingtitle.aero/packages/cj4/";

        const wtg1000 = new Package();
        wtg1000.id = "wt-g1000";
        wtg1000.name = "WT G1000";
        wtg1000.description = "Working Title G1000";
        wtg1000.githubOwner = "Working-Title-MSFS-Mods";
        wtg1000.githubRepo = "fspackages";
        wtg1000.illustration = "assets/illustrations/g1000.jpg";
        wtg1000.folderName = "workingtitle-g1000";
        wtg1000.assetName = "workingtitle-g1000-v";
        wtg1000.versionPatternToRemove = "g1000-";
        wtg1000.state = InstallStatusEnum.unknown;
        wtg1000.summary = "Fixes and enhancements for the stock G1000 avionics package";
        wtg1000.webpageUrl = "https://www.workingtitle.aero/packages/g1000/";

        const wtg3000 = new Package();
        wtg3000.id = "wt-g3000";
        wtg3000.name = "WT G3000";
        wtg3000.description = "Working Title G3000";
        wtg3000.githubOwner = "Working-Title-MSFS-Mods";
        wtg3000.githubRepo = "fspackages";
        wtg3000.illustration = "assets/illustrations/g3000.jpg";
        wtg3000.folderName = "workingtitle-g3000";
        wtg3000.assetName = "workingtitle-g3000-v";
        wtg3000.versionPatternToRemove = "g3000-";
        wtg3000.state = InstallStatusEnum.unknown;
        wtg3000.summary = "Fixes and enhancements for the stock G3000 avionics package";
        wtg3000.webpageUrl = "https://www.workingtitle.aero/packages/g3000/";

        const a32nx = new Package();
        a32nx.id = "a32nx";
        a32nx.name = "FBW A32NX";
        a32nx.description = "flybywire A32NX (stable)";
        a32nx.githubOwner = "flybywiresim";
        a32nx.githubRepo = "a32nx";
        a32nx.illustration = "assets/illustrations/a32nx.jpg";
        a32nx.folderName = "flybywire-aircraft-a320-neo";
        a32nx.assetName = "A32NX-stable.zip";
        a32nx.state = InstallStatusEnum.unknown;
        a32nx.summary = "The A32NX Project is a community-driven open source project to create a free Airbus A320neo in Microsoft Flight Simulator that is as close to reality as possible.<br/><br/>The following aircraft configuration is currently simulated:<br/><br/>Model&emsp;&emsp;A320-251N<br/>Engine&emsp;&emsp;CFM LEAP 1A-26<br/>FMGS&emsp;&emsp;Honeywell Pegasus II<br/>FWC Std.&emsp;&emsp;H2F9C<br/><br/>Please note that this configuration may change in the future as the A32NX project evolves and changes.";
        a32nx.webpageUrl = "https://flybywiresim.com/";

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

        const b787xe = new Package();
        b787xe.id = "b787xe";
        b787xe.name = "B787-XE";
        b787xe.description = "Boeing 787-XE";
        b787xe.githubOwner = "lmk02";
        b787xe.githubRepo = "B787-XE";
        b787xe.illustration = "assets/illustrations/b787xe.jpg";
        b787xe.folderName = "B787-XE";
        // b787xe.assetName = "A32NX-stable.zip";
        b787xe.state = InstallStatusEnum.unknown;
        b787xe.summary = "We have just started working on a mod for the Boeing 787-10. There is a lot of effort going into this mod. We are currently working on implementing all MFS Pages and improving the FMC.<br/><br/>There is a lot more to come.<br/>We can't wait to improve the 787-10.";

        const salty747 = new Package();
        salty747.id = "salty747";
        salty747.name = "Salty 747";
        salty747.description = "Salty Simulations 747-8";
        salty747.githubOwner = "saltysimulations";
        salty747.githubRepo = "salty-747";
        salty747.illustration = "assets/illustrations/salty747.jpg";
        salty747.folderName = "salty-747";
        salty747.assetName = "salty-747.zip";
        salty747.state = InstallStatusEnum.unknown;
        salty747.summary = "The Salty Simulations 747 is an open-source modification for the default Asobo 747-8 included in Microsoft Flight Simulator.<br/><br/>We are dedicated to improving the default 747-8 to a level where it is enjoyable and realistic to fly.";

        const aa =  new Package();
        aa.id = "aa-liv";
        aa.name = "Azgharie Airlines";
        aa.description = "Azgharie Airlines Liveries";
        aa.githubOwner = "dites33";
        aa.githubRepo = "aa";
        aa.illustration = "assets/illustrations/aa.jpg";
        aa.folderName = "AA";
        aa.state = InstallStatusEnum.unknown;
        aa.summary = "Liveries of Azgharie Airlines";
        aa.webpageUrl = "https://www.azgharie.net";
     
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
        
        return Promise.resolve([wtcj4, wtg1000, wtg3000, a32nx, b787xe, salty747, aa]);

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
    public publishedAt: Date;

    public githubOwner: string;
    public githubRepo: string;
    public assetName: string;
    public versionPatternToRemove: string;
    public folderName: string;
    public assetDownloadUrl: string;

    public url: string;
    public illustration: string;
    public isSelected: boolean;
    public tempWorkingDir: string;
    public downloaded: number;

    public summary: string;
    public webpageUrl: string;
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