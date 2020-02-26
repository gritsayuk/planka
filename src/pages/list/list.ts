import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


import { RunExercisesPage} from '../run-exercises/run-exercises';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddComplecxExercisesPage } from '../add-complecx-exercises/add-complecx-exercises';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../../app/app.constants';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  AppLanguage: any;
  listExr: any = [];
  reorderItems: boolean = false;
  
  constructor(public platform: Platform,
              public navCtrl: NavController,
              public splashScreen: SplashScreen,
              private admobFree: AdMobFree,
              public navParams: NavParams,
              private translate: TranslateService,
              private storage: Storage) {
                this.reorderItems = false;
  }
  ionViewDidEnter () {
    setTimeout(() => {this.splashScreen.hide();},500);
    setTimeout(() => {this.showBannerAd();},1000);
  }
  ionViewWillEnter () {
    this.storage.get("listExr")
      .then(res => {
        if (!!res) {
          this.listExr = res;
        } else {
          this.listExr = Constants["DefaultListExr"];
          this.storage.set("listExr",this.listExr);
      }
    });
  }
  showBannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      //isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-7766893277450035/1363611389"
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare().then(() => {
      // success
    }).catch(e => {});
  }
  editReorderItems () {
    this.reorderItems = !this.reorderItems;
  }
 runExr (i) {
   this.navCtrl.push(RunExercisesPage, {indx: i});
 }

 addComplexExr () {
   this.navCtrl.push(AddComplecxExercisesPage);
 }
  itemReorder(indexes) {
    let element = this.listExr[indexes.from];
    this.listExr.splice(indexes.from, 1);
    this.listExr.splice(indexes.to, 0, element);
    this.storage.set("listExr",this.listExr);
  }
  deleteItem(indx) {
    this.listExr.splice(indx,1);
    this.storage.set("listExr",this.listExr);
  }
  edItem(i) {
    this.navCtrl.push(AddComplecxExercisesPage, {indx: i});
  }
}