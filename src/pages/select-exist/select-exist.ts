import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';

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
              private storage: Storage) {
    this.prePage = navCtrl.last().name;
    this.listExr = Constants["DefaultListExr"];
  }

  selectExr (i) {
    this.navCtrl.push(TestExercisesPage,{"listExr": this.listExr[i].TestExer, "selectComplex": i});
    }
  Close() {
    this.navCtrl.setRoot(ListPage);
  }
}
