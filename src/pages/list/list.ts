import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RunExercisesPage} from '../run-exercises/run-exercises';
import { AddComplecxExercisesPage } from '../add-complecx-exercises/add-complecx-exercises';
import { Storage } from '@ionic/storage';
import { Constants } from '../../app/app.constants';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  listExr: any = [];
  reorderItems: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
  }
  ionViewWillEnter () {
    this.storage.get("listExr")
      .then(res => {
        this.listExr = !!res ? res : Constants.DefaultListExr;
        console.log(this.listExr);
      });
  }

  editReorderItems () {
    this.reorderItems = !this.reorderItems;
  }
 runExr (item) {
   this.navCtrl.push(RunExercisesPage, item);
 }

 addComplexExr () {
   this.navCtrl.push(AddComplecxExercisesPage);
 }
  itemReorder(indexes) {
    let element = this.listExr[indexes.from];
    this.listExr.splice(indexes.from, 1);
    this.listExr.splice(indexes.to, 0, element);
    this.storage.set("listExr",this.listExr);
  }
  deleteItem(indx) {
    this.listExr.splice(indx,1);
    this.storage.set("listExr",this.listExr);
  }
  edItem(i) {
    this.navCtrl.push(AddComplecxExercisesPage, {indx: i});
  }
}
