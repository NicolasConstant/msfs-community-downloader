import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AddPackageComponent } from '../add-package/add-package.component';
import { CommunityfolderGuard } from '../core/guards/communityfolder.guard';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [CommunityfolderGuard]
    },
    {
        path: 'addpackage',
        component: AddPackageComponent,
        canActivate: [CommunityfolderGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
