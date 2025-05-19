import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorSpecialtiesRoutingModule } from './operator-specialties-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    OperatorSpecialtiesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OperatorSpecialtiesModule { }
