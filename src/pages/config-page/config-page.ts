import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ConfigPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-config-page',
  templateUrl: 'config-page.html'
})
export class ConfigPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ConfigPage Page');
  }

}
