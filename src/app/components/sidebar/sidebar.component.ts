import { Component, OnInit } from '@angular/core';

/* eslint-disable  @typescript-eslint/no-explicit-any */

declare const $: any;
export declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/interval-prediction', title: 'Interval Prediction',  icon: 'dashboard', class: '' },
    { path: '/admin', title: 'Admin: Clinic 1',  icon: 'settings', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu(): boolean {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
}
