import { FormControl } from '@angular/forms';

import moment from 'moment/moment'; 

export class BettingValidators {

  /**
   * Validate that the event time is in the future
   */
  static eventTimeValidator(ctrl: FormControl) {
    if (!ctrl.value) {
      return null;
    }

    if (moment(ctrl.value).isBefore(moment())) {
      return { dateInPast: true };
    }    
  

  }


  /**
   * Validate that the odds entered are of the form 5/3
   * and that the denominator or numerator are not 0 etc
   * If the odds do not pass then the 'invalidOdds' error is returned true
   *
  */
  static oddsValidator(ctrl: FormControl) {
    // Return if we don't have a value to check
    if (!ctrl.value) {
      return null;
    }

    // Check the value is made up of two numbers seperated by a '/'    
    if (!ctrl.value.match(/^[0-9]+\/[0-9]+$/)) {
      return { invalidOdds: true };
    }

    let numerator = ctrl.value.split('/')[0];
    let denominator = ctrl.value.split('/')[1];
    // Check we don't have zero's for either of the two values    
    if (denominator.startsWith(0) || numerator.startsWith(0)) {
      return { invalidOdds: true };
    }

    // Passed the validation check
    return null;
  }

}
