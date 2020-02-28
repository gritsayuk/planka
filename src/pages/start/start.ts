import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddComplecxExercisesPage } from '../add-complecx-exercises/add-complecx-exercises';
import { SelectExistPage } from '../select-exist/select-exist';


@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addComplexExr () {
    this.navCtrl.push(AddComplecxExercisesPage);
  }
  selectExistWorkout () {
    this.navCtrl.push(SelectExistPage);
  }
}
