import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { ListPage } from '../list/list';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  optionsMulti : CalendarComponentOptions;
  dateMulti : string[];
  type : 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  history : any = {};
  transtateList : any = {};
  fromDate: any = 0;
constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            private translate: TranslateService,
            private storage: Storage,
            public alertController: AlertController) {
   translate.get('CalendarPage')
      .subscribe(value => {
          this.transtateList = value;
          this.initCalendar();
      });
  }
  initCalendar() {
    let startDT : Date = new Date();
    let dtsJSON : any = [];
    this.storage.get("history")
    .then(res => {
      if (!!res) {
        this.history = res;
        console.log(">>>>",this.history);
        for (var i in this.history.days) {
          if (this.fromDate == 0) {
            this.fromDate = new Date(parseInt(i)); 
          }
          dtsJSON.push({date: new Date(parseInt(i)), cssClass: 'good-day'});
        }
      }
      this.optionsMulti = {
        from: 
        this.fromDate,
        pickMode: 'single',
        monthPickerFormat: this.transtateList.monthPickerFormat.split(','),
        weekdays: this.transtateList.weekdaysPickerFormat.split(','),
        //monthFormat: 'MMMM YYYY',
        monthFormat: 'MM-YYYY',
        daysConfig: dtsJSON
      };
        });
}
  onChange($event) {
    console.log($event["_i"]);
    console.log(this.history);
    let allTime = 0;
    let timeH = 0;
    let timeM = 0;
    let allTimeStr = "";
    if (!!this.history.days[$event["_i"]]) {
      allTime = parseInt(this.history.days[$event["_i"]].AllTimeOK)/1000;
    }
    if(allTime >= 3600) {
      timeH = Math.trunc(allTime/3600);
      allTime -= timeH*3600; 
      allTimeStr = timeH.toString() + this.transtateList.h
    }

    if(allTime >= 60) {
      timeM = Math.trunc(allTime/60);
      allTime -= timeM*60; 
      allTimeStr += allTimeStr == "" ? "" : " ";
      allTimeStr += timeM.toString() + this.transtateList.min
    }

    if(allTime > 0) {
      allTimeStr += allTimeStr == "" ? "" : " ";
      allTimeStr += allTime.toString() + this.transtateList.sek
    }
    if (allTimeStr != "") {
      //alert(this.transtateList.long + allTimeStr);

      const alert = this.alertController.create({
        title: this.transtateList.long,
        subTitle: allTimeStr,
        buttons: ['OK']
      });
  
      alert.present();
    }
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad CalendarPage');
  }
  Close() {
    this.navCtrl.setRoot(ListPage);
  }
}
