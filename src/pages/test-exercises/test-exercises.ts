import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Constants } from '../../app/app.constants';
import { ListPage } from '../list/list';


@Component({
  selector: 'page-test-exercises',
  templateUrl: 'test-exercises.html',
})
export class TestExercisesPage {

  listExr: any;
  listExrIndex: number = 0;
  listExrIndexNext: boolean = false;
  selectExr: boolean = false;
  runFlg: number = 0;
  testExr: any = {};
  selectComplex: number = -1;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    if (navParams.hasOwnProperty("data") && navParams.data.hasOwnProperty("selectComplex")) {
      this.selectComplex = navParams.data.selectComplex;
    }
    this.listExr = new Array();
    if (!!navParams.data.listExr) {
      this.listExr = new Array(navParams.data.listExr);
      this.selectExr = true;
      this.testExr = this.getItem(this.listExrIndex);
    } else {
      this.selectExr = false;
      this.listExr = Constants.ListExr;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestExercisesPage');
  }
  getItem(itemIndx) {
    let list = Constants.ListExr;
    for (var item in list) {
      if (list[item].text == this.listExr[itemIndx]) {
        this.listExrIndexNext = this.listExr.lenght > itemIndx; 
        return list[item];
      }
    }
    return "";
  }
  selectTest(item) {
    this.testExr = item;
    this.selectExr = true;
  }
  Run() {
    this.runFlg = 1;
    this.RunTimer();
  }
  Stop() {
    this.runFlg = 2;
    this.stopTimer();
  }
  Skip() {
    this.Save(true);
  }
  Save(skip = false) {
    let listExr
    this.runFlg = 3;
    if (this.selectComplex > -1) {
      listExr = Constants["DefaultListExr"][this.selectComplex];
      if (!skip) {
        listExr = this.setNewTime(listExr);
      }
      this.storage.get("listExr")
      .then(res => {
        if(!!res) {
          res.push(listExr);
          this.storage.set("listExr", res);
        } else {
          this.storage.set("listExr", new Array(listExr));
        }
        this.navCtrl.setRoot(ListPage);
      });
    }
  }
  Restart() {
    this.runFlg = 0;
    this.stopTimer();  
    this.initTimer();
  }
  Close() {
    this.navCtrl.setRoot(ListPage);
  }


  setNewTime(listExr) {
    let percent: number = 0;
    let time: number = this.remainingTime;
    time = this.remainingTime / 1000;
    switch (listExr.nameComplexExr) {
      case "Normal":
      case "Simple":
        percent = 20;
        time = Math.round(time*(1-percent/100));
        listExr.pause = time;
        listExr.allTime = time*3*1000;
        listExr.Exr[0].time = time*1000;
        listExr.Exr[0].timeStr = this.getTime(time*1000);
        listExr.Exr[1].time = time*1000;
        listExr.Exr[1].timeStr = this.getTime(time*1000);
        listExr.Exr[2].time = time*1000;
        listExr.Exr[2].timeStr = this.getTime(time*1000);
        break;
      case "Simple All":
        percent = 20;
        time = Math.round(time*(1-percent/100));
        listExr.pause = time;
        listExr.allTime = time*3*1000;
        listExr.Exr[0].time = time*1000;
        listExr.Exr[0].timeStr = this.getTime(time*1000);
        listExr.Exr[1].time = time*1000;
        listExr.Exr[1].timeStr = this.getTime(time*1000);
        listExr.Exr[2].time = time*1000;
        listExr.Exr[2].timeStr = this.getTime(time*1000);
        listExr.Exr[3].time = time*1000;
        listExr.Exr[3].timeStr = this.getTime(time*1000);
      default:
        break;
    }
    console.log(listExr);
    return listExr;
  }
  getTime(time) {
    let startDate: Date;
    let tzoffset = (new Date("01.01.2000")).getTimezoneOffset() * 60000;
    startDate = new Date("01.01.2000");
    startDate.setHours(0, 0, 0, 0);
    startDate = new Date(startDate.getTime() - tzoffset+time);

    //return startDate.toISOString();
    return startDate.toISOString().slice(0, 19) + 'Z';
  }

//--------------//
//-----Timer----//
//--------------//
displayTime: string = '00:00:0';
runTimer: any = false;
hasStarted: any = false;
hasFinished: any = false;
remainingTime: number = 0;
RunTimer() {
  this.initTimer();
  this.startTimer();
}
initTimer() {
  this.runTimer = false;
  this.hasStarted = false;
  this.hasFinished = false;
  this.remainingTime = 0;
  this.displayTime = '00:00:0';
}
startTimer() {
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
}
stopTimer() {
  this.runTimer = false;
}
resumeTimer() {
  this.startTimer();
}
timerTick() {
  setTimeout(() => {
    if (!this.runTimer) { return; }
    this.remainingTime = this.remainingTime+100;
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      this.timerTick();
  }, 100);
}
getSecondsAsDigitalClock(inputSeconds: number) {
  var sec_num = inputSeconds//parseInt(inputSeconds.toString(), 10); // don't forget the second param
  var hours = Math.floor((sec_num/1000) / 3600);
  var minutes = Math.floor(((sec_num - (hours * 3600))/1000) / 60);
  var seconds = Math.floor((sec_num - (hours * 3600*1000) - (minutes * 60*1000))/1000);
  var milSeconds = sec_num - (hours * 3600*1000) - (minutes * 60*1000)-seconds*1000;

  var displayStr = '';
  //var hoursString = '';
  var minutesString = '';
  var secondsString = '';
  var milSecondsString = '';
  //hoursString = (hours < 10) ? "0" + hours : hours.toString();
  minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
  secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
  //milSecondsString = milSeconds === 0 ? "000" : milSeconds.toString();
  milSecondsString = milSeconds === 0 ? "0" : milSeconds.toString().substr(0,1);

  displayStr = minutesString + ':' + secondsString + ':' + milSecondsString;
  return displayStr;
}
}
