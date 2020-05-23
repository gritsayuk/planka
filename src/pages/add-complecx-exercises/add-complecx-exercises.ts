import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Content } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { RunExercisesPage} from '../run-exercises/run-exercises';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-add-complecx-exercises',
  templateUrl: 'add-complecx-exercises.html',
})
export class AddComplecxExercisesPage {

  @ViewChild(Content) contentArea: Content;
  ComplExr:any = {
  nameComplexExr: "",
  pause: 3,
  progressNum:5,
  progressPer:2,
  Exr: []
  };
  editIndex: number = -1;

  exers: any = [];
  stardDT: number;
  tzoffset:number;
  transtateList: any;
  translateExer: any;
  translateComplex: any;
  actionSheetOption: any;
  setLastTime: number = 0;
  inputEdit: boolean = false;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetController: ActionSheetController,
              private storage: Storage,
              private admobFree: AdMobFree,
              private translate: TranslateService,
              public alertController: AlertController) {
    if (this.navParams.data['indx'] !== undefined) {
      this.editIndex = this.navParams.data['indx'];
    }
    translate.get('AddComplecxExercisesPage')
      .subscribe(value => {
          this.transtateList = value;
        });
    

    this.tzoffset = (new Date("01.01.2000")).getTimezoneOffset() * 60000; //offset in milliseconds
    this.stardDT = Date.parse(new Date("01.01.2000").toDateString()) - this.tzoffset;
  }
  ionViewWillEnter() {
    this.translate.get('ListExr').subscribe(
      value => {
        this.translateExer = value;
      }); 
      if (this.editIndex >= 0) {
        this.storage.get("listExr")
          .then( res => {
            this.ComplExr = this.parseTime(res[this.editIndex], true);
            //Получаем перевод названия комплекса
            this.translate.get('DefaultListExr').subscribe(
              value => {
                this.translateComplex = value;
                this.ComplExr.nameComplexExrLang = this.translateComplex.ComplexName[this.ComplExr.nameComplexExr]
              });        
          });
      } else {
        //Получаем перевод названия комплекса
        this.translate.get('DefaultListExr').subscribe(
          value => {
            this.translateComplex = value;
            this.ComplExr.nameComplexExrLang = this.translateComplex.ComplexName[this.ComplExr.nameComplexExr]
          });        
      }
}
  ionViewDidEnter() {
    this.showBannerAd();
  }
  ionInput(ev) {
    console.log(ev.keyCode);
    if(ev.keyCode == "13") {
      alert(ev.keyCode);
    }
  }
  changeTime(timeStr) {
    //alert(this.getTime(timeStr));
    this.setLastTime = Date.parse(timeStr) - this.stardDT;
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
    }).catch(e => {});
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
    if (this.setLastTime == 0) {
      itemSrorage.timeStr = this.getTime(itemSrorage.time);
    } else {
      itemSrorage.timeStr = this.getTime(this.setLastTime);
    }
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
    console.log(">>>>>this.ComplExr>>>",this.ComplExr);
  }
  Save() {
      let dtToId = new Date()
      this.ComplExr.id = dtToId.getTime();
      if (this.ComplExr.Exr.length == 0) {
        let pAlert = this.alertController.create({
          //title: 'Low battery',
          subTitle: this.transtateList.Alert2,
          buttons: ['OK']
        });
        pAlert.present();
        return;
      }
      if (this.ComplExr.nameComplexExr == "") {
        let pAlert = this.alertController.create({
          //title: 'Low battery',
          subTitle: this.transtateList.Alert1,
          buttons: ['OK']
        });
        pAlert.present();
        return;
      } 
      this.storage.get("listExr").then(res => {
        let resArr: any = [];
        //resArr = !!res ? res : Constants.DefaultListExr;
        resArr = !!res ? res : [];
        console.log("this.translateComplex",this.translateComplex);
        if (!this.ComplExr.nameComplexExr || this.ComplExr.nameComplexExrLang != this.translateComplex.ComplexName[this.ComplExr.nameComplexExr]) {
          this.ComplExr.nameComplexExr = this.ComplExr.nameComplexExrLang;
          this.ComplExr.standart = false;
        }

        if (this.editIndex > -1) {
          resArr[this.editIndex] = this.parseTime(this.ComplExr, false);
        } else {
          resArr.push(this.parseTime(this.ComplExr, false));
        }
        this.getTimeExr();
        this.storage.set ("listExr", resArr);
        if (!!this.navCtrl.getPrevious() && this.navCtrl.getPrevious().name == "RunExercisesPage") {
          this.navCtrl.push(RunExercisesPage, {indx: this.editIndex});
        } else {
          if (!!this.navCtrl.getPrevious()){
            if(this.navCtrl.getPrevious().name == "StartPage") {
              this.navCtrl.setRoot(ListPage);
            } else {
              this.navCtrl.pop();
            }
          } else {
            this.navCtrl.setRoot(ListPage);
          }
      
        }      
      });
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
    if (!!this.navCtrl.getPrevious()){
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot(ListPage);
    }
  }
}
