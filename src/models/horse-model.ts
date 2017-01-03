/**
 *  Details of a particular horse.
 *  HORSE_RACE_RESULT will be 'PENDING' if the current time is after
 *  the eventDateTime for this horse and the status is not FREE or POTENTIAL_SELECTION.
 *  Thus the 
 */
import moment from "moment/moment";

export enum HORSE_STATUS {
  FREE,
  SELECTED,
  POTENTIAL_SELECTION,
  BET_PLACED,
  FINISHED,
  WAITING_FOR_RESULT,
  SCRATCHED,
  WON,
  PLACED,
  LOST
};
export enum PLACE_BET { NO, ALLOWED, FORCE };

export class Horse {
  id: number;
  name: string;
  eventDateTime: string;
  oddsDisplay: string;
  odds: number;
  placeBet: PLACE_BET;
  placeBetOddsDisplay: string;
  placeBetOdds: number;
  status: HORSE_STATUS = HORSE_STATUS.FREE;

  constructor() {

  }

  // Sets the flag to indicate waiting for a result if we have a bet placed and its event time was before now time
  readyForResult() {
    if (this.status === HORSE_STATUS.BET_PLACED) 
    if (moment(this.eventDateTime).isBefore(moment())) {
      this.status = HORSE_STATUS.WAITING_FOR_RESULT;
    }
  }

  placeBetColor() {
    if (this.placeBet === PLACE_BET.ALLOWED) {
      return 'secondary';
    } else {
      return 'danger';
    }
  }

  isDeletable() {
    if (this.status === HORSE_STATUS.SELECTED ||
      this.status === HORSE_STATUS.FINISHED) {
      return true;
    }
  }

  placeBettingSet() {
    if (this.placeBet === PLACE_BET.ALLOWED || this.placeBet === PLACE_BET.FORCE) {
      return true;
    }
    return false;
  }

  getStatusColor() {
    let color = 'black';

    return color;

  }

  /**
   * get the status icon
   *
   */
  getStatusIcon() {

    let icon: string;

    switch (this.status) {
      case HORSE_STATUS.FREE:
        icon = 'square-outline';
        break;
      case HORSE_STATUS.SELECTED:
        icon = 'checkbox';
        break;
      case HORSE_STATUS.POTENTIAL_SELECTION:
        icon = 'bulb';
        break;
      case HORSE_STATUS.BET_PLACED:
        icon = 'thumbs-up';
        break;
      case HORSE_STATUS.FINISHED:
        icon = 'close';
        break;
      case HORSE_STATUS.WAITING_FOR_RESULT:
        icon = 'clock';
        break;
      case HORSE_STATUS.SCRATCHED:
        icon = 'cut';
        break;
      case HORSE_STATUS.WON:
        icon = 'trophy';
        break;
      case HORSE_STATUS.PLACED:
        icon = 'ribbon';
        break;
      case HORSE_STATUS.LOST:
        icon = 'sad';
        break;
    }

    return icon;

  }

  setForBet() {
    this.status = HORSE_STATUS.BET_PLACED;

  }

  setForPotentialBet() {
    this.status = HORSE_STATUS.POTENTIAL_SELECTION;
  }

  setForWaitingForResult() {
    this.status = HORSE_STATUS.WAITING_FOR_RESULT;
  }






  // Click (select) the horse  
  clicked() {

    // toggle the status between SELECTED and FREE
    if (this.status === HORSE_STATUS.FREE) {
      this.status = HORSE_STATUS.SELECTED;
      return;
    }

    if (this.status === HORSE_STATUS.SELECTED) {
      this.status = HORSE_STATUS.FREE;
      return;
    }



  }


  displayDateFull() {
    return moment(this.eventDateTime).format('DD MMM h:mm A');
  }

  convertDisplayOdds(oddString) {
    let value: number;
    if (oddString && oddString.match(/^[0-9]+\/[0-9]+$/)) {
      value = parseInt(oddString.split('/')[0]) / parseInt(oddString.split('/')[0]);
    }
    return value;
  }

}

