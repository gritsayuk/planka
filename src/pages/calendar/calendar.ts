import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  optionsMulti : CalendarComponentOptions;
  dateMulti : string[];
  type : 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  history : any = {};
constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  this.initCalendar();
  }
  initCalendar() {
    let startDT : Date = new Date();
    let dtsJSON : any = [];
    this.storage.get("history")
    .then(res => {
      if (!!res) {
        this.history = res;
        console.log(">>>>",this.history);
        for (var i in this.history) {
          dtsJSON.push({date: new Date(1*i), cssClass: 'good-day'});
        }
      }
      this.optionsMulti = {
        pickMode: 'multi',
        monthPickerFormat: ['Январь', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        daysConfig: dtsJSON
      };
        });
}
  onChange($event) {
    console.log(">>>>onChange>>>>",$event);
    console.log(">>>>dateMulti>>>>",this.dateMulti);
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
