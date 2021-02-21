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
import { DatePipe } from '@angular/common'

// load material UI components
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

// load app data
import { AppRoutingModule, BaseRoutes } from './app.routing';

// load custom components
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
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
    AdminComponent,
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
    MatExpansionModule,
    MatGridListModule,
    MatTabsModule
  ],
  providers: [
    MatNativeDateModule,
    MatDatepickerModule,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
