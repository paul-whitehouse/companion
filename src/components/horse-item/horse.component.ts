import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Horse } from '../../models/horse-model';

@Component({
  templateUrl: './horse.component.html',
  selector: 'horse-item'
})
export class HorseItemComponent {
  @Input() horse: Horse;

  constructor() {

    
    
  }  

  selectHorse(horse: Horse) {
    horse.clicked();
  }

}