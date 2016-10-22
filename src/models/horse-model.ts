/**
 *  Details of a particular horse.
 *  HORSE_RACE_RESULT will be 'PENDING' if the current time is after
 *  the eventDateTime for this horse and the status is not FREE or POTENTIAL_SELECTION.
 *  Thus the 
 */

export enum HORSE_STATUS { FREE, POTENTIAL_SELECTION, IN_USE, FINISHED, EXPIRED };
export enum HORSE_RACE_RESULT { PENDING, SCRATCHED, WON, PLACED, LOST };
export enum PLACE_BET { NO, ALLOWED, FORCE };

export class Horse {
  name: string;
  eventDateTime: string;
  oddsDisplay: string;
  odds: number;
  placeBet: PLACE_BET;
  placeBetOddsDisplay: string;
  placeBetOdds: number;
  status: HORSE_STATUS = HORSE_STATUS.FREE;  
  isSelected: boolean = false; 
  result: HORSE_RACE_RESULT;
  
  constructor() {
    
  }

}

