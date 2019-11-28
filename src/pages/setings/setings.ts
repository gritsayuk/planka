import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { ListPage } from '../list/list';

@Component({
  selector: 'page-setings',
  templateUrl: 'setings.html'
})
export class SetingsPage {
  language: String;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              private translate: TranslateService) {
    this.storage.get("AppLanguage")
    .then(res => {
      this.language = !!res ? res : "";
    });
  }
  Close() {
    this.navCtrl.setRoot(ListPage);
  }
  onChangeLanguage($event) {
    this.storage.set("AppLanguage",$event)
    this.translate.use($event);
  }
}
