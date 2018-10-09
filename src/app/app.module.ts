import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbThemeModule, NbButtonModule, NbLayoutModule, NbCardModule, NbTabsetModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ChartComponent } from './chart.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    NbThemeModule.forRoot({ name: 'default' }),
    NbButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbTabsetModule,
    NgxEchartsModule
  ],
  declarations: [AppComponent, HelloComponent, ChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
