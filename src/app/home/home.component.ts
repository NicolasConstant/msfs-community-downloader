import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackagesService, Package } from '../core/services/packages.service';

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
        private packagesService: PackagesService) { }

    ngOnInit(): void {
        this.packagesService.getPackages()
            .then((packages: Package[]) => {
                this.packages = [];
                packages.forEach(p => {
                    this.packages.push(p);
                });

                this.selectedPackage =  this.packages.find(x => x.isSelected === true);
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
