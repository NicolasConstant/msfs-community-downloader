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

        const wtg3x = new Package();
        wtg3x.id = "wt-g3x";
        wtg3x.name = "WT G3X";
        wtg3x.description = "Working Title G3X Touch";
        wtg3x.githubOwner = "Working-Title-MSFS-Mods";
        wtg3x.githubRepo = "fspackages";
        wtg3x.illustration = "assets/illustrations/g3x.jpg";
        wtg3x.folderName = "workingtitle-gx";
        wtg3x.assetName = "workingtitle-gx-v";
        wtg3x.versionPatternToRemove = "gx-";
        wtg3x.state = InstallStatusEnum.unknown;
        wtg3x.summary = "This is an early release of what is intended to eventually be the reworking of several of the smaller Garmin units in the game.<br/><br/>At the moment the only thing that has been updated is the G3X Touch, but future modifications to the non-touch G3X, and to the touch-based Aera which uses much of the same code, are possible.";
        wtg3x.webpageUrl = "https://www.workingtitle.aero/packages/g3x/";
        wtg3x.isPrerelease = true;

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

        const b787xe = new Package();
        b787xe.id = "b787xe";
        b787xe.name = "HD B78XH";
        b787xe.description = "Heavy Division B78XH";
        b787xe.githubOwner = "Heavy-Division";
        b787xe.githubRepo = "B78XH";
        b787xe.illustration = "assets/illustrations/b787xe.jpg";
        b787xe.folderName = "B78XH";
        b787xe.oldFolderNames = ["B787-XE"];
        // b787xe.assetName = "A32NX-stable.zip";
        b787xe.state = InstallStatusEnum.unknown;
        b787xe.summary = "B78XH is an open source and free modification of default Boeing 787-10 in Microsoft Flight Simulator.";

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
     
        const tfg36p = new Package();
        tfg36p.id = "tfg36";
        tfg36p.name = "TF G36";
        tfg36p.description = "TheFrett G36 Project";
        tfg36p.githubOwner = "TheFrett";
        tfg36p.githubRepo = "msfs_g36_project";
        tfg36p.illustration = "assets/illustrations/tfg36.jpg";
        tfg36p.folderName = "z-bonanza-g36-improvement-project";
        tfg36p.assetName = "z-bonanza-g36-improvement-project.zip";
        tfg36p.state = InstallStatusEnum.unknown; 
        tfg36p.summary = "This is the improvement project for the MSFS default G36. It all started as a simple edit of some configuration files but it has since grown into a fully-fledged modification that improves all aspects of the default G36 and introduces new features.<br/><br/>This was made possible with the help of the community consisting of both enthusiasts and G36 pilots.";

        const jplc152 = new Package();
        jplc152.id = "jplc152";
        jplc152.name = "JPL C152";
        jplc152.description = "JPLogistics C152";
        jplc152.githubOwner = "JPLogistics";
        jplc152.githubRepo = "JPLogistics_C152";
        jplc152.illustration = "assets/illustrations/jplc152.jpg";
        jplc152.folderName = "jplogistics-c152";
        jplc152.assetName = "jplogistics-c152-";
        jplc152.state = InstallStatusEnum.unknown; 
        jplc152.summary = "A MSFS Addon to improve the Cessna C152 ";
        
        return Promise.resolve([wtcj4, wtg1000, wtg3000, wtg3x, a32nx, b787xe, salty747, aa, tfg36p, jplc152]);

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
    public isPrerelease: boolean;
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
    public oldFolderNames: string[]; 
}

export enum InstallStatusEnum {
    unknown = 0,
    installed = 1,
    updateAvailable = 2,
    error = 3,
    notFound = 4,
    downloading = 5,
    extracting = 6,
    installing = 7,
    untrackedPackageFound = 8
}