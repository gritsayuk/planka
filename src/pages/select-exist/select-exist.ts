import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';

import { ListPage } from '../list/list';
import { TestExercisesPage } from '../test-exercises/test-exercises';


@Component({
  selector: 'page-select-exist',
  templateUrl: 'select-exist.html',
})
export class SelectExistPage {
  listExr: any = [];
  prePage:string = "";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              private firebaseAnalytics: FirebaseAnalytics) {
    this.prePage = navCtrl.last().name;
    this.listExr = Constants["DefaultListExr"];
  }
  ionViewDidEnter() {
    this.eventFB ('e','');
  }
  eventFB (ev,exr) {
    let evTxt = '';
    switch(ev) {
      case 'e':
        evTxt = "EP_SelectExr";
        break;
      case 'bs':
        evTxt = "SelectExr_"+exr;
        break;
      default:
        evTxt = "EV_Error";
        break;
    }
    this.firebaseAnalytics.logEvent(evTxt,{})
		.then((res: any) => console.log("firebaseAnalytics.StartApp: ",res))
		.catch((error: any) => console.error("firebaseAnalytics.StartApp Error: ",error));
  }
  selectExr (i) {
    let dtToId = new Date()
    this.listExr[i].id = dtToId.getTime();
    this.navCtrl.push(TestExercisesPage,{"listExr": this.listExr[i].TestExer, "selectComplex": i});
    this.eventFB ('bs',this.listExr[i].nameComplexExr)
    }
  Close() {
    this.navCtrl.setRoot(ListPage);
  }
}
