import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-run-exercises',
  templateUrl: 'run-exercises.html',
})
export class RunExercisesPage {
  listExr: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listExr = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RunExercisesPage');
  }

}
