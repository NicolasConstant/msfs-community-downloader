import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { PackageMiniComponent } from './package-mini/package-mini.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, PackageMiniComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
