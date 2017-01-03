import { Component } from '@angular/core';
import { Horse, HORSE_STATUS } from '../../models/horse-model';
import { Utils } from '../../utils/utils';

import { Data } from '../../providers/data';

//import { HorseItemComponent } from '../../components/horse-item/horse.component';

import { EditHorsePage } from '../edit-horse-page/edit-horse-page';
import { ConfigPage } from '../config-page/config-page';

import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  horses: Array<Horse> = [];
  checkResults: number;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public data: Data) {
    this.data.clearLastEventDate();

    this.data.getHorses().then(horses => {
      if (horses) {
        let tmpHorses = JSON.parse(horses);
        for (let i = 0; i < tmpHorses.length; i++){
          let horse = new Horse();
          horse.name = tmpHorses[i].name;
          horse.eventDateTime = tmpHorses[i].eventDateTime;
          horse.odds = tmpHorses[i].odds;
          horse.oddsDisplay = tmpHorses[i].oddsDisplay;
          horse.placeBet = tmpHorses[i].placeBet;
          horse.placeBetOddsDisplay = tmpHorses[i].placeBetOddsDisplay;
          horse.placeBetOdds = tmpHorses[i].placeBetOdds;
          horse.status = tmpHorses[i].status;
          this.horses.push(horse);
        }
      
      }
    });  


    this.checkResults = setInterval(() => {
      this.updateStatus(this.horses);
    }, 10000);

  }

  saveHorses() {
    this.data.saveHorses(this.horses);
  }

  /**
   * Loops through all the horses and if the status is HORSE_STATUS.BET_PLACED and earlier than now item
   * sets the status to WAITING_FOR_RESULT to let the user know that a result is expected.
   */
  updateStatus(horses: Horse[]) {
    if (horses.length > 0) {
      for (let horse of this.horses) {
        horse.readyForResult();
      }
    }
  }


  openPage(page) {
    switch (page) {
      case 'ConfigPage':
        this.navCtrl.push(ConfigPage);
        break;
    }
    
  }

  // Returns true if we have some horses selected that are deletable
  canDelete() {

    for (let horse of this.horses) {
      if (horse.isDeletable()) {
        return true;
      }
    }

    return false;
  }

  // Delete selected horses  
  deleteHorses() {
    for (let i = this.horses.length - 1; i >= 0; i--) {
      if (this.horses[i].isDeletable()) {
        this.horses.splice(i, 1);
      }
    }
  }

  selectHorse(horse: Horse) {
    if (horse.status === HORSE_STATUS.FREE) {
      horse.status = HORSE_STATUS.POTENTIAL_SELECTION;
      return;
    }

    if (horse.status === HORSE_STATUS.POTENTIAL_SELECTION) {
      horse.status = HORSE_STATUS.FREE;
    }
  }

  addHorse() {
    let me = this;
    let editPage = this.modalCtrl.create(EditHorsePage, {}, { enableBackdropDismiss: false });

    editPage.onDidDismiss(data => {
      if (data) {
        me.horses.push(data);
        me.horses.sort(Utils.sortByDate);
        console.log('Added Horse');
      }
    });
    editPage.present();
  }

}
