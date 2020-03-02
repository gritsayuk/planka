import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';

import { ListPage } from '../list/list';


@Component({
  selector: 'page-select-exist',
  templateUrl: 'select-exist.html',
})
export class SelectExistPage {
  listExr: any = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage) {
    this.listExr = Constants["DefaultListExr"];
  }

  selectExr (i) {
    this.storage.get("listExr")
      .then(res => {
        if(!!res) {
          res.push(this.listExr[i]);
          this.storage.set("listExr", res);

        } else {
          this.storage.set("listExr", new Array(this.listExr[i]));
        }
        this.navCtrl.push(ListPage);
      });
  }
}
