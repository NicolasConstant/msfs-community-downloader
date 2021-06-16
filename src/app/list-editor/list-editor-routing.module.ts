import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ListEditorComponent } from './list-editor.component';

const routes: Routes = [
    {
        path: 'list-editor',
        component: ListEditorComponent
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListEditorRoutingModule { }
