import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { PackageMiniComponent } from './package-mini/package-mini.component';
import { SharedModule } from '../shared/shared.module';
import { PackageDetailedComponent } from './package-detailed/package-detailed.component';

@NgModule({
    declarations: [HomeComponent, PackageMiniComponent, PackageDetailedComponent],
    imports: [CommonModule, SharedModule, HomeRoutingModule, FontAwesomeModule]
})
export class HomeModule { }
