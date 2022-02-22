import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Package, ReleaseTypeEnum } from '../../core/services/packages.service';
import { DomainService } from '../../core/services/domain.service';

@Component({
    selector: 'app-create-package',
    templateUrl: './create-package.component.html',
    styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent implements OnInit, OnDestroy {

    error: boolean;
    errorMessage: string;
    package: Package;

    isEditing: boolean;

    sub: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private domainService: DomainService
    ) { }
   
    ngOnInit(): void {
        this.sub = this.activatedRoute.params.subscribe(params => {
            const id = params['id'];

            this.package = new Package();

            if(id){
                this.isEditing = true;
                
                const p = this.domainService.getPackages().find(x => x.id === id);
                this.package.id = p.id;
                this.package.name = p.name;
                this.package.description = p.description;
                this.package.summary = p.summary;
                this.package.githubOwner = p.githubOwner;
                this.package.githubRepo = p.githubRepo;
                this.package.assetName = p.assetName;
                this.package.isPrerelease = p.isPrerelease;
                this.package.folderName = p.folderName;
                this.package.illustration = p.illustration;
                this.package.webpageUrl = p.webpageUrl;
                this.package.versionPatternToRemove = p.versionPatternToRemove;
                this.package.minSoftwareVersion = p.minSoftwareVersion;
                this.package.releaseType = p.releaseType;
                this.package.branchName = p.branchName;
                this.package.releaseBranchTag = p.releaseBranchTag;
            } else {
                this.isEditing = false;               
            }
        });        
    }

    ngOnDestroy(): void {
        if(this.sub) this.sub.unsubscribe();
    }

    save(): boolean {
        this.error = false;
        
        const currentPackages = this.domainService.getPackages();

        if (!this.isEditing && currentPackages.find(x => x.id === this.package.id)) {
            this.error = true;
            this.errorMessage = "A package has already this ID";
            return false;
        }

        if (!this.isEditing && currentPackages.find(x => x.folderName === this.package.folderName)) {
            this.error = true;
            this.errorMessage = "A package has already this Folder Name";
            return false;
        }

        if(this.isEditing){
            this.domainService.updateCustomPackage(this.package);
        } else {
            this.domainService.addCustomPackage(this.package);
        }       

        this.router.navigate(['/']);
        return false;
    }

    onReleaseTypeChange(type: ReleaseTypeEnum): boolean {
        this.package.releaseType = type;
        return false;
    }
}
