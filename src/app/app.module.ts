import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SocketService} from './services/socket';
import {ChatService} from './services/chat';
import {HelperService} from './services/helper';
import {GlobalEventService} from './services/chaevents';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
//import { HighchartsChartComponent } from 'angular-highcharts';

import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { HighchartsChartModule } from "highcharts-angular";



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HighchartsChartModule],
  providers: [
    StatusBar,
    SplashScreen,
    SocketService,
  ChatService,
  GlobalEventService,
  HelperService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
