import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddPackageComponent } from './add-package.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { ImportPackageComponent } from './import-package/import-package.component';
import { ExportPackageComponent } from './export-package/export-package.component';
import { CommunityfolderGuard } from '../core/guards/communityfolder.guard';

const routes: Routes = [  
    {
        path: 'add-package',
        component: AddPackageComponent,
        canActivate: [CommunityfolderGuard]
    },
    {
        path: 'create-package',
        component: CreatePackageComponent,
        canActivate: [CommunityfolderGuard]
    },
    {
        path: 'create-package/:id',
        component: CreatePackageComponent,
        canActivate: [CommunityfolderGuard]
    },
    {
        path: 'import-package',
        component: ImportPackageComponent,
        canActivate: [CommunityfolderGuard]
    },
    {
        path: 'export-package/:id',
        component: ExportPackageComponent,
        canActivate: [CommunityfolderGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportRoutingModule { }
