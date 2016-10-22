import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import moment from 'moment/moment'; 
import { Horse, PLACE_BET } from '../../models/horse-model';
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
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

    // Get the passed blank horse details if passed
    this.horse = this.navParams.get('horse');

    
    // Nothing passed so create a new horse
    if (!this.horse) {
      this.horse = new Horse();
      this.horse.eventDateTime = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      this.horse.placeBet = PLACE_BET.ALLOWED;
      this.horse.placeBetOdds = 1.2;
      
    }

    // Setup the form fields and validators
    this.horseForm = this.formBuilder.group({
      'name': [this.horse.name, Validators.required],
      'eventDateTime': [this.horse.eventDateTime, Validators.required],
      'placeBet': [this.horse.placeBet],
      'placeOdds': [String(this.horse.placeBetOdds)],
      'odds': [this.horse.oddsDisplay, BettingValidators.oddsValidator]
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

  saveForm(event) {
    event.preventDefault();
    // Validate that a placebet value is selected if place betting is enabled
    console.log('VALIDATING FORM');


    console.log(JSON.stringify(this.horse));
  }

  ionViewDidLoad() {

  }

}
