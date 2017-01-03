import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the BankingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-banking-page',
  templateUrl: 'banking-page.html'
})
export class BankingPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BankingPage Page');
  }

}
