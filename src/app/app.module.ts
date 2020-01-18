import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { RunExercisesPage } from '../pages/run-exercises/run-exercises';
import { AddComplecxExercisesPage } from '../pages/add-complecx-exercises/add-complecx-exercises';
import { SetingsPage } from '../pages/setings/setings';
import { CalendarPage } from '../pages/calendar/calendar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AdMobFree } from '@ionic-native/admob-free'; 
import { Insomnia } from '@ionic-native/insomnia';
import { CalendarModule } from "ion2-calendar";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    RunExercisesPage,
    AddComplecxExercisesPage,
    SetingsPage,
    CalendarPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CalendarModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory:  (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    RunExercisesPage,
    AddComplecxExercisesPage,
    SetingsPage,
    CalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    Insomnia,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //LocalNotifications,
    HttpClient
  ]
})
export class AppModule {}
