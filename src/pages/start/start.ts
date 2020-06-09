import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddComplecxExercisesPage } from '../add-complecx-exercises/add-complecx-exercises';
import { SelectExistPage } from '../select-exist/select-exist';

import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';


@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private firebaseAnalytics: FirebaseAnalytics) {
  }
  ionViewDidEnter() {
    this.eventFB ('e');
  }
  eventFB (ev) {
    let evTxt = '';
    switch(ev) {
      case 'e':
        evTxt = "EP_Start";
        break;
      case 'bs':
        evTxt = "Start_Select";
        break;
      case 'bn':
        evTxt = "Start_New";
        break;
      default:
        evTxt = "EV_Error";
        break;
    }
    this.firebaseAnalytics.logEvent(evTxt,{})
    .then((res: any) => console.log("firebaseAnalytics.StartApp: ",res))
    .catch((error: any) => console.error("firebaseAnalytics.StartApp Error: ",error));
}
  addComplexExr () {
    this.navCtrl.push(AddComplecxExercisesPage);
    this.eventFB ('bs')
  }
  selectExistWorkout () {
    this.navCtrl.push(SelectExistPage);
    this.eventFB ('bn')
  }
}
