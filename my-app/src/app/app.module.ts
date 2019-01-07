import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule,MatTableModule,MatCardModule,MatSlideToggleModule,MatFormFieldModule, MatInputModule,MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';

// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';

// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts)


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatButtonToggleModule,
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FusionChartsModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
