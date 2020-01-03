import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  optionsMulti: CalendarComponentOptions;
  dateMulti: string[];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.optionsMulti = {
    pickMode: 'multi',
    monthPickerFormat: ['Январь', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    daysConfig: [{date: new Date(2020, 0, 5), cssClass: 'good-day'},
    {date: new Date(2020, 0, 5), cssClass: 'good-day'}]
  };
  }
  onChange($event) {
    console.log(">>>>onChange>>>>",$event);
    console.log(">>>>dateMulti>>>>",this.dateMulti);
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
