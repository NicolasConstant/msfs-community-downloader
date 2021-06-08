import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ElectronService } from '../../core/services/electron/electron.service';
import { ExportablePackage } from '../export-package/export-package.component';
import { DomainService } from '../../core/services/domain.service';
import { Package } from '../../core/services/packages.service';

@Component({
    selector: 'app-import-package',
    templateUrl: './import-package.component.html',
    styleUrls: ['./import-package.component.scss']
})
export class ImportPackageComponent implements OnInit, OnDestroy {
    faTimes = faTimes;

    isJsonImport = false;
    sub: Subscription;

    json: string;
    loadedPackage: ExportablePackage;

    hasError: boolean;
    errorMessage: string;

    constructor(
        private domainService: DomainService,
        private router: Router,
        private electronService: ElectronService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.sub = this.activatedRoute.params.subscribe(params => {
            const type = params['type'];
            if (!type || type === 'json') {
                this.isJsonImport = true;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.sub) this.sub.unsubscribe();
    }

    importJson(): boolean {
        this.loadJson(this.json);
        return false;
    }

    importFile(): boolean {
        const res = this.electronService.remote.dialog.showOpenDialogSync(
            {
                title: 'Select the package file',
                filters: [{ name: 'Json', extensions: ['json'] }],
                properties: ['openFile']
            });

        if (res && res.length > 0) {
            const path = res[0];
            const jsonData = this.electronService.fs.readFileSync(path, 'utf-8');
            this.loadJson(jsonData);
        }

        return false;
    }

    private loadJson(json: string): void {
        this.hasError = false;
        this.errorMessage = null;

        if (!json) return;

        let newPackage: ExportablePackage;

        try {
            newPackage = <ExportablePackage>JSON.parse(json);
        } catch (err) {
            console.error(err);
            this.hasError = true;
            this.errorMessage = `Invalid JSON, the parsing has failed`;
            return;
        }

        const currentPackages = this.domainService.getPackages();
        const sameIdPackage = currentPackages.find(x => x.id === newPackage.id);
        if (sameIdPackage) {
            this.hasError = true;
            this.errorMessage = `Can't import the package: it has the same ID than ${sameIdPackage.name}`;
            return;
        }

        const sameFolderPackage = currentPackages.find(x => x.folderName === newPackage.folderName);
        if (sameFolderPackage) {
            this.hasError = true;
            this.errorMessage = `Can't import the package: it use the same Folder than ${sameFolderPackage.name}`;
            return;
        }

        this.loadedPackage = newPackage;
    }

    cancel(): boolean {
        this.loadedPackage = null;
        return false;
    }

    validate(): boolean {
        const p = new Package();
        p.id = this.loadedPackage.id;
        p.name = this.loadedPackage.name;
        p.description = this.loadedPackage.description;
        p.githubOwner = this.loadedPackage.githubOwner;
        p.githubRepo = this.loadedPackage.githubRepo;
        p.assetName = this.loadedPackage.assetName;
        p.isPrerelease = this.loadedPackage.isPrerelease;
        p.versionPatternToRemove = this.loadedPackage.versionPatternToRemove;
        p.folderName = this.loadedPackage.folderName;
        p.illustration = this.loadedPackage.illustration;
        p.summary = this.loadedPackage.summary;
        p.webpageUrl = this.loadedPackage.webpageUrl;
        p.oldFolderNames = this.loadedPackage.oldFolderNames;

        this.domainService.addCustomPackage(p);
        this.router.navigate(['/']);
        return false;
    }
}
