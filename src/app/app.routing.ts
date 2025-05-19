import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
  {
    path: "departments",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/departments/departments.module").then(
            (m) => m.DepartmentsModule
          ),
      },
    ],
  },
  {
    path: "procedures",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/procedures/procedures.module").then(
            (m) => m.ProceduresModule
          ),
      },
    ],
  },
  {
    path: "insurances",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/insurances/insurances.module").then(
            (m) => m.InsurancesModule
          ),
      },
    ],
  },
  {
    path: "specialties",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/specialties/specialties.module").then(
            (m) => m.SpecialtiesModule
          ),
      },
    ],
  },
  {
    path: "services-types",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/services-types/services-types.module").then(
            (m) => m.ServicesTypesModule
          ),
      },
    ],
  },
  {
    path: "municipalities",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/municipalities/municipalities.module").then(
            (m) => m.MunicipalitiesModule
          ),
      },
    ],
  },
  {
    path: "works",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/works/works.module").then((m) => m.WorksModule),
      },
    ],
  },
  {
    path: "users",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/users/users.module").then((m) => m.UsersModule),
      },
    ],
  },
  {
    path: "invoices",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/invoices/invoices.module").then(
            (m) => m.InvoicesModule
          ),
      },
    ],
  },
  {
    path: "governors",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/governors/governors.module").then(
            (m) => m.GovernorsModule
          ),
      },
    ],
  },
  {
    path: "machines",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/machines/machines.module").then(
            (m) => m.MachinesModule
          ),
      },
    ],
  },
  {
    path: "services",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/services/services.module").then(
            (m) => m.ServicesModule
          ),
      },
    ],
  },
  {
    path: "combos",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/combos/combos.module").then(
            (m) => m.CombosModule
          ),
      },
    ],
  },
  {
    path: "maintenances",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/maintenances/maintenances.module").then(
            (m) => m.MaintenancesModule
          ),
      },
    ],
  },
  {
    path: "fees",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/fees/fees.module").then((m) => m.FeesModule),
      },
    ],
  },
  {
    path: "shifts",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/shifts/shifts.module").then(
            (m) => m.ShiftsModule
          ),
      },
    ],
  },
  {
    path: "novelties",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/novelties/novelties.module").then(
            (m) => m.NoveltiesModule
          ),
      },
    ],
  },
  {
    path: "operator-specialties",
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "src/app/pages/operator-specialties/operator-specialties.module"
          ).then((m) => m.OperatorSpecialtiesModule),
      },
    ],
  },
  {
    path: "chats",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/chats/chats.module").then((m) => m.ChatsModule),
      },
    ],
  },
  {
    path: "operators",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/operators/operators.module").then(
            (m) => m.OperatorsModule
          ),
      },
    ],
  },
  {
    path: "gps",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/gps/gps.module").then((m) => m.GpsModule),
      },
    ],
  },
  {
    path: "policies",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/policies/policies.module").then(
            (m) => m.PoliciesModule
          ),
      },
    ],
  },
  {
    path: "messages",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/messages/messages.module").then(
            (m) => m.MessagesModule
          ),
      },
    ],
  },
  {
    path: "evidences",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/evidences/evidences.module").then(
            (m) => m.EvidencesModule
          ),
      },
    ],
  },
  {
    path: "machine-specialties",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/machine-specialties/machine-specialties.module").then(
            (m) => m.MachineSpecialtiesModule
          ),
      },
    ],
  },
  {
    path: "spares",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/spares/spares.module").then(
            (m) => m.SparesModule
          ),
      },
    ],
  },
  {
    path: "spare-procedures",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/spare-procedures/spare-procedures.module").then(
            (m) => m.SpareProceduresModule
          ),
      },
    ],
  },
  {
    path: "maintenance-procedures",
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "src/app/pages/maintenance-procedures/maintenance-procedures.module"
          ).then((m) => m.MaintenanceProceduresModule),
      },
    ],
  },
  {
    path: "combos-machines",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/combos-machines/combos-machines.module").then(
            (m) => m.CombosMachinesModule
          ),
      },
    ],
  },
  {
    path: "work-municipalities",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/works-municipalities/works-municipalities.module").then(
            (m) => m.WorksMunicipalitiesModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
