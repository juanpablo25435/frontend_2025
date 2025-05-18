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
    }
];
