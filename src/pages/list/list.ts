import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RunExercisesPage} from '../run-exercises/run-exercises';
import { AddComplecxExercisesPage } from '../add-complecx-exercises/add-complecx-exercises';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  listExr: any =
      [{
        nameComplexExr: "Просто планка",
        Exr: [{
            time: 30000,
            typeExt: "PlankaSimple"
          }
          ]
      }, {
        nameComplexExr: "Ппланка 2",
        Exr: [{
          time: 15000,
          typeExt: "PlankaSimple"
        },{
          time: 15000,
          typeExt: "PlankaLeft"
        },
        ]
      }, {
        nameComplexExr: "Ппланка 3",
        Exr: [{
          time: 15000,
          typeExt: "PlankaSimple"
        },{
          time: 15000,
          typeExt: "PlankaRigth"
        },
        ]
      }]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {

  }
 runExr (item) {
   this.navCtrl.push(RunExercisesPage, item);
 }

 addComplexExr () {
   this.navCtrl.push(AddComplecxExercisesPage);
 }

}
