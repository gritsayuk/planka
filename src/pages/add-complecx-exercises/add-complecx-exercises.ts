import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, DateTime } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  selector: 'page-add-complecx-exercises',
  templateUrl: 'add-complecx-exercises.html',
})
export class AddComplecxExercisesPage {

  ComplExr:any = {
  nameComplexExr: "",
  pause: 3,
  Exr: []
  };
  editIndex: number = -1;

  exers: any = [];
  stardDT: number;
  tzoffset:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetController: ActionSheetController,
              private storage: Storage) {
    console.log("navParams.data.index: ",navParams.data.indx)
    this.tzoffset = (new Date("01.01.2000")).getTimezoneOffset() * 60000; //offset in milliseconds
    this.stardDT = Date.parse(new Date("01.01.2000").toDateString()) - this.tzoffset;

    if (!!navParams.data.indx) {
      this.editIndex = navParams.data.indx;
      this.storage.get("listExr")
        .then( res => {
          this.ComplExr = this.parseTime(res[this.editIndex], true);
        });
    }
  }
  parseTime(item, way) {
    for (let i = 0; i < item.Exr.length; i++) {
      if (way) {
        item.Exr[i].timeStr = this.getTime(item.Exr[i].time);
      } else {
        item.Exr[i].time = Date.parse(item.Exr[i].timeStr) - this.stardDT;
      }
    }
    return item;
  }
  getTime(time) {
    let startDate: Date;
    startDate = new Date("01.01.2000");
    startDate.setHours(0, 0, 0, 0);
    startDate = new Date(startDate.getTime() - this.tzoffset+time);

    //return startDate.toISOString();
    return startDate.toISOString().slice(0, 19) + 'Z';
  }

  presentActionSheet() {
      let actionSheetOption: any = {
        title: 'Exersises',
        buttons: Constants.ListExr
      };
      for (let i = 0; i<actionSheetOption.buttons.length; i++) {
        actionSheetOption.buttons[i].handler = () => {
          this.AddExr(actionSheetOption.buttons[i])
        }
      }
      actionSheetOption.buttons.push({
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      })
      let actionSheet:any = this.actionSheetController.create(actionSheetOption);


    actionSheet.present();
  }
  AddExr(item) {
    let itemSrorage = JSON.parse(JSON.stringify(item))
    itemSrorage.handler = null;
    itemSrorage.timeStr = this.getTime(itemSrorage.time);
    console.log(JSON.parse(JSON.stringify(itemSrorage)));
    console.log(item);

    this.ComplExr.Exr.push(itemSrorage);
  }

  Save() {
    try {
      this.storage.get("listExr").then(res => {
        let resArr: any = [];
        resArr = !!res ? res : Constants.DefaultListExr;
        if (this.editIndex > -1) {
          resArr[this.editIndex] = this.parseTime(this.ComplExr, false);
        } else {
          resArr.push(this.parseTime(this.ComplExr, false));
        }
        this.storage.set ("listExr", resArr);
        this.navCtrl.pop();
      });
    }
    catch (e) {
      console.log(">>>Error",e);
    }
  }

  deleteItem(indx) {
    this.ComplExr.Exr.splice(indx,1);
  }

  itemReorder(indexes) {
    let element = this.ComplExr.Exr[indexes.from];
    this.ComplExr.Exr.splice(indexes.from, 1);
    this.ComplExr.Exr.splice(indexes.to, 0, element);
  }
  Cancel() {
    this.navCtrl.pop();
  }
}
