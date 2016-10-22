import { Component } from '@angular/core';
import { Horse } from '../../models/horse-model';

import { EditHorsePage } from '../edit-horse-page/edit-horse-page';

import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  horses: Array<Horse> = [];  


  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
   
  }

  openPage(page) {
    console.log('Opening page: ' + page);
  }

  addHorse() {

   
    let editPage = this.modalCtrl.create(EditHorsePage);

    editPage.present();    
    
  }

}
