import { Injectable } from '@angular/core';
import { StringLiteral } from 'typescript';

@Injectable({
    providedIn: 'root'
})
export class PackagesService {
    constructor() { }

    getPackages(): Promise<Package[]> {
        var aa =  new Package();
        aa.id = "aa-liv";
        aa.name = "AA Liveries";
        aa.description = "Azghar Airline Liveries";
        aa.githubOwner = "dites33";
        aa.githubRepo = "aa";
        aa.illustration = "assets/illustrations/aa.jpg";
        aa.assetName = "AA";
        aa.state = InstallStatusEnum.unknown;
        
        return Promise.resolve([aa]);

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

    public url: string;
    public illustration: string;
    public isSelected: boolean;
}

export enum InstallStatusEnum {
    unknown = 0,
    installed = 1,
    updateAvailable = 2,
    error = 3,    
    notFound = 4
}