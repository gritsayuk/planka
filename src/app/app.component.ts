import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification  } from '@ionic-native/local-notifications';
import { TranslateService } from '@ngx-translate/core';

import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private localNotifications: LocalNotifications,
              private alertCtrl: AlertController,
              private translate: TranslateService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }
  initTranslate () {
    //this.translate.addLangs(["en"]);
    this.translate.setDefaultLang("en");

    let browserLang = this.translate.getBrowserLang();
    //this.translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    this.translate.use('en');
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.initTranslate ();

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Schedule a single notification
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        //this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        //this.showAlert(res.title, res.text, msg);
      });

      this.recurringNotification();
    });
  }

  recurringNotification() {
  this.localNotifications.schedule({
    id: 22,
    title: 'Recurring',
    text: 'Simons Recurring Notification',
    trigger: { every: ELocalNotificationTriggerUnit.DAY }
  });
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
