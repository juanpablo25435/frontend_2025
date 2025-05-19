import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path: 'departments',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/departments/departments.module').then(m => m.DepartmentsModule)
          }
        ]
    },
    {
        path: 'procedures',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/procedures/procedures.module').then(m => m.ProceduresModule)
          }
        ]
    },
    {
      path: 'insurances',
      children: [
        {
          path: '',
          loadChildren: () => import('src/app/pages/insurances/insurances.module').then(m => m.InsurancesModule)
        }
      ]
    },
    {
      path: 'specialties',
      children: [
        {
          path: '',
          loadChildren: () => import('src/app/pages/specialties/specialties.module').then(m => m.SpecialtiesModule)
        }
      ]
    },
    {
      path: 'municipalities',
      children: [
        {
          path: '',
          loadChildren: () => import('src/app/pages/municipalities/municipalities.module').then(m => m.MunicipalitiesModule)
        }
      ]
    },
    {
      path: 'users',
      children: [
        {
          path: '',
          loadChildren: () => import('src/app/pages/users/users.module').then(m => m.UsersModule)
        }
      ]
    },
    {
      path: 'governors',
      children: [
        {
          path: '',
          loadChildren: () => import('src/app/pages/governors/governors.module').then(m => m.GovernorsModule)
        }
      ]
    },
    {
      path: 'machines',
      children: [
        {
          path: '',
          loadChildren: () => import('src/app/pages/machines/machines.module').then(m => m.MachinesModule)
        }
      ]
    },
    {
      path: 'services',
      children: [
        {
          path: '',
          loadChildren: () => import('src/app/pages/services/services.module').then(m => m.ServicesModule)
        }
      ]
    },
    {
      path: 'combos',
      children: [
        {
          path: '',
          loadChildren: () => import('src/app/pages/combos/combos.module').then(m => m.CombosModule)
        }
      ]
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
    path: "chats",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/chats/chats.module").then(
            (m) => m.ChatsModule
          ),
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
          import("src/app/pages/gps/gps.module").then(
            (m) => m.GpsModule
          ),
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
  }

];
