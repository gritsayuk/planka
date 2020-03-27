import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';


@Component({
  selector: 'page-test-exercises',
  templateUrl: 'test-exercises.html',
})
export class TestExercisesPage {

  listExr: any;
  selectExr: boolean = false;
  runFlg: boolean = false;
  displayTime: string = '00:00:0';
  testExr: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listExr = new Array();
    this.listExr = Constants.ListExr;
    console.log(">>>>Test-constructor",this.listExr);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestExercisesPage');
  }
  selectTest(item) {
    this.testExr = item;
    this.selectExr = true;
  }
  Run() {
    this.runFlg = true;
  }
  Stop() {

  }
  Save() {
    
  }
}
