import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  locale: 'en-GB';

constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            private translate: TranslateService,
            private storage: Storage) {
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
        //console.log(">>>>",this.history);
        for (var i in this.history) {
          if (this.fromDate == 0) {
            this.fromDate = new Date(1*i); 
          }
          dtsJSON.push({date: new Date(1*i), cssClass: 'good-day'});
        }
      }
      this.optionsMulti = {
        from: this.fromDate,
        pickMode: 'multi',
        monthPickerFormat: this.transtateList.monthPickerFormat.split(','),
        monthFormat: 'MMMM YYYY',
        daysConfig: dtsJSON
      };
        });
}
  onChange($event) {
    //console.log(">>>>onChange>>>>",$event);
    //console.log(">>>>dateMulti>>>>",this.dateMulti);
    
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad CalendarPage');
  }
  Close() {
    this.navCtrl.setRoot(ListPage);
  }
}
