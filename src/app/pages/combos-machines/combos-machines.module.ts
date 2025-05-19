import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CombosMachinesRoutingModule } from './combos-machines-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from '../maintenances/list/list.component';
import { ManageComponent } from '../maintenances/manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CombosMachinesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CombosMachinesModule { }
