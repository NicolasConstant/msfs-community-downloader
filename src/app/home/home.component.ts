import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { faSyncAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';

import { Package } from '../core/services/packages.service';
import { DomainService } from '../core/services/domain.service';
import { SettingsService } from '../core/services/settings.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    faSyncAlt = faSyncAlt;
    faPlusSquare = faPlusSquare;
    faTasks = faTasks;

    packages: Package[] = [];
    selectedPackage: Package;
    isGithubRateLimited: boolean;

    hasError: boolean;
    errorMessage: string;

    private errorSub: Subscription;

    constructor(
        private app: ApplicationRef,
        private settingsService: SettingsService,
        private router: Router,
        private domainService: DomainService) {

        this.errorSub = this.domainService.errorSubject.subscribe(err => {
            this.displayError(err);
        });
    }

    ngOnInit(): void {
        this.packages = this.domainService.getPackages();

        const removedPackageIds = this.settingsService.getSettings().removedPackageIds;

        const removedPackages = this.packages.filter(x => removedPackageIds.includes(x.id));
        for (const rp of removedPackages) {
            rp.isSelected = false;
        }
        this.packages = this.packages.filter(x => !removedPackageIds.includes(x.id));

        if (this.packages.length > 0) {
            let selected = this.packages.find(x => x.isSelected);

            if (!selected) {
                selected = this.packages[0];
                selected.isSelected = true;
            }

            this.selectedPackage = selected;
            this.domainService.analysePackages(this.packages)
                .catch((err: HttpErrorResponse) => {
                    this.analyseHttpError(err);
                });
        }
    }

    ngOnDestroy(): void {
        if (this.errorSub) this.errorSub.unsubscribe();
    }

    selectPackage(p: Package): boolean {
        this.packages.forEach(p => {
            p.isSelected = false;
        });

        const selected = this.packages.find(x => x.id === p.id);
        selected.isSelected = true;
        this.selectedPackage = selected;

        return false;
    }

    refresh(): boolean {
        this.isGithubRateLimited = false;
        this.domainService.analysePackages(this.packages)
            .catch((err: HttpErrorResponse) => {
                this.analyseHttpError(err);
            });
        return false;
    }

    removePackage(p: Package): void {
        this.packages = this.packages.filter(x => x.id !== p.id);

        if (this.packages.length > 0) {
            this.packages[0].isSelected = true;
            this.selectedPackage = this.packages[0];
        }
    }

    private analyseHttpError(err: HttpErrorResponse) {
        this.isGithubRateLimited = err.error.message.includes('API rate limit exceeded');
        if (this.isGithubRateLimited) {
            console.warn(`API rate limit exceeded`);
        }
    }

    displayError(err: string): void {
        if (err) {
            this.hasError = true;
            this.errorMessage = err;
            this.app.tick();

            setTimeout(() => {
                this.hasError = false;
                this.errorMessage = null;
                this.app.tick();
            }, 10 * 1000);
        }
    }
}
