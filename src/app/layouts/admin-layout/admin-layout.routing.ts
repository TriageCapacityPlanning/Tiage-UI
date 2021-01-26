import { Routes } from '@angular/router';

import { GetPredictionComponent } from '../../get-prediction';
import { UserProfileComponent } from '../../admin/admin.component';
import { HelpComponent } from '../../help/help.component';
import { DocumentationComponent } from '../../documentation/documentation.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'get-a-prediction',      component: GetPredictionComponent },
    { path: 'admin',   component: UserProfileComponent },
    { path: 'help',  component: HelpComponent },
    { path: 'documentation',  component: DocumentationComponent }
];
