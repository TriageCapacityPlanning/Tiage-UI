// load angular modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  AgmCoreModule
} from '@agm/core';
import { CommonModule } from '@angular/common';

// load material UI components
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';

// load app data
import { AppRoutingModule, BaseRoutes } from './app.routing';

// load custom components
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { Admin } from './admin/admin.component';
import { HelpComponent } from './help/help.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { DocpredictionComponent } from './documentation/docprediction/docprediction.component';
import { GetPredictionComponent, PredictionResultsComponent, GetPredictionUserInputComponent } from './get-prediction';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    // angular models to use throughout the application
    CommonModule,
    RouterModule.forChild(BaseRoutes),
  ],
  declarations: [
    AppComponent,
    HelpComponent,
    DocumentationComponent,
    DocpredictionComponent,
    // Register local components
    GetPredictionComponent,
    Admin,
    PredictionResultsComponent,
    GetPredictionUserInputComponent
  
  ],
  exports: [
    // export Material UI components. See https://material.angular.io/
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatListModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatTableModule,
    MatExpansionModule
  ],
  providers: [
    MatNativeDateModule,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
