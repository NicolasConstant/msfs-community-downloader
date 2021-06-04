import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { ImportRoutingModule } from './import-routing.module';

import { AddPackageComponent } from './add-package.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { ImportPackageComponent } from './import-package/import-package.component';
import { ExportPackageComponent } from './export-package/export-package.component';

@NgModule({
    declarations: [AddPackageComponent, CreatePackageComponent, ImportPackageComponent, ExportPackageComponent],
    imports: [CommonModule, SharedModule, ImportRoutingModule, FontAwesomeModule]
  })
  export class ImportModule {}
  