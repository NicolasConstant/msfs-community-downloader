import { Component, OnInit, Input } from '@angular/core';
import { Package, InstallStatusEnum } from '../../core/services/packages.service';

@Component({
    selector: 'app-package-mini',
    templateUrl: './package-mini.component.html',
    styleUrls: ['./package-mini.component.scss']
})
export class PackageMiniComponent implements OnInit {
    @Input() package: Package;

    constructor() { }

    ngOnInit(): void {
    }

    getState(status: InstallStatusEnum): string {
        switch (status) {
            case InstallStatusEnum.installed:
                return "Installed";
            case InstallStatusEnum.notFound:
                return "Not Found";
            case InstallStatusEnum.updateAvailable:
                return "Update Available";
            case InstallStatusEnum.error:
                return "Error";
            case InstallStatusEnum.unknown:
                return "Unknown";
            case InstallStatusEnum.downloading:
                return "Downloading...";
            case InstallStatusEnum.extracting:
                return "Extracting...";
            case InstallStatusEnum.installing:
                return "Installing...";
        }
    }
}
