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
            })
            .catch(err => {

            });
    }

}
