import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/chats/list', title: 'Chats', icon: 'ni-settings text-blue', class: '' },
    { path: '/combos/list', title: 'Combos', icon: 'ni-app text-purple', class: '' },
    { path: '/combos-machines/list', title: 'Combos Machines', icon: 'ni-app text-purple', class: '' },
    { path: '/departments/list', title: 'Departamentos', icon: 'ni-building text-red', class: '' },
    { path: '/evidences/list', title: 'Evidences', icon: 'ni-building text-red', class: '' },
    { path: '/fees/list', title: 'Fees', icon: 'ni-building text-red', class: '' },
    { path: '/governors/list', title: 'Governors', icon: 'ni-settings text-blue', class: '' },
    { path: '/gps/list', title: 'Gps', icon: 'ni-settings text-blue', class: '' },
    { path: '/insurances/list', title: 'Insurances', icon: 'ni-building text-red', class: '' },
    { path: '/invoices/list', title: 'Invoices', icon: 'ni-collection text-info', class: '' },
    { path: '/machine-specialties/list', title: 'Machine Specialties', icon: 'ni-collection text-info', class: '' },
    { path: '/machines/list', title: 'Machines', icon: 'ni-collection text-info', class: '' },
    { path: '/maintenances/list', title: 'Maintenances', icon: 'ni-settings-gear-65 text-yellow', class: '' },
    { path: '/maintenance-procedures/list', title: 'Maintenances Procedures', icon: 'ni-settings-gear-65 text-yellow', class: '' },
    { path: '/messages/list', title: 'Messages', icon: 'ni-settings-gear-65 text-yellow', class: '' },
    { path: '/operators/list', title: 'Operators', icon: 'ni-single-02 text-orange', class: '' },
    { path: '/services/list', title: 'Services', icon: 'ni-bullet-list-67 text-green', class: '' },
    { path: '/municipalities/list', title: 'Municipalties', icon: 'ni-world text-pink', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
