import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
/*import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';*/
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { ListPage } from '../pages/list/list';
import { SetingsPage } from '../pages/setings/setings';
import { CalendarPage } from '../pages/calendar/calendar';
import { StartPage } from '../pages/start/start'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;
  pages: Array<{title: string, component: any}>;
  transtateList: any;
  language: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              //private localNotifications: LocalNotifications,
              private translate: TranslateService,
              private storage: Storage) {
    this.initTranslate ();
    this.initializeApp();
  }
  initTranslate () {
    
    this.storage.get("AppLanguage")
    .then(res => {
      if (!!res) {
        this.language = res;
      } else {
        let browserLang = this.translate.getBrowserLang();
        console.log("!!!Lang",browserLang);
        this.language = browserLang.match(/en|ru|uk/) ? browserLang : 'en';
        this.storage.set("AppLanguage",this.language)
      }
      this.translate.setDefaultLang(this.language);
      this.translate.use(this.language);
      //Формируем меню
      this.translate.get('Menu').subscribe(
        value => {
          this.transtateList = value;
          this.pages = [

            { title: "M_LIST", component: ListPage },
            { title: "M_CALENDAR", component: CalendarPage },
            { title: "M_SETINGS", component: SetingsPage }
          ];
        });    
      });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      //this.initTranslate ();

      this.statusBar.styleDefault();
      //this.splashScreen.hide();

      // Schedule a single notification
      /*this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        //this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        //this.showAlert(res.title, res.text, msg);
      });*/

     // this.recurringNotification();
    });
  }

 /* recurringNotification() {
  this.localNotifications.schedule({
    id: 22,
    title: 'Recurring',
    text: 'Simons Recurring Notification',
    trigger: { every: ELocalNotificationTriggerUnit.DAY }
  });
}*/

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
