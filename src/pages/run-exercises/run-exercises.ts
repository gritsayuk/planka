import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Insomnia, } from '@ionic-native/insomnia';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-run-exercises',
  templateUrl: 'run-exercises.html',
})
export class RunExercisesPage {
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

  history : any = "";
  historyNum : number = -1;
  histiryExrNum : number = 0;
  constructor(public navCtrl: NavController,
              private admobFree: AdMobFree, 
              public navParams: NavParams,
              private insomnia: Insomnia,
              private storage: Storage) {
    this.listExr = JSON.parse(JSON.stringify(navParams.data));
    this.listExrProgress = JSON.parse(JSON.stringify(navParams.data));
  }
  ionViewWillEnter() {
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
    //Выключаем экран
    this.insomnia.allowSleepAgain()
      .then(
        () => console.log('>>>>>>allowSleepAgain success')
      );
  }
  saveHistory (status) {
    let pTimeStamp = new Date();
    pTimeStamp.setHours(0);
    pTimeStamp.setMinutes(0);
    pTimeStamp.setSeconds(0);
    pTimeStamp.setMilliseconds(0);
    let pToday = pTimeStamp.getTime();

    if (this.history == "") {
      this.history = {};
      this.storage.get("history")
        .then(res => {
          if (!!res) {
            this.history = res;
          }
          if(!this.history[pToday]) {
            this.history[pToday] = [];
          }
          this.historyNum = this.history[pToday].length;
          this.history[pToday][this.historyNum] = this.listExrProgress;          

          this.history[pToday][this.historyNum]["Exr"][this.histiryExrNum]["Status"] = status;
          if (status == "OK") {
            this.history[pToday][this.historyNum]["AllTimeOK"] = isNaN(this.history[pToday][this.historyNum]["AllTimeOK"]) ? this.ExrRun.time : this.history[pToday][this.historyNum]["AllTimeOK"] += this.ExrRun.time;
            this.history[pToday]["AllTimeOK"] = isNaN(this.history[pToday]["AllTimeOK"]) ? this.ExrRun.time : this.history[pToday]["AllTimeOK"] += this.ExrRun.time;
          }
          this.histiryExrNum ++;
          this.storage.set("history", this.history);
          console.log(">>>>saveHistory>>>",this.history);
        });
    } else {
      this.history[pToday][this.historyNum]["Exr"][this.histiryExrNum]["Status"] = status;
      if (status == "OK") {
        this.history[pToday][this.historyNum]["AllTimeOK"] = isNaN(this.history[pToday][this.historyNum]["AllTimeOK"]) ? this.ExrRun.time : this.history[pToday][this.historyNum]["AllTimeOK"] += this.ExrRun.time;
        this.history[pToday]["AllTimeOK"] = isNaN(this.history[pToday]["AllTimeOK"]) ? this.ExrRun.time : this.history[pToday]["AllTimeOK"] += this.ExrRun.time;
      }
      this.histiryExrNum ++;
      this.storage.set("history", this.history);
      console.log(">>>>saveHistory>>>",this.history);  
    }
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
    this.listExr = JSON.parse(JSON.stringify(this.navParams.data));
    this.initTimer();
  }
  moveExr () {
    this.ExrRunIndex++;
    if (!!this.ExrRun.type) {
      this.listExrDone.push(this.ExrRun);
      this.saveHistory("OK");
    }
    if (!!this.listExr.Exr && this.listExr.Exr.length > 0) {
      this.ExrRun = this.listExr.Exr[0];
      this.listExr.Exr.splice(0,1);
      this.timeInSeconds = 0;
    } else {
      this.ExrRun = {}
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
