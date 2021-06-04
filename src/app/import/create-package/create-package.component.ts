import { Component, OnInit } from '@angular/core';
import { Package } from '../../core/services/packages.service';
import { DomainService } from '../../core/services/domain.service';
import { SettingsService } from '../../core/services/settings.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-package',
    templateUrl: './create-package.component.html',
    styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent implements OnInit {

    error: boolean;
    errorMessage: string;
    package: Package;

    constructor(
        private router: Router,
        private domainService: DomainService,
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.package = new Package();
    }

    async save() {
        this.error = false;
        console.warn(this.package);
        const currentPackages = await this.domainService.getPackages();

        if(currentPackages.find(x => x.id === this.package.id)){
            this.error = true;
            this.errorMessage = "A package has already this ID";
            return false;
        }

        if(currentPackages.find(x => x.folderName === this.package.folderName)){
            this.error = true;
            this.errorMessage = "A package has already this Folder Name";
            return false;
        }       

        this.domainService.addCustomPackage(this.package);
        this.router.navigate(['/']);
        return false;
    }
}
