import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Storage } from '@ionic/storage';

import moment from 'moment/moment';

import { Horse } from '../models/horse-model';


import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello Data Provider');
  }

  getLastEventDate(): any {
     // Return the last event date entered or today's date
    return this.storage.get('lastEventDate');
  }

  clearLastEventDate(): void {
    this.storage.remove('lastEventDate');
  }

  setLastEventDate(lastDate: string): void {
    this.storage.set('lastEventDate', lastDate);
    
  }

  saveHorses(horses: Horse[]) {
    this.storage.set('horses', JSON.stringify(horses));
  }  

  getHorses(): any {
    return this.storage.get('horses');
  }



}
