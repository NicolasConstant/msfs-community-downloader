import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PackagesService {
    constructor() { }

    getPackages(): Promise<Package[]> {
        return Promise.resolve([
            new Package(
                "aa-liv",
                "AA Liveries",
                "Azghar Airline Liveries",
                InstallStatusEnum.installed,
                null,
                "1.0.0",
                "url",
                "assets/illustrations/aa.jpg",
                true
            ),
            new Package(
                "wt-cj4",
                "WT CJ4",
                "Working Title CJ4",
                InstallStatusEnum.notFound,
                null,
                "1.0.0",
                "url",
                "assets/illustrations/aa.jpg",
                false
            ),
            new Package(
                "aa-liv-3",
                "AA Liveries",
                "Azghar Airline Liveries",
                InstallStatusEnum.updateAvailable,
                null,
                "1.0.0",
                "url",
                "assets/illustrations/aa.jpg",
                false
            )

        ]);
    }
}

export class Package {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public state: InstallStatusEnum,
        public localVersion: string,
        public availableVersion: string,
        public url: string,
        public illustration: string,
        public isSelected: boolean) {
    }
}

export enum InstallStatusEnum {
    notFound = 0,
    installed = 1,
    updateAvailable = 2,
    error = 3
}