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
  historySeven: any = [];
  historyAll: any; 
  thisDay: number;  
  constructor(public platform: Platform,
              public navCtrl: NavController,
              public splashScreen: SplashScreen,
              private admobFree: AdMobFree,
              public navParams: NavParams,
              private translate: TranslateService,
              private storage: Storage) {
  this.reorderItems = false;
    let thisDate = new Date();
    let tmpDate = new Date();
    tmpDate.setHours(0);
    tmpDate.setMinutes(0);
    tmpDate.setSeconds(0);
    tmpDate.setMilliseconds(0);
    this.thisDay = thisDate.getDay();
    let j = 1;
    tmpDate.setDate(tmpDate.getDate()-7);
    for(var i = 1; i <= 7; i++) {
      tmpDate.setDate(tmpDate.getDate()+1);
      if(this.thisDay + i <= 7) {
        this.historySeven.push({"day": this.thisDay + i,
                                "date": tmpDate.getTime(),
                                "status": 0
                              })
      } else {
        this.historySeven.push({"day": j++,
                                "date": tmpDate.getTime(),
                                "status": 0
                              });
      }
    }
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
          for(var i in this.listExr){
            this.listExr[i].historySevenDay = this.getHistory(this.listExr[i].id);
          }
        } else {
          this.listExr = Constants["DefaultListExr"];
          this.storage.set("listExr",this.listExr);
        }
    });
  }

  getHistory(complexId) {
    let thisHistorySeven = JSON.parse(JSON.stringify(this.historySeven));
    this.storage.get("history")
      .then(res => {
        this.historyAll = res;
        if (!!this.historyAll) {
          for(var i in this.historySeven) {
            console.log("URA!!!!",this.historySeven[i].date);
            if (!!this.historyAll.days[this.historySeven[i].date]) {
              for(var j in this.historyAll.days[this.historySeven[i].date]) {
                if (this.historyAll.days[this.historySeven[i].date][j].id === complexId && this.historyAll.days[this.historySeven[i].date][j].AllTimeOK > 0) {
                  thisHistorySeven[i].status = 1;
                  console.log("URA!!!!");
                }
              }
              console.log(thisHistorySeven);
            }
          }          
        }
    });
    return thisHistorySeven;
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