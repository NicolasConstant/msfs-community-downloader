import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';


import { HomeRoutingModule } from './home/home-routing.module';
import { ListEditorRoutingModule } from './list-editor/list-editor-routing.module';
import { SettingsRoutingModule } from './settings/settings-routing.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },  
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
        HomeRoutingModule,
        ListEditorRoutingModule,
        SettingsRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
