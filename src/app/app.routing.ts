import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { Admin } from './admin/admin.component';
import { GetPredictionComponent } from './get-prediction';

import { AppComponent } from './app.component';

import { Route } from '@angular/router';

declare interface RouteInfo extends Route {
    title?: string;
    component: any;
}

// the url base paths
export const BaseRoutes: RouteInfo[] = [
    { path: 'interval-prediction', component: GetPredictionComponent },
    { path: 'admin',   component: Admin, title: 'Admin Settings' },
    { path: 'help',  component: HelpComponent, title: 'Help' },
    { path: 'docs',  component: DocumentationComponent, title: 'Documentation' }
];

// Router service configuration
const routes: Routes = [{
    path: '',
    component: AppComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
