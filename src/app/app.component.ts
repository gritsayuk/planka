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
import { StartPage } from '../pages/start/start';
import { SelectExistPage } from '../pages/select-exist/select-exist';
import { AddComplecxExercisesPage } from '../pages/add-complecx-exercises/add-complecx-exercises';
import { TestExercisesPage } from '../pages/test-exercises/test-exercises';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;//= StartPage;
  pages: Array<{title: string, component: any}>;
  transtateList: any;
  language: any;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              //private localNotifications: LocalNotifications,
              private translate: TranslateService,
              private storage: Storage,
              private firebaseAnalytics: FirebaseAnalytics) {
                
    //this.initTranslate ();
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
            { title: "M_SETINGS", component: SetingsPage },
            { title: "M_SELECT_EXR", component: SelectExistPage },
            { title: "M_ADD_EXR", component: AddComplecxExercisesPage },
            { title: "M_TEST_EXR", component: TestExercisesPage }
          ];
        });    
      });
  }
  backButtonClick() {
    this.platform.registerBackButtonAction(() => {
      // get current active page
      let view = this.nav.getActive();
      if (view.component.name == "ListPage" || view.component.name == "StartPage") {
        //Double check to exit app                  
        console.log(">>>registerBackButtonAction");
        console.log(">>>1",new Date().getTime());
        console.log(">>>2",this.lastTimeBackPress);
        console.log(">>>3",this.timePeriodToExit);
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          this.platform.exitApp(); //Exit from app

        } else {
          this.lastTimeBackPress = new Date().getTime();
        }
      } else {
        // go to previous page
        if (this.nav.canGoBack()) {
          this.nav.pop({});
        } else {          
          this.nav.setRoot(ListPage);
          //this.nav.push(ListPage);
        }
      }
    });
  
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.initTranslate ();
      this.initFB();
      this.backButtonClick()//registerBackButtonAction
      this.storage.get("listExr")
        .then(res => {
          if (!!res) {
            this.rootPage = ListPage;
          } else {
            this.rootPage = StartPage;
          }
        });
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
  initFB () {
    this.firebaseAnalytics.setEnabled(true)
      .then((res: any) => console.log("firebaseAnalytics.setEnabled: ",res))
      .catch((error: any) => console.error("firebaseAnalytics.setEnabled Error: ",error));
    this.firebaseAnalytics.logEvent("login",{})
      .then((res: any) => console.log("firebaseAnalytics.StartApp: ",res))
      .catch((error: any) => console.error("firebaseAnalytics.StartApp Error: ",error));

  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
