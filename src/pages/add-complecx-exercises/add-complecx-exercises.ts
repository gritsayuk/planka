import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Content } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


@Component({
  selector: 'page-add-complecx-exercises',
  templateUrl: 'add-complecx-exercises.html',
})
export class AddComplecxExercisesPage {

  @ViewChild(Content) contentArea: Content;
  ComplExr:any = {
  nameComplexExr: "",
  pause: 3,
  Exr: []
  };
  editIndex: number = -1;

  exers: any = [];
  stardDT: number;
  tzoffset:number;
  transtateList: any;
  translateExer: any;
  actionSheetOption: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetController: ActionSheetController,
              private storage: Storage,
              private admobFree: AdMobFree,
              private translate: TranslateService,
              public alertController: AlertController) {
    translate.get('AddComplecxExercisesPage')
      .subscribe(value => {
          this.transtateList = value;
        });
    

    this.tzoffset = (new Date("01.01.2000")).getTimezoneOffset() * 60000; //offset in milliseconds
    this.stardDT = Date.parse(new Date("01.01.2000").toDateString()) - this.tzoffset;
    if (navParams.data['indx'] >= 0) {
      this.editIndex = navParams.data.indx;
      this.storage.get("listExr")
        .then( res => {
          this.ComplExr = this.parseTime(res[this.editIndex], true);
        });
    }
  }
  ionViewWillEnter() {
    this.translate.get('ListExr').subscribe(
      value => {
        this.translateExer = value;
      });
  }
  ionViewDidEnter() {
    this.showBannerAd();
  }
  showBannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      //isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-7766893277450035/4185231751"
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare().then(() => {
      // success
    }).catch(e => alert(e));
}
  parseTime(item, way) {
    for (let i = 0; i < item.Exr.length; i++) {
      if (way) {
        item.Exr[i].timeStr = this.getTime(item.Exr[i].time);
      } else {
        item.Exr[i].time = Date.parse(item.Exr[i].timeStr) - this.stardDT;
      }
    }
    return item;
  }
  getTime(time) {
    let startDate: Date;
    startDate = new Date("01.01.2000");
    startDate.setHours(0, 0, 0, 0);
    startDate = new Date(startDate.getTime() - this.tzoffset+time);

    //return startDate.toISOString();
    return startDate.toISOString().slice(0, 19) + 'Z';
  }

  presentActionSheet() {
    if (!this.actionSheetOption) {
      this.actionSheetOption = {
        title: this.translateExer["Title"],
        buttons: Constants.ListExr
      };
      for (let i = 0; i<this.actionSheetOption.buttons.length; i++) {
        this.actionSheetOption.buttons[i].text = this.translateExer[this.actionSheetOption.buttons[i].type];
        this.actionSheetOption.buttons[i].handler = () => {
          this.AddExr(this.actionSheetOption.buttons[i])
        }
      }
    }
    this.actionSheetOption.buttons.push({
      text: this.translateExer["Cancel"],
      icon: 'close',
      role: 'cancel'//,
      //handler: () => {}
    })
    let actionSheet:any = this.actionSheetController.create(this.actionSheetOption);
    actionSheet.present();
  }
  AddExr(item) {
    let itemSrorage = JSON.parse(JSON.stringify(item))
    itemSrorage.handler = null;
    itemSrorage.timeStr = this.getTime(itemSrorage.time);

    this.ComplExr.Exr.push(itemSrorage);
    setTimeout(() => {this.contentArea.scrollToBottom()});
  }
  getTimeExr() {
    let allTime: number = 0;
    for(let i = 0; this.ComplExr.Exr.length> i; i++) {
      allTime += 1*this.ComplExr["Exr"][i]["time"];
    }
    this.ComplExr.allTime = allTime;
    //this.ComplExr.percentOne = allTime/100;
    for(let i = 0; this.ComplExr.Exr.length> i; i++) {
      this.ComplExr["Exr"][i].percent = this.ComplExr["Exr"][i]["time"]*100/allTime;
    }
  }
  Save() {
      if (this.ComplExr.nameComplexExr == "") {
        let pAlert = this.alertController.create({
          //title: 'Low battery',
          subTitle: this.transtateList.Alert1,
          buttons: ['OK']
        });
    
        pAlert.present();
        //alert (this.transtateList.Alert1);
      } else {
        this.storage.get("listExr").then(res => {
          let resArr: any = [];
          resArr = !!res ? res : Constants.DefaultListExr;
          this.getTimeExr();
          if (this.editIndex > -1) {
            resArr[this.editIndex] = this.parseTime(this.ComplExr, false);
          } else {
            resArr.push(this.parseTime(this.ComplExr, false));
          }
          this.storage.set ("listExr", resArr);
          this.navCtrl.pop();
        });
    }
  }

  deleteItem(indx) {
    this.ComplExr.Exr.splice(indx,1);
  }

  itemReorder(indexes) {
    let element = this.ComplExr.Exr[indexes.from];
    this.ComplExr.Exr.splice(indexes.from, 1);
    this.ComplExr.Exr.splice(indexes.to, 0, element);
  }
  Cancel() {
    this.navCtrl.pop();
  }
}
