import { Route } from '@angular/router';

import { GetPredictionComponent } from '../../get-prediction';
import { UserProfileComponent } from '../../admin/admin.component';
import { HelpComponent } from '../../help/help.component';
import { DocumentationComponent } from '../../documentation/documentation.component';

declare interface RouteInfo extends Route {
    title?: string;
    component: any;
}

export const LayoutRoutes: RouteInfo[] = [
    { path: 'interval-prediction', component: GetPredictionComponent },
    { path: 'admin',   component: UserProfileComponent, title: 'Admin Settings' },
    { path: 'help',  component: HelpComponent, title: 'Help' },
    { path: 'docs',  component: DocumentationComponent, title: 'Documentation' }
];
