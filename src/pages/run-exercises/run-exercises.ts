import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-run-exercises',
  templateUrl: 'run-exercises.html',
})
export class RunExercisesPage {
  listExr: any = [];
  listExrDone: any = [];
  ExrRun: any = {}

  timeInSeconds:any;
  time:any;
  runTimer:any;
  hasStarted:any;
  hasFinished:any;
  remainingTime:any;
  displayTime:any;
  displayTimePreStart:number = -1;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.listExr = JSON.parse(JSON.stringify(navParams.data));
  }
  moveExr () {
    if (!!this.ExrRun.type) {
      this.listExrDone.push(this.ExrRun);
    }
    if (!!this.listExr.Exr && this.listExr.Exr.length > 0) {
      this.ExrRun = this.listExr.Exr[0];
      this.listExr.Exr.splice(0,1);
      this.timeInSeconds = 0;
    } else {
      this.ExrRun = {}
    }
  }
  Run () {
    this.moveExr ();
    this.initTimer();
    this.startTimer();
  }

  Stop () {
    this.ExrRun = {}
    this.listExrDone = [];
    this.listExr = JSON.parse(JSON.stringify(this.navParams.data));
    this.initTimer();
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

  timerTick() {
    setTimeout(() => {
      if (!this.runTimer) { return; }
      this.remainingTime = this.remainingTime-100;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
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
  Close() {
    this.navCtrl.pop();
  }
}
