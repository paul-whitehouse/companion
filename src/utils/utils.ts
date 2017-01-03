import { Horse } from '../models/horse-model';
import moment from 'moment/moment';

export class Utils {

  // Sort routine for sorting by event date  
  static sortByDate(a: Horse, b: Horse) {
    if (moment(a.eventDateTime).isBefore(moment(b.eventDateTime))) {
      return -1;
    }
    if (moment(a.eventDateTime).isAfter(moment(b.eventDateTime))) {
      return 1;
    }
    return 0;
  }
}