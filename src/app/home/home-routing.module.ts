import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CommunityfolderGuard } from '../core/guards/communityfolder.guard';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [CommunityfolderGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
