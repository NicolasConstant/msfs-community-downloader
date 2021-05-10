import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackagesService, Package } from '../core/services/packages.service';
import { UpdaterService } from '../core/services/updater.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    packages: Package[] = [];
    selectedPackage: Package;

    constructor(
        private router: Router,
        private packagesService: PackagesService,
        private updaterService: UpdaterService) { }

    ngOnInit(): void {
        this.packagesService.getPackages()
            .then((packages: Package[]) => {
                this.packages = [];
                packages.forEach(p => {
                    this.packages.push(p);
                });

                if(this.packages.length > 0){
                    const selected = this.packages[0];
                    selected.isSelected = true;
                    this.selectedPackage = selected;

                    this.updaterService.analysePackages(this.packages);
                }
            })      
            .catch(err => {

            });
    }

    selectPackage(p: Package): boolean{
        this.packages.forEach(p => {
            p.isSelected = false;
        });

        const selected = this.packages.find(x => x.id === p.id);
        selected.isSelected = true;
        this.selectedPackage = selected;

        return false;

    }

}
