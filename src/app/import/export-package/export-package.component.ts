import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { DomainService } from '../../core/services/domain.service';
import { ElectronService } from '../../core/services/electron/electron.service';

@Component({
    selector: 'app-export-package',
    templateUrl: './export-package.component.html',
    styleUrls: ['./export-package.component.scss']
})
export class ExportPackageComponent implements OnInit, OnDestroy {
    faTimes = faTimes;

    sub: Subscription;

    exportablePackage: ExportablePackage;
    json: string;

    constructor(
        private electronService: ElectronService,
        private activatedRoute: ActivatedRoute,
        private domainService: DomainService
    ) { }

    ngOnInit(): void {
        this.sub = this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                const p = this.domainService.getPackages().find(x => x.id === id);
                this.exportablePackage = new ExportablePackage();

                this.exportablePackage.id = p.id;
                this.exportablePackage.name = p.name;
                this.exportablePackage.description = p.description;
                this.exportablePackage.githubOwner = p.githubOwner;
                this.exportablePackage.githubRepo = p.githubRepo;
                this.exportablePackage.assetName = p.assetName;
                this.exportablePackage.isPrerelease = p.isPrerelease;
                this.exportablePackage.versionPatternToRemove = p.versionPatternToRemove;
                this.exportablePackage.folderName = p.folderName;
                this.exportablePackage.illustration = p.illustration;
                this.exportablePackage.summary = p.summary;
                this.exportablePackage.webpageUrl = p.webpageUrl;
                this.exportablePackage.oldFolderNames = p.oldFolderNames;

                this.json = JSON.stringify(this.exportablePackage);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.sub) this.sub.unsubscribe();
    }

    saveFile(): boolean {
        const res = this.electronService.remote.dialog.showSaveDialogSync(
            {
                title: 'Select the export file',
                defaultPath: `${this.exportablePackage.folderName}.json`,
                filters: [{ name: 'Json', extensions: ['json'] }],

            });

        if (res) {
            this.electronService.fs.writeFileSync(res, this.json, 'utf-8');
        }
        return false;
    }
}

export class ExportablePackage {
    public id: string;
    public name: string;
    public description: string;
    public githubOwner: string;
    public githubRepo: string;
    public assetName: string;
    public isPrerelease: boolean;
    public versionPatternToRemove: string;
    public folderName: string;
    public illustration: string;
    public summary: string;
    public webpageUrl: string;
    public oldFolderNames: string[];
}
