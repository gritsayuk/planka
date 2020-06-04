import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

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
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

import { ListPage } from '../pages/list/list';
import { RunExercisesPage } from '../pages/run-exercises/run-exercises';
import { AddComplecxExercisesPage } from '../pages/add-complecx-exercises/add-complecx-exercises';
import { SetingsPage } from '../pages/setings/setings';
import { CalendarPage } from '../pages/calendar/calendar';
import { StartPage } from '../pages/start/start';
import { SelectExistPage } from '../pages/select-exist/select-exist';
import { TestExercisesPage } from '../pages/test-exercises/test-exercises';


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
    CalendarPage,
    StartPage,
    SelectExistPage,
    TestExercisesPage
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
    CalendarPage,
    StartPage,
    SelectExistPage,
    TestExercisesPage
  ],
  providers: [
//    GoogleAnalyticsOriginal,
    StatusBar,
    SplashScreen,
    AdMobFree,
    Insomnia,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //LocalNotifications,
    HttpClient,
    FirebaseAnalytics
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
