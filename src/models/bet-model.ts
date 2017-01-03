/**
 *  Details of a particular bet.
 *
 */
import moment from "moment/moment";
import { Horse } from './horse-model';

export enum BET_STATUS {
  POTENTIAL,     // Bet is a potential bet but not yet accepted by user
  PLANNED,       // Bet is accepted - but not placed.
  PLACED,        // The bet has actually been place. Will have a stake and betPlacedDateTime set.
  WON,           // The bet was successful
  LOST          // The bet failed
};

export class Bet {
  horses: Horse[];  // An array of 1 or more horses
  partOfBet: Bet; // This is derrived from another planned bet, being handled incrementally
  betPlacedDateTime: string;
  state: number;
  return: number;
  status: BET_STATUS = BET_STATUS.POTENTIAL;

  constructor() {

  }
}