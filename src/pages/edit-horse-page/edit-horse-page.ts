import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ViewController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Data } from '../../providers/data';

import moment from 'moment/moment';
import { Horse, PLACE_BET, HORSE_STATUS } from '../../models/horse-model';
import { BettingValidators } from '../../validators/BettingValidators';

/*
  Generated class for the EditHorsePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-horse-page',
  templateUrl: 'edit-horse-page.html'
})
export class EditHorsePage {
  horse: Horse;
  originalHorse: Horse;
  horseForm: FormGroup;
  placeBetOptions = PLACE_BET;

  /**
   * Return true if place betting on this horse is allowed
   *
   * */
  showPlaceBetOdds() {
    let val = this.horseForm.get('placeBet').value;
    if (!val || parseInt(val) === PLACE_BET.NO) {
      return false;
    } else {
      return true;
    }
  }

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public data: Data,
    public formBuilder: FormBuilder) {

    // Get the passed blank horse details if passed
    this.originalHorse = this.navParams.get('horse');
    this.horse = this.navParams.get('horse');

    // Nothing passed so create a new horse
    if (!this.horse) {
      this.horse = new Horse();

      //  this.horse.eventDateTime = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      this.horse.placeBet = PLACE_BET.ALLOWED;
      this.horse.placeBetOddsDisplay = '1/5';

      // Get last event date
      this.data.getLastEventDate().then((previousDateVal) => {
        if (previousDateVal && moment(previousDateVal).isAfter(moment().add(5, 'minutes'))) {
          this.horseForm.get('eventDateTime').setValue(previousDateVal);
        } else {
          this.horseForm.get('eventDateTime').setValue(moment().add(5, 'minutes').format('YYYY-MM-DDTHH:mm:ssZ'));
        }
      });
    }

    // Setup the form fields and validators
    this.horseForm = this.formBuilder.group({
      'name': [this.horse.name, Validators.required],
      'eventDateTime': [this.horse.eventDateTime, Validators.compose([Validators.required, BettingValidators.eventTimeValidator])],
      'placeBet': [this.horse.placeBet],
      'placeOdds': [this.horse.placeBetOddsDisplay, BettingValidators.oddsValidator],
      'odds': [this.horse.oddsDisplay, Validators.compose([Validators.required, BettingValidators.oddsValidator])]
    });

  }

  /**
   * Checks if the passed field is valid after the field has been touched
   *
   * */
  isInvalidField(fieldName: string) {
    if (!this.horseForm.get(fieldName).valid && this.horseForm.get(fieldName).touched) {
      return true;
    }
    return false;
  }

  /**
   * Save the horse data and exit editing
   */
  saveDetails($event) {
    event.preventDefault();

    // If we are not editing then save the current value for the eventDateTime
    if (this.originalHorse) {

    }

    // Set the horse with the values from the form
    this.horse.eventDateTime = this.horseForm.get('eventDateTime').value;
    this.horse.name = this.horseForm.get('name').value;
    this.horse.oddsDisplay = this.horseForm.get('odds').value;
    this.horse.odds = this.horse.convertDisplayOdds(this.horseForm.get('odds').value);
    this.horse.placeBet = parseInt(this.horseForm.get('placeBet').value);
    this.horse.placeBetOddsDisplay = this.horseForm.get('placeOdds').value;
    this.horse.placeBetOdds = this.horse.convertDisplayOdds(this.horseForm.get('placeOdds').value);

    // If we are editing then leave the status the same as when the record was passed in    
    if (this.originalHorse) {
      this.horse.status = this.originalHorse.status;
    } else {
      // Else set the status to Free
      this.horse.status = HORSE_STATUS.FREE;
    }

    // Save the eventDateTime for use next time as it is assumed the next race will be close in time    
    this.data.setLastEventDate(this.horseForm.get('eventDateTime').value);

    this.viewCtrl.dismiss(this.horse);
  }

  cancel($event) {
    let me = this;
    let okToCancel = true;
    // If we are editing an existing horse then check if the form is different from the passed horse record
    if (this.originalHorse) {
      if (this.horseForm.get('name').value !== this.originalHorse.name) { okToCancel = false; }
      if (this.horseForm.get('odds').value !== this.originalHorse.oddsDisplay) { okToCancel = false; }
      if (this.horseForm.get('placeBet').value !== this.originalHorse.placeBet) { okToCancel = false; }
      if (this.horseForm.get('placeOdds').value !== this.originalHorse.placeBetOddsDisplay) { okToCancel = false; }
      if (this.horseForm.get('eventDateTime').value !== this.originalHorse.eventDateTime) { okToCancel = false; }

    } else {
      // We are creating a new horse
      if (this.horseForm.get('name').dirty) { okToCancel = false; }
      if (this.horseForm.get('odds').dirty) { okToCancel = false; }
      if (this.horseForm.get('placeOdds').dirty) { okToCancel = false }
    }

    if (okToCancel) {
      this.viewCtrl.dismiss();
      return;
    }

    // Check with the user that they want to cancel
    let confirm = this.alertCtrl.create({

      message: 'Are you sure you want to cancel?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            me.viewCtrl.dismiss();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Aborting cancel');
          }
        }
      ]
    });

    confirm.present();
  }


  ionViewDidLoad() {

  }

}
