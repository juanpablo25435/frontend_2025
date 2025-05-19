import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  },
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
  }
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
