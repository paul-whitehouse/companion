import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the PlanningPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-planning-page',
  templateUrl: 'planning-page.html'
})
export class PlanningPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello PlanningPage Page');
  }

}
