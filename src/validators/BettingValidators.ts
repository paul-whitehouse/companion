import { FormControl } from '@angular/forms';

export class BettingValidators {

  static oddsValidator(ctrl: FormControl) {
   
    if (ctrl.value && !ctrl.value.match(/^[0-9]+\/[0-9]+$/)) {

      let numerator = ctrl.value.split('/')[0];
      let denominator = ctrl.value.split('/')[1];
      let valid = true;

      if (denominator)
      

      return { invalidOdds: true };
    }

    return null;
  }

}
