import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "../gps/list/list.component";
import { ManageComponent } from "../gps/manage/manage.component";

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageComponent },
  { path: "update/:id", component: ManageComponent },
  { path: "view/:id", component: ManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GpsRoutingModule {}
