import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Insomnia, } from '@ionic-native/insomnia';
import { Storage } from '@ionic/storage';
import { AddComplecxExercisesPage } from '../add-complecx-exercises/add-complecx-exercises';


@Component({
  selector: 'page-run-exercises',
  templateUrl: 'run-exercises.html',
})
export class RunExercisesPage {
  listExrIn: any;
  listExr: any = [];
  listExrProgress: any = [];
  listExrDone: any = [];
  ExrRun: any = {};
  ExrRunIndex: number = -1; 

  timeInSeconds:any;
  time:any;
  runTimer:any;
  hasStarted:any;
  hasFinished:any;
  remainingTime:any;
  displayTime:any;
  displayTimePreStart:number = -1;
  tzoffset:number;

  history : any = "";
  historyNum : number = -1;
  histiryExrNum : number = 0;
  constructor(public navCtrl: NavController,
              private admobFree: AdMobFree, 
              public navParams: NavParams,
              private insomnia: Insomnia,
              private storage: Storage) {
      this.tzoffset = (new Date("01.01.2000")).getTimezoneOffset() * 60000; //offset in milliseconds
      this.listExr = {};
      this.listExr.Exr = new Array();
      this.listExrProgress = {};
  }
  ionViewWillEnter() {
    this.storage.get("listExr")
    .then( res => {
      this.listExrIn = res;
      this.addProgress();
      this.listExr = JSON.parse(JSON.stringify(this.listExrIn[this.navParams.data.indx]));
      this.listExrProgress = JSON.parse(JSON.stringify(this.listExrIn[this.navParams.data.indx]));
    });

    //Не выключаем экран
    this.insomnia.keepAwake()
      .then(
        () => console.log('>>>>>>keepAwake success')
      );
  }
  ionViewDidEnter() {
    this.showBannerAd();
  }
  ionViewDidLeave() {
    this.Stop ();
    //Выключаем экран
    this.insomnia.allowSleepAgain()
      .then(
        () => console.log('>>>>>>allowSleepAgain success')
      );
  }
  addProgress() {
    let addAllTime: number = 0;
    let pToday: any = new Date();
    pToday.setHours(0);
    pToday.setMinutes(0);
    pToday.setSeconds(0);
    pToday.setMilliseconds(0);
    pToday = pToday.getTime();

      if (!!this.listExrIn[this.navParams.data.indx].complexRunOK && !!this.listExrIn[this.navParams.data.indx].progressNum && !!this.listExrIn[this.navParams.data.indx].progressPer) {
        if (this.listExrIn[this.navParams.data.indx].complexRunOKDT != pToday) {
          if (this.listExrIn[this.navParams.data.indx].complexRunOK >= this.listExrIn[this.navParams.data.indx].progressPer) {
            for (let i = 0; i < this.listExrIn[this.navParams.data.indx].Exr.length; i++) {
              console.log(this.listExrIn[this.navParams.data.indx].Exr[i]["time"]);
              this.listExrIn[this.navParams.data.indx].Exr[i]["time"] = this.listExrIn[this.navParams.data.indx].Exr[i]["time"] + this.listExrIn[this.navParams.data.indx].progressNum * 1000;
              this.listExrIn[this.navParams.data.indx].Exr[i]["timeStr"] = this.getTime(this.listExrIn[this.navParams.data.indx].Exr[i]["time"]);
              addAllTime += parseInt(this.listExrIn[this.navParams.data.indx].progressNum) * 1000;
            }
            if (addAllTime > 0) {
              this.listExrIn[this.navParams.data.indx].allTime += addAllTime;
              this.listExrIn[this.navParams.data.indx].complexRunOK = 0;
              this.listExrIn[this.navParams.data.indx].complexRunOKDT = pToday;
            }
            this.storage.set("listExr", this.listExrIn);
          }
        }
      }
  }
  getTime(time) {
    let startDate: Date;
    startDate = new Date("01.01.2000");
    startDate.setHours(0, 0, 0, 0);
    startDate = new Date(startDate.getTime() - this.tzoffset+time);

    //return startDate.toISOString();
    return startDate.toISOString().slice(0, 19) + 'Z';
  }
  editItem() {
    this.navCtrl.push(AddComplecxExercisesPage, {indx: this.navParams.data.indx});
  }
  saveHistory (status, ExrRun) {
    
    let pTimeStamp = new Date();
    pTimeStamp.setHours(0);
    pTimeStamp.setMinutes(0);
    pTimeStamp.setSeconds(0);
    pTimeStamp.setMilliseconds(0);
    let pToday : number = pTimeStamp.getTime();

    if (this.history == "") {
      this.history = {};
      //this.history.AllTimeOK = 0;
      this.storage.get("history")
        .then(res => {
          console.log(">>>res>>>",res);
          if (!!res) {
            this.history = res;
          }
          if(!this.history.days) {
            this.history.days = {};
          }
          if (!this.history.days[pToday]) {
            this.history.days[pToday] = {};
            this.history.days[pToday].len = 0;
          }
          this.historyNum = this.history.days[pToday].len;
          this.history.days[pToday][this.historyNum] = this.listExrProgress;          
          this.history.days[pToday].len = parseInt(this.history.days[pToday].len)+1;
          this.history.days[pToday][this.historyNum]["Exr"][this.histiryExrNum]["Status"] = status;
          if (status == "OK") {
            this.history.days[pToday][this.historyNum]["AllTimeOK"] = isNaN(this.history.days[pToday][this.historyNum]["AllTimeOK"]) ? ExrRun.time : this.history.days[pToday][this.historyNum]["AllTimeOK"] += ExrRun.time;
            this.history.days[pToday]["AllTimeOK"] = isNaN(this.history.days[pToday]["AllTimeOK"]) ? ExrRun.time : this.history.days[pToday]["AllTimeOK"] += ExrRun.time;
            console.log("isNaN: ",ExrRun);
            console.log("isNaN: ",this.history.days[pToday]);
          }
          this.storage.set("history", this.history);
          console.log(">>>res111!!!>>>", this.history);
          this.storage.get("history")
          .then(res => {console.log(">>>res111!!!>>>", res)});

          this.histiryExrNum ++;
        });
    } else {
      this.history.days[pToday][this.historyNum]["Exr"][this.histiryExrNum]["Status"] = status;
      if (status == "OK") {
        this.history.days[pToday][this.historyNum]["AllTimeOK"] = isNaN(this.history.days[pToday][this.historyNum]["AllTimeOK"]) ? ExrRun.time : this.history.days[pToday][this.historyNum]["AllTimeOK"] += ExrRun.time;
        this.history.days[pToday].AllTimeOK = isNaN(this.history.days[pToday]["AllTimeOK"]) ? ExrRun.time : this.history.days[pToday]["AllTimeOK"] += ExrRun.time;
      }
      this.storage.set("history", this.history);
      this.storage.get("history")
      .then(res => {console.log(">>>res2222!!!>>>", res)});
      this.histiryExrNum ++;
    }

    console.log(">>>>saveHistory2>>>",this.history);  
}
  showBannerAd() {
  //Показываем рекламу
    let bannerConfig: AdMobFreeBannerConfig = {
      //isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-7766893277450035/4185231751"
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare().then(() => {
      // success
    }).catch(e => alert(e));
}
  Run () {
    if (this.ExrRunIndex != -1) {
      this.ExrRunIndex = -1;
      for (let i = 0; i < this.listExrProgress.Exr.length; i++) {
        this.listExrProgress.Exr[i]["runPercent"] = 0;
      }
    }
    this.moveExr ();
    this.initTimer();
    this.startTimer();
  }
  Close() {
    this.navCtrl.pop();
  }
  Stop () {
    this.ExrRun = {}
    this.listExrDone = [];
    this.listExr = JSON.parse(JSON.stringify(this.listExrIn));
    this.initTimer();
  }
  moveExr () {
    let pToday: any = new Date();
    pToday.setHours(0);
    pToday.setMinutes(0);
    pToday.setSeconds(0);
    pToday.setMilliseconds(0);
    pToday = pToday.getTime();

    this.ExrRunIndex++;
    if (!!this.ExrRun.type) {
      this.listExrDone.push(this.ExrRun);
      this.saveHistory("OK", this.ExrRun);
    }
    if (!!this.listExr.Exr && this.listExr.Exr.length > 0) {
      this.ExrRun = this.listExr.Exr[0];
      this.listExr.Exr.splice(0,1);
      this.timeInSeconds = 0;
    } else {
      this.ExrRun = {}
      if(!!this.listExrIn[this.navParams.data.indx].complexRunOK) {
        this.listExrIn[this.navParams.data.indx].complexRunOK = this.listExrIn.complexRunOK + 1;
      } else {
        this.listExrIn[this.navParams.data.indx].complexRunOK = 1;
        this.listExrIn[this.navParams.data.indx].complexRunOKDT = pToday;
      }
      this.storage.set("listExr", this.listExrIn);
    }
  }
  initTimer() {
    // Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) {
      this.timeInSeconds = !!this.ExrRun ? this.ExrRun.time : 0;
    }

    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;

    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }
  startTimer(p = !!this.listExr.pause && this.listExr.pause >0 ? this.listExr.pause : -1) {
    this.displayTimePreStart = p;
    if (p >= 0) {
      setTimeout(() => {
        this.startTimer(p-1);
      },1000);
    }
    else {
      this.displayTimePreStart = -1;
      this.runTimer = true;
      this.hasStarted = true;
      this.timerTick();
    }
  }

  timerPreStart(p = 0) {
  }

  pauseTimer() {
    this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }
  runPercent() {
    //console.log(">>>1",this.listExrProgress);
    this.listExrProgress.Exr[this.ExrRunIndex]["runPercent"] = (this.listExrProgress.Exr[this.ExrRunIndex].time - this.remainingTime)/this.listExrProgress.Exr[this.ExrRunIndex].time
  }
  timerTick() {
    setTimeout(() => {
      if (!this.runTimer) { return; }
      this.remainingTime = this.remainingTime-100;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
        this.runPercent();
      }
      else {
        this.listExrProgress.Exr[this.ExrRunIndex]["runPercent"] = 1;
        this.moveExr();
        if (!!this.ExrRun.type) {
          this.initTimer();
          this.startTimer();
        } else {
          this.hasFinished = true;
        }
      }
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
