import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ListEditorRoutingModule } from './list-editor-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ListEditorComponent } from './list-editor.component';
import { PackageEditionComponent } from './package-edition/package-edition.component';

@NgModule({
    declarations: [ListEditorComponent, PackageEditionComponent],
    imports: [CommonModule, SharedModule, ListEditorRoutingModule, FontAwesomeModule]
})
export class ListEditorModule { }
